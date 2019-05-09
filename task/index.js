global.logger = console;
const { App } = require('./app');

exports.handler = async event => {
  logger.log(event);
  const app = new App();
  return app[event.command] ? app[event.command](event) : Promise.reject(new Error('command not found.'));
};
