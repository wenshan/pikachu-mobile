
const generatePathObj = function (path, value) {
  let o;
  if (path && path.length) {
    path.reverse();
    o = {};
    o[path.shift()] = value;
    while (path.length) {
      const p = path.shift();
      const t = o;
      o = {};
      o[p] = t;
    }
  } else {
    return value;
  }
  return o;
};

const stateHelper = {
  setPathState(path, value) {
    let paths,
      state = this.state,
      pathState = state;
    if (path && typeof path == 'string') {
      paths = path.split('.');
      while (paths.length) {
        const p = paths.shift();
        if (pathState[p] == undefined || !paths.length) {
          pathState[p] = generatePathObj(paths, value);
        } else {
          pathState = pathState[p];
        }
      }
      this.setState(state);
    }
  },
};

module.exports = stateHelper;
