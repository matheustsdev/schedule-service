import { Server } from "./models/classes/Server";
import { UserController } from "./modules/user/user.controller";

new Server([
    new UserController(),
])
