const logger = require('./index')("service")
//const Logger = require('./index')
//const logger = new Logger("service")
logger.error("error")
logger.warn("warn")
logger.fatal("fatal")
logger.info('info')