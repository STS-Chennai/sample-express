module.exports = class ArrayUtils {
  constructor(object) {
    this.object = object;
  };

  contains(needle) {
    for (let e in this.object) {
      if (e == needle) return true;
    }
    return false;
  };

  notContains(needle) {
    return !this.contains(needle)
  }
};