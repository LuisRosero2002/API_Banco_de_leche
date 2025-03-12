import { Request, Response } from "express";
import { UsuariosService } from "../repository/usuarios.service";
import { HttpResponse } from "../shared/responses/http.response";
import { UpdateResult } from "typeorm";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { UsuariosDTO } from "../DTOs/usuarios.DTO";
export class UsuariosController {
    constructor(
        private readonly userService:UsuariosService = new UsuariosService(),
        private readonly httpResponse:HttpResponse = new HttpResponse())
    {}

    async getUsers(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.userService.FindAll();
            if(data.length === 0){
                return this.httpResponse.NoContent(res,"Data No content");
            }
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async CreateUser(req:Request, res:Response): Promise<Response>{
        try {
            const data = await this.userService.CreateUser(req.body);
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }

    async DeleteUser(req:Request, res:Response): Promise<Response>{
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.userService.DeleteUser(id);
            if(data.affected === 0){
                return this.httpResponse.NotFound(res,"Hay un error al destactivar el usuario");
            }
            return this.httpResponse.Ok(res,data);
        } catch (error) {
            return this.httpResponse.Error(res,error);
        }
    }
}