const httpHandler = (asyncFn) => {
  return (req, res, next) => {
    (async () => {
      try {
        await asyncFn(req, res, next);
      } catch (err) {
        next(err);
      }
    })();
  };
};

export default httpHandler;
