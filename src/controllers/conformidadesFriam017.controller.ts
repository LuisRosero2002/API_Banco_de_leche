import { Request, Response } from "express";
import { ConformidadesFriam017Service } from "../services/conformidadesFriam017.service";
import { HttpResponse } from "../shared/responses/http.response";

export class ConfomidadesFriam016Controller {
    constructor(
        private readonly conformidades: ConformidadesFriam017Service = new ConformidadesFriam017Service(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getConformidades(req: Request, res: Response) {
        try {
            const { mes } = req.params;
            const { anio } = req.params;
            const data = await this.conformidades.getConformidades(Number(mes), Number(anio));
            if (data.length === 0) return this.httpResponse.NoContent(res, 'No se encontraron datos');
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getFrascosByLote(req: Request, res: Response) {
        try {
            const { lote } = req.params;
            const { fecha } = req.params;
            const data = await this.conformidades.getFrascosByLote(Number(lote), fecha);
            if (data.length === 0) return this.httpResponse.NoContent(res, 'No se encontraron datos');
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createConformidad(req: Request, res: Response) {
        try {
            const data = await this.conformidades.createConformidad(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}