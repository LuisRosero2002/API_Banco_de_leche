import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "../router/router";
import { AuthController } from "./controllers/auth.controller";

export class AuthRouter extends BaseRouter<AuthController,ConfigMiddleware>{
    constructor(){
        super(AuthController,ConfigMiddleware)
    }

    routes(): void {
        this.router.post("/login", 
        this.middleware.passAuth("login"),
        (req, res) =>
         { this.controller.login(req, res)}
        );
        
    }
}