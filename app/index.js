const { exec } = require('child_process');

const logger = console;
const shell = (event) => {
  const promise = {};
  promise.instance = new Promise((...argv) => {
    [promise.resolve, promise.reject] = argv;
  });
  exec(event.command, (err, stdout, stderr) => {
    if (err) promise.reject(stderr);
    promise.resolve(stdout);
  });
  return promise.instance;
};
exports.handler = async (event) => {
  logger.log(event);
  return shell({ command: 'which ssh' })
    .then(logger.log)
    .catch(logger.log)
    .then(() => shell({ command: 'which bash' }))
    .then(logger.log)
    .catch(logger.log)
    .then(() => shell({ command: 'ls -la' }))
    .then(logger.log)
    .catch(logger.log)
    .then(() => shell({ command: 'scripts/x' }))
    .then(logger.log)
    .catch(logger.log)
    .then(() => shell({ command: 'which openssh' }))
    .then(logger.log)
    .catch(logger.log)
    .then(() => shell({ command: 'which ssh' }))
    .then(logger.log)
    .catch(logger.log)
    .then(() => 123);
};
