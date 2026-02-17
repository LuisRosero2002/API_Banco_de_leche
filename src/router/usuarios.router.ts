import { Request, Response } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { BaseRouter } from "./router";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { UsuariosDTO } from "../DTOs/usuarios.DTO";
import { isAdmin, isAdminOrAuxiliar } from "../middlewares/check-role.middleware";

export class UsuariosRouter extends BaseRouter<UsuariosController, ConfigMiddleware> {
    constructor() {
        super(UsuariosController, ConfigMiddleware)
    }

    routes(): void {
        // Solo administradores pueden crear usuarios
        this.router.post('/CreateUser',
            // this.middleware.checkJwtAuth(),
            // isAdmin(), // Middleware de rol
            this.middleware.ValidateDTO(UsuariosDTO),
            (req: Request, res: Response) => {
                this.controller.CreateUser(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        // Tanto administradores como auxiliares pueden ver usuarios
        this.router.get('/users',
            // this.middleware.checkJwtAuth(),
            // isAdminOrAuxiliar(), // Middleware de rol
            (req: Request, res: Response) => {
                this.controller.getUsers(req, res).catch(err => res.status(500).send(err.message));
            });

        // Solo administradores pueden eliminar usuarios
        this.router.put('/deleteUser/:id',
            // this.middleware.checkJwtAuth(),
            // isAdmin(), // Middleware de rol
            (req: Request, res: Response) => {
                this.controller.DeleteUser(req, res).catch(err => res.status(500).send(err.message));
            });
    }
}