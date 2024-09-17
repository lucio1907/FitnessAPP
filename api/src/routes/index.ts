import { Request, Response, Router } from "express";
import errorHandler from "../middlewares/errorHandler.middlewares";
import usersRoutes from "./users/users.routes";

const routes = Router();

routes.use('/users', usersRoutes);

routes.use(errorHandler);

routes.get('/', (req: Request, res: Response) => res.json({ response: { message: 'API in development', version: 'v0.1', status: 'OK' } }))
routes.get('*', (req: Request, res: Response) => res.status(404).json({ response: { message: `${req.url} not found`, status: 'Not Found' } }))

export default routes;