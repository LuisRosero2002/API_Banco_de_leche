import { Request, Response } from "express";
import { LecheDistribucionFrhos063Service } from "../services/lecheDistribucionFrhos063.service";
import { HttpResponse } from "../shared/responses/http.response";

export class LecheDistribucionFrhos063Controller {
    constructor(
        private lecheDistribucionService: LecheDistribucionFrhos063Service = new LecheDistribucionFrhos063Service(),
        private httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async postLecheDistribucion(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const data = await this.lecheDistribucionService.postLecheDistribucion(body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getLecheDistribucion(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.lecheDistribucionService.getLecheDistribucion();
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
    async putLecheDistribucion(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.lecheDistribucionService.putLecheDistribucion(Number(id), body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "ID not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}