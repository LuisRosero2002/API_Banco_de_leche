import { Request, Response } from "express";
import { UsuariosEntity } from "../../entities/usuarios.entity";
import { HttpResponse } from "../../shared/responses/http.response";
import { AuthService } from "../services/auth.service";
import { SessionService } from "../../repository/session.service";
import { SessionDTO } from "../../DTOs/session.DTO";

interface UserDTO {
    usuario:string,
    password:string
}

export class AuthController extends AuthService{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly sessionServices: SessionService =  new SessionService()
    ){
        super()
    }

    async login(req:Request, res:Response){
        try {
            const userEncode = req.user as UsuariosEntity;
            const encode = await this.generateJWT(userEncode);
            const dataSession: SessionDTO = {
                usuario: userEncode,
                token: encode.accessToken
            }
            if(!encode){
                return this.httpResponse.Unauthorized(res, "No tienes permisos");
            }
            const sessionValidate = await this.sessionServices.sessionValidate(userEncode);
            if(sessionValidate) {
                const update = this.sessionServices.updateToken(dataSession);
            }else{
                const data = await this.sessionServices.insertToken(dataSession);
                if(!data || !data.id){
                    return this.httpResponse.Error(res);
                }
            }

            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge:1000 * 60 * 60 * 24 * 365});
            res.write(JSON.stringify(encode));
            res.end();


        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res, error);
        }
    }
}