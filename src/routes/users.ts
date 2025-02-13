import { type Router } from 'express';

export const userRoutes = (app: Router) => {
  app.get('/:id', (req, res) => {
    res.json({
        id: req.params.id,
    });
  });

  return app;
};