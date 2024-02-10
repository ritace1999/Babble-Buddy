export const serverError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Servar Error.",
  });
};
export const routesError = (req, res, next) => {
  next({
    message: `Invalid method/URL ${req.method}/${req.path} `,
  });
};
