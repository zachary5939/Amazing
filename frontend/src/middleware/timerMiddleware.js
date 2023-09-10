let timer;

const timerMiddleware = store => next => action => {
  if (action.type === 'purchases/START_TIMER') {
    const timestamp = action.payload;

    timer = setInterval(() => {
      const timePassed = Date.now() - new Date(timestamp);

      if (timePassed > 5*60*1000) {
        store.dispatch({ type: 'purchases/CLEAR_TIMER' });
        clearInterval(timer);
      } else {
        store.dispatch({ type: 'purchases/UPDATE_TIMER' });
      }
    }, 1000); // Timer
  }

  if (action.type === 'purchases/CLEAR_TIMER') {
    clearInterval(timer);
  }

  return next(action);
};

export default timerMiddleware;
