import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/responses/http.response";

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
}
