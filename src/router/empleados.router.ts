import { Request, Response } from "express";
import { EmpleadosController } from "../controllers/empleados.controller";
import { BaseRouter } from "./router";

export class EmpleadosRouter extends BaseRouter<EmpleadosController>{
    constructor(){
        super(EmpleadosController)
    }

    routes(): void {
        this.router.post('/CreateEmpleado', async (req: Request, res: Response) => {
            try {
                await this.controller.CreateEmpleado(req, res);
            } catch (error) {
                console.error("Error en la creación de empleado:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
        
    }

}