import { Request, Response } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { BaseRouter } from "./router";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { UsuariosDTO } from "../DTOs/usuarios.DTO";

export class UsuariosRouter extends BaseRouter<UsuariosController, ConfigMiddleware> {
    constructor() {
        super(UsuariosController, ConfigMiddleware)
    }

    routes(): void {
        this.router.post('/CreateUser',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(UsuariosDTO),
            (req: Request, res: Response) => {
                this.controller.CreateUser(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/users',
            this.middleware.checkJwtAuth(),
            (req: Request, res: Response) => {
                this.controller.getUsers(req, res).catch(err => res.status(500).send(err.message));
            });

        this.router.put('/deleteUser/:id',
            this.middleware.checkJwtAuth(),
            (req: Request, res: Response) => {
                this.controller.DeleteUser(req, res).catch(err => res.status(500).send(err.message));
            });
    }
}