import { Request, Response } from "express";
import { DistribucionFriam031Service } from "../services/distribucionFriam031.service";
import { HttpResponse } from "../shared/responses/http.response";
import { DistribucionFriam031DTO } from "../DTOs/distribucionFriam031.DTO";

export class DistribucionFriam031Controller {
    constructor(
        private readonly service: DistribucionFriam031Service = new DistribucionFriam031Service(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async GetDistribucionPorMes(req: Request, res: Response): Promise<Response> {
        try {
            const { mes, anio } = req.params;
            const data = await this.service.getDistribucionPorMes(Number(mes), Number(anio));

            if (!data || data.length === 0) {
                return this.httpResponse.NoContent(res, "No se encontraron distribuciones para este mes");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetDistribucionById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.service.getDistribucionById(Number(id));
            if (!data) return this.httpResponse.NoContent(res, "No hay registro para este ID");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutDistribucion(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body: DistribucionFriam031DTO = req.body;
            const result = await this.service.putDistribucion(Number(id), body);
            if (result.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar la distribución o no se encontró el registro.");
            return this.httpResponse.Ok(res, result);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostDistribucion(req: Request, res: Response): Promise<Response> {
        try {
            const body: DistribucionFriam031DTO = req.body;
            const data = await this.service.createDistribucion(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetAllFrascosPasteurizados(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.service.getAllFrascosPasteurizados();
            if (!data || data.length === 0) return this.httpResponse.NoContent(res, "No se encontraron frascos pasteurizados");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
