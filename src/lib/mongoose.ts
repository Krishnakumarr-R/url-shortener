import config from '@/config';
import mongoose from 'mongoose';

import type { ConnectOptions } from 'mongoose';
import { logger } from './winston';

const connectionOption: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'shortly',
};

const connectDatabase = async (): Promise<void> => {
  if (!config.MONGO_CONNECTION_URI) {
    throw new Error('Mongo uri is missing');
  }

  try {
    await mongoose.connect(config.MONGO_CONNECTION_URI, connectionOption);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to db', error);
  }
};

const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnect successfully');
  } catch (error) {
    logger.error('Error during disconnecting from database', error);
  }
};

export {connectDatabase,disconnectDatabase};
