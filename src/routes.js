import { Router } from "express"
import UsersController from "./controllers/UsersController"
import SessionsController from "./controllers/SessionsController"
import PatientsController from "./controllers/PatientsController"
import auth from "./middlewares/auth"
//import auth from "./middlewares/auth"

const routes = new Router()

routes.post('/sessions', SessionsController.create)

routes.use(auth)

routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

routes.post('/patients', PatientsController.create)

export default routes