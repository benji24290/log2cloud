const bunyan = require('bunyan');
require('dotenv').config()
const debug = require('debug')
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

class Logger {
    constructor(serviceName) {
        this.serviceName = serviceName
        this.validateSetup()
        this.loggingBunyan = new LoggingBunyan();
        this.logger = bunyan.createLogger({
            // The JSON payload of the log as it appears in Stackdriver Logging
            // will contain "name": "my-service"
            name: this.serviceName,
            streams: [
                // Log to the console at 'info' and above
                { stream: process.stdout, level: 'info' },
                // And log to Stackdriver Logging, logging at 'info' and above
                this.loggingBunyan.stream('info'),
            ],
        });
    }
    fatal(log) {
        this.logger.fatal(log);
        debug(`${this.serviceName}:fatal`)(log);
    }
    error(log) {
        this.logger.error(log);
        debug(`${this.serviceName}:error`)(log);
    }
    warn(log) {
        this.logger.warn(log);
        debug(`${this.serviceName}:warn`)(log);
    }
    info(log) {
        this.logger.info(log);
        debug(`${this.serviceName}:info`)(log);
    }
    debug(log) {
        this.logger.debug(log);
        debug(`${this.serviceName}:debug`)(log);
    }
    trace(log) {
        this.logger.trace(log);
        debug(`${this.serviceName}:trace`)(log);
    }
    validateSetup() {
        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            throw new Error('No service account provided')
        }
        if (!this.serviceName) {
            throw new Error('No service name provieded')
        }
    }
}

function newLogger(service) {
    return new Logger(service)
}

module.exports = newLogger