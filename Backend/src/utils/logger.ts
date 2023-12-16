const logger = require('pino');
import dayjs from 'dayjs';
import pinoPretty from 'pino-pretty';

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

// Use pino-pretty for pretty printing in the development environment
if (process.env.NODE_ENV !== 'production') {
  log.pretty = pinoPretty(); // Set up pino-pretty
}

export default log;
