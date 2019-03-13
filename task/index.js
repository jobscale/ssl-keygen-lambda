const { exec } = require('child_process');

const run = {
  logger: console,
  shell(event) {
    const promise = {};
    promise.instance = new Promise((...argv) => {
      [promise.resolve, promise.reject] = argv;
    });
    exec(event.command, (err, stdout, stderr) => {
      if (err) promise.reject(stderr);
      promise.resolve(stdout);
    });
    return promise.instance;
  },
  sync() {},
  async() {
    return run.shell({ command: 'find -type f -ls' })
    .then(run.logger.log)
    .catch(run.logger.error)
    .then(() => run.shell({ command: 'scripts/x' }))
    .then(run.logger.log)
    .catch(run.logger.error);
  },
};
exports.handler = async event => {
  run.logger.log(event);
  return run[event.command] ? run[event.command]() : Promise.reject(new Error('command not found.'));
};
