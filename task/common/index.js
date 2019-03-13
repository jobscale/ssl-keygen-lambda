class App {
  constructor() {
    this.logger = console;
  }

  promise() {
    const promise = {};
    promise.instance = new Promise((...argv) => {
      [promise.resolve, promise.reject] = argv;
    });
    return promise;
  }

  buildAgent(target, options) {
    const protocol = target.split(':')[0];
    let proxy = process.env.https_proxy || process.env.http_proxy;
    /* eslint-disable no-param-reassign, global-require, no-new-require, new-cap */
    options.agent = proxy ? (() => {
      proxy = require('url').parse(proxy);
      Object.assign(options, proxy);
      return new require(`${protocol}-proxy-agent`)(options);
    })() : new require(protocol).Agent(options);
    /* eslint-enable no-param-reassign, global-require, no-new-require, new-cap */
    return options;
  }

  buildResponse(response, body) {
    return Promise.resolve({
      headers: (() => {
        const res = {};
        response.headers.forEach((value, key) => {
          res[key] = value;
        });
        return res;
      })(),
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      body,
    });
  }

  fetch(target, options, need) {
    /* eslint-disable global-require, import/no-unresolved */
    const fetch = require('node-fetch');
    /* eslint-enable global-require, import/no-unresolved */
    return fetch(target, this.buildAgent(target, options))
    .then(async (response) => {
      const body = await response[need || 'json']();
      return this.buildResponse(response, body);
    })
    .catch((e) => {
      this.logger.error(e);
      return {
        ok: false,
        statusText: 'network error.',
      };
    });
  }
}
module.exports = {
  App,
};
