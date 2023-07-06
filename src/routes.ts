import { Router } from "express"
import StudentRoutes  from "./module/studentManagement/routes"



const mainRouter = Router()
mainRouter.use(StudentRoutes)


export default mainRouter

