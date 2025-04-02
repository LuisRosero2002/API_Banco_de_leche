import { Request, Response } from "express";
import { RutaRecoleccionService } from "../services/rutaRecoleccion.service";
import { HttpResponse } from "../shared/responses/http.response";

export class RutaRecoleccionController {
    constructor(
        private readonly rutaRecoleccionService: RutaRecoleccionService = new RutaRecoleccionService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}

    async createRutaRecoleccion(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.rutaRecoleccionService.createRutaRecoleccion(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getAllRutasRecoleccion(req: Request, res: Response): Promise<Response> {
        try {
            const { mes, anio } = req.query;
            const data = await this.rutaRecoleccionService.getAllRutasRecoleccion(Number(mes), Number(anio));
            if (data.length === 0) return this.httpResponse.NotFound(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createTemperaturaCasas(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.rutaRecoleccionService.createTemperaturaCasas(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getTemperaturasCasas(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.rutaRecoleccionService.getTemperaturasCasas(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateRutaRecoleccion(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.rutaRecoleccionService.updateRutaRecoleccion(Number(id), req.body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar la data");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createCasasVisitas(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.rutaRecoleccionService.createCasasVisitas(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getCasasVisitas(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.rutaRecoleccionService.getCasasVisitas(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createFrascosRecolectados(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.rutaRecoleccionService.createFrascosRecolectados(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getFrascosRecolectadosById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.rutaRecoleccionService.getFrascosRecolectados(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

}