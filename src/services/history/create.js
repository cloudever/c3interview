import createHistory from 'history/createBrowserHistory';

const createBrowserHistory = (options = {}) => {
  const { basename = '/', dedupe = true } = options;

  const history = createHistory({
    basename,
  });

  if (dedupe) {
    let prevLocation = null;
    history.block((location, action) => {
      const shouldBlockAction =
        action === 'PUSH' && location.pathname === prevLocation;

      if (shouldBlockAction) {
        return false;
      }

      prevLocation = location.pathname;
      return true;
    });
  }

  return history;
};

export { createBrowserHistory };
