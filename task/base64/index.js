class Base64 {
  static hex2bin(values) {
    return Buffer.alloc(values.map(value => parseInt(value, 16)));
  }

  static bin2hex(buffer) {
    return buffer.map(value => (hex => (hex.length < 2 ? `0${hex}` : hex))(value.toString(16)));
  }

  static encode(buffer) {
    return buffer.toString('base64');
  }

  static decode(base64) {
    return Buffer.alloc(base64, 'base64');
  }
}
module.exports = {
  Base64,
};
