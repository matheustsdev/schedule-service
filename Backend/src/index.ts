import { Server } from "./models/classes/Server";
import { ServiceController } from "./modules/service/service.controller";
import { UserController } from "./modules/user/user.controller";

new Server([
    new UserController(),
    new ServiceController(),
])
