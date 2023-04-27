import { Server } from "./Server";
import { UserController } from "./user/user.controller";

new Server([
    new UserController(),
])
