import { BaseRouter } from "../router/router";
import { AuthController } from "./controllers/auth.controller";

export class AuthRouter extends BaseRouter<AuthController>{
    constructor(){
        super(AuthController)
    }

    routes(): void {
        this.router.post("/login", (req, res) =>
         { this.controller.login(req, res)}
        );
        
    }
}