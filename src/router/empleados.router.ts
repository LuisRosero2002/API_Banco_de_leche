import { Request, Response } from "express";
import { EmpleadosController } from "../controllers/empleados.controller";
import { BaseRouter } from "./router";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { EmpleadosDTO } from "../DTOs/empleados.DTO";

export class EmpleadosRouter extends BaseRouter<EmpleadosController, ConfigMiddleware> {
    constructor() {
        super(EmpleadosController, ConfigMiddleware);
    }

    routes(): void {
        this.router.post(
            "/CreateEmpleado",this.middleware.ValidateDTO(EmpleadosDTO),
            (req: Request, res: Response) => {
                this.controller.CreateEmpleado(req, res);
            }
        );
    }
}
