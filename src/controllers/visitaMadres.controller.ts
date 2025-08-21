import { Request, Response } from "express";
import { HttpResponse } from "../shared/responses/http.response";
import { VisitaMadresServices } from "../services/visitaMadres.service";

export class VisitaMadreController {
    constructor(
        private readonly visitaMadreService: VisitaMadresServices = new VisitaMadresServices(),
        private readonly httpResponse:HttpResponse = new HttpResponse()
    ) 
    {}

    async CreateVisitaMadre(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.visitaMadreService.createVisitaMadre(req.body);
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async SaveRespuestasVisitaMadre(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.visitaMadreService.saveRespuestasVisitaMadre(req.body);
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async GetRespuestasVisitaMadre(req:Request, res:Response): Promise<Response>{
        try {
            const { id } = req.params;
            const data = await this.visitaMadreService.getRespuestasVisitaMadre(Number(id));
            if(data.length === 0) return this.httpResponse.NoContent(res,"Data not found");
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async GetPreguntasVisitaMadre(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.visitaMadreService.getPreguntasVisitaMadre();
            if(data.length === 0) return this.httpResponse.NoContent(res,"Data not found");
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async GetCategoriasVisitaMadre(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.visitaMadreService.getCategoriasVisitaMadre();
            if(data.length === 0) return this.httpResponse.NoContent(res,"Data not found");
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }
}