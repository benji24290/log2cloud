# log2cloud

```
const logger = require('log2cloud')("my-service-name")

logger.error("error")
logger.warn("warn")
logger.fatal("fatal")
logger.info('info')
```

To log to Stackdriver API from Google you have to make sure that the service account file is defined in the environment variables or .env file.
```
GOOGLE_APPLICATION_CREDENTIALS='googleServiceAccount.json' 
```