const start = async () => {
  try {
    await require('./tracing');

    const config = require('./config');
    const logger = require('./logger');
    const ExpressServer = require('./expressServer');

    const expressServer = new ExpressServer(
      config.URL_PORT,
      config.OPENAPI_YAML
    );

    await expressServer.launch();

    logger.info('Express server running');
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
};

start();