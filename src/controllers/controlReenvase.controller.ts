import { Request, Response } from "express";
import { ControlReenvaseServices } from "../services/controlReenvase.service";
import { HttpResponse } from "../shared/responses/http.response";

export class ControlReenvaseController {
    constructor(
        private readonly control: ControlReenvaseServices = new ControlReenvaseServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) 
    {}

    async GetFrascosByMadreDonante(req: Request, res: Response): Promise<Response> {
        try {
            const {id} = req.params;
            const data = await this.control.getFrascosByMadreDonante(Number(id));
            if(data.length === 0) return this.httpResponse.NotFound(res, "No hay frascos registrados para esta madre donante");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}