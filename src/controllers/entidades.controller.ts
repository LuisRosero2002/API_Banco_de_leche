import { HttpResponse } from "../shared/responses/http.response";
import { EntidadesServices } from "../services/entidades.service";
import { Request, Response } from "express";
import { UpdateResult } from "typeorm";

export class EntidadesController {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly entidadesServices: EntidadesServices = new EntidadesServices()
    ) { }

    async getAllEntidades(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.entidadesServices.getAllEntidades();
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getEntidadById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.entidadesServices.getEntidadById(Number(id));
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createEntidad(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.entidadesServices.createEntidad(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteEntidad(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.entidadesServices.deleteEntidad(Number(id));
            if(data.affected === 0) return this.httpResponse.NotFound(res, { message: "Entidad no encontrada" });
            return this.httpResponse.Ok(res, { message: "Entidad desactivada" });
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}