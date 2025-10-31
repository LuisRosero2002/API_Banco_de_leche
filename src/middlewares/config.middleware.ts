import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/responses/http.response";
import { UsuariosEntity } from "../entities/usuarios.entity";

export class ConfigMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    ValidateDTO<T extends object>(DTOClass: new () => T) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const instance = plainToInstance(DTOClass, req.body);
                const errors = await validate(instance);

                if (errors.length > 0) {
                    this.httpResponse.BadRequest(res, errors);
                    return; 
                }

                next();
            } catch (error) {
                res.status(500).json({ message: "Error en la validación", error });
                return; 
            }
        };
    }

    passAuth(type:string){
        return passport.authenticate(type,{session:false});
    }

    // Middleware para validar JWT en todas las rutas protegidas
    checkJwtAuth(){
        return passport.authenticate("jwt", {session: false});
    }

    // PENDIENTE
    checkAdminRole(req:Request, res:Response, next: NextFunction){
        const user = req.user as UsuariosEntity;
        // if(user.role != RoleType.ADMIN){
        //     return this.httpResponse.Error(res,"No tienes permiso");
        // }
        return next()
    }

}
