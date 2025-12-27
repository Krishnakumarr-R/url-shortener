import express from 'express';
import config from '@/config';

import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compresion from 'compression';

import router from '@/routes';
import corsOptions from './lib/cors';
import { logger, logtail } from '@/lib/winston';
import { connectDatabase,disconnectDatabase } from '@/lib/mongoose';

const server = express();

server.use(cors(corsOptions));

//secure header
server.use(helmet());

//parse json request bodies
server.use(express.json());

//parse URL encoded bodies
server.use(express.urlencoded({ extended: true }));

//set public folder
server.use(express.static(`${__dirname}/public`));

//cookie parser
server.use(cookieParser());

//compress response
server.use(compresion());

async function startServer(): Promise<void> {
  try {
    // connect to DB first
    await connectDatabase();

    // appliction routes under the root path
    server.use('/', router);

    server.listen(config.PORT, () => {
      logger.info(`Server listening at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    logger.error('Server failed to start:', error);

    if (config.NODE_ENV === 'production') {
      process.exit(1); // stop process if startup fails
    }
  }
}

startServer();

const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    logger.log('Server shutdown', signal);
    
    logtail.flush();
    
    process.exit(0);
  } catch (error) {
    logger.error('Error during in server shutdown');
  }
};

process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
