import { Server } from "./models/classes/Server";
import { ServiceController } from "./modules/service/service.controller";
import { AuthController } from "./modules/auth/auth.controller";
import { UserController } from "./modules/user/user.controller";

new Server([
    new UserController(),
    new ServiceController(),
    new AuthController()
])
