import { Request, Response } from "express";
import { EmpleadosServices } from "../repository/empleados.service";
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
}