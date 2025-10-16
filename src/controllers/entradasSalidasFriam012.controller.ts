import { Request, Response } from "express";
import { EntradasSalidasLecheCrudaService } from "../services/entradasSalidasLecheCruda.service";
import { HttpResponse } from "../shared/responses/http.response";

export class EntradasSalidasFriam012Controller {
    constructor(
        private readonly rutaRecoleccionService: EntradasSalidasLecheCrudaService = new EntradasSalidasLecheCrudaService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    )
    {}

    async getEntradasSalidaLecheCruda(req: Request, res: Response): Promise<Response> {
        try {
            const { mes, anio } = req.params;
            const data = await this.rutaRecoleccionService.getEntradasSalidaLecheCruda(Number(mes), Number(anio));
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createEntradaSalidaLecheCruda(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.rutaRecoleccionService.createEntradaSalidaLecheCruda(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async putEntradaSalidaLecheCruda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.rutaRecoleccionService.putEntradaSalidaLecheCruda(Number(id), body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "ID not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}