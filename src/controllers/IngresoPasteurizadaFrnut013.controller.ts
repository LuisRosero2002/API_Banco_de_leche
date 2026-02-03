import { Request, Response } from "express";
import { IngresoLechePasteurizadaFrnut013Service } from "../services/ingresoLechePasteurizdaFrnut013.service";
import { HttpResponse } from "../shared/responses/http.response";

export class IngresoPasteurizadaFrnut013Controller {
    constructor(
        private readonly ingresoPasteurizadaService: IngresoLechePasteurizadaFrnut013Service = new IngresoLechePasteurizadaFrnut013Service(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getIngresoLechePasteurizadaFrnut013(req: Request, res: Response): Promise<Response> {
        try {
            const { mes, anio } = req.params;
            const data = await this.ingresoPasteurizadaService.getIngresoLechePasteurizadaFrnut013(Number(mes), Number(anio));
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async postIngresoLechePasteurizadaFrnut013(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.ingresoPasteurizadaService.postIngresoLechePasteurizadaFrnut013(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async putIngresoLechePasteurizadaFrnut013(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.ingresoPasteurizadaService.putIngresoLechePasteurizadaFrnut013(Number(id), body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "ID not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getLactariosByIngresoLechePasteurizada(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.ingresoPasteurizadaService.getLactariosByIngresoLechePasteurizada(Number(id));
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async postLactarioByIngresoLechePasteurizada(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.ingresoPasteurizadaService.postLactarioByIngresoLechePasteurizada(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async putLactarioByIngresoLechePasteurizada(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.ingresoPasteurizadaService.putLactarioByIngresoLechePasteurizada(Number(id), body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "ID not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getAllFrascosPasteurizados(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.ingresoPasteurizadaService.getAllFrascosPasteurizados();
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

}