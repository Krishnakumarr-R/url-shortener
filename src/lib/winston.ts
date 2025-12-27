import { createLogger, format, transports, transport, level } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

import config from '@/config';

const tranportation: transport[] = [];

if (!config.LOGTAIL_SOURCE_TOKEN || !config.LOGTAIL_INGESTING_HOST) {
  throw new Error('Logtail source token or ingestng host is missing.');
}

const logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
  endpoint: config.LOGTAIL_INGESTING_HOST,
});

if (config.NODE_ENV === 'production') {
  tranportation.push(new LogtailTransport(logtail));
}

const { colorize, combine, timestamp, label, printf } = format;

if (config.NODE_ENV === 'development') {
  tranportation.push(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        label(),
        timestamp({ format: 'DD MMMM hh:mm:ss A' }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}:${message}]`;
        }),
      ),
    }),
  );
}

const logger = createLogger({
  transports: tranportation,
});

export { logtail, logger };
