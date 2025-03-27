import { Request, Response } from "express";
import { MadresPotencialesServices } from "../services/madresPotenciales.service";
import { HttpResponse } from "../shared/responses/http.response";

export class MadresPotencialesController {
    constructor(
        private readonly madresPotencialesServices:MadresPotencialesServices = new MadresPotencialesServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) 
    { }

    async CreateMadrePotencial(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.madresPotencialesServices.CreateMadrePotencial(req.body);
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async UpdateMadrePotencial(req:Request, res:Response): Promise<Response>{
        try {
            const { id } = req.params;
            const data = await this.madresPotencialesServices.UpdateMadrePotencial(Number(id),req.body);
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async getMadrePotencial(req:Request, res:Response): Promise<Response>{
        try {
            const { mes, anio } = req.query;
            const data = await this.madresPotencialesServices.getMadrePotencial(Number(mes),Number(anio));
            if(data.length === 0) return this.httpResponse.NotFound(res,"Data not found");
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

}