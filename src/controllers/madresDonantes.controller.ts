import { Request, Response } from "express";
import { HttpResponse } from "../shared/responses/http.response";
import { MadresDonantesServices } from "../services/madresDonantes.service";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import path from 'path';
import fs from 'fs';


export class MadresDonantesController {
    constructor(
        private readonly madresDonantesServices:MadresDonantesServices = new MadresDonantesServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    )
    {}

    async CreateMadreDonante(req:Request, res:Response):Promise<Response>{
        try {
            const data = await this.madresDonantesServices.CreateMadreDonante(req.body);
            return this.httpResponse.Ok(res,data);
            
        } catch (error) {
            return this.httpResponse.Error(res,error);
            
        }
    }

    async GetMadresDonantes(req:Request, res:Response):Promise<Response>{
        try {
            const data = await this.madresDonantesServices.GetMadresDonantes();
            if(data.length === 0) return this.httpResponse.NoContent(res,"Data not found");
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async uploadPDF(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const pdf = req.file as Express.Multer.File;
    
            const data = await this.madresDonantesServices.uploadPDF(pdf, body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getPdf(req: Request, res: Response): Promise<Response | void> {
        try {
            const { filename } = req.params;
            const filePath = path.join(__dirname, '..','..','..','pdfs', filename);
            if (!fs.existsSync(filePath)) {
                return this.httpResponse.NotFound(res, "PDF not found");
            }
            return res.sendFile(filePath)
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
    
}