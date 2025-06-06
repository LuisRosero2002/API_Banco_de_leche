import { Request, Response } from "express";
import { EmpleadosServices } from "../services/empleados.service";
import { HttpResponse } from "../shared/responses/http.response";

export class EmpleadosController {
    constructor(
        private readonly empleadosServices: EmpleadosServices = new EmpleadosServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) 
    {}

    async CreateEmpleado(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.empleadosServices.CreateEmpleado(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetEmpleados(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.empleadosServices.GetEmpleados();
            if(data.length === 0) return this.httpResponse.NotFound(res, "No hay empleados registrados");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}