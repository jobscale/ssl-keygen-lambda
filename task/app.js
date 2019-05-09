const { exec } = require('child_process');

class App {
  shell(command) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) reject(stderr);
        resolve(stdout);
      });
    });
  }
  sync() {}
  async() {
    return this.shell('find -type f -ls')
    .then(logger.info)
    .catch(logger.error)
    .then(() => this.shell('scripts/x'))
    .then(logger.info)
    .catch(logger.error);
  }
};
module.exports = {
  App,
};
