import { Request, Response } from "express";
import { CurvaPenetracionService } from "../services/curvaPenetracion.service";
import { HttpResponse } from "../shared/responses/http.response";

export class CurvaPenetracionController {
    constructor(
        private readonly curvaPenetracionService: CurvaPenetracionService = new CurvaPenetracionService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async createCurvaPenetracion(req: Request, res: Response) {
        try {
            const data = await this.curvaPenetracionService.createCurvaPenetracion(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getCurvaPenetracion(req: Request, res: Response) {
        try {
            const { volumen } = req.params;
            const data = await this.curvaPenetracionService.getCurvaPenetracion(Number(volumen));
            if (data.length === 0) {
                return this.httpResponse.NoContent(res, "No hay curvas de penetración registradas para este volumen");
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateCurvaPenetracion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.curvaPenetracionService.updateCurvaPenetracion(Number(id), req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}