import { Request, Response } from "express";
import { LecheSaleExtraccionFriam016Service } from "../services/lecheSaleExtraccionFriam016.service";
import { HttpResponse } from "../shared/responses/http.response";

export class LecheSalaExtraccionController {
    constructor(
        private readonly lecheSalaExtraccionService: LecheSaleExtraccionFriam016Service = new LecheSaleExtraccionFriam016Service(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    )
    {}

    async postLecheSalaExtraccion(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.lecheSalaExtraccionService.postLecheSalaExtraccion(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async postFrascosExtraccion(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.lecheSalaExtraccionService.postFrascosExtraccionRecolectados(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getAllLecheSalaExtraccion(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.lecheSalaExtraccionService.getAllLecheSalaExtraccion();
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async putLecheSalaExtraccion(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.lecheSalaExtraccionService.putLecheSalaExtraccion(Number(id), body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
