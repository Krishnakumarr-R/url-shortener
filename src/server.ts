import express from 'express';
import config from '@/config';

import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compresion from 'compression';

import router from '@/routes';

const server = express();

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
    // await connectToDatabase();

    // appliction routes under the root path
    server.use('/', router);

    server.listen(config.PORT, () => {
      console.log(`Server listening at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);

    if (config.NODE_ENV === 'production') {
      process.exit(1); // stop process if startup fails
    }
  }
}

startServer();

const serverTermination = async(signal:NodeJS.Signals):Promise<void>=>{
    try {
        console.log("Server shutdown",signal)
        process.exit(0); 

    } catch (error) {
        console.error("Error during in server shutdown")
    }
}

process.on('SIGTERM',serverTermination)
process.on('SIGINT',serverTermination)
