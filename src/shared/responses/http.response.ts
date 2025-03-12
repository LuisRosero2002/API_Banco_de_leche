import { Response } from "express";

export enum HttpStatus{
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export class HttpResponse{
    Ok(res:Response,data?:any):Response{
        return res.status(HttpStatus.OK).json({
            status:HttpStatus.OK,
            statusmsg:"OK",
            data:data
        })
    }

    NoContent(res:Response,data?:any):Response{
        return res.status(HttpStatus.NO_CONTENT).json({
            status:HttpStatus.NO_CONTENT,
            statusmsg:"No Content",
            data:data
        })
    }

    NotFound(res:Response,data?:any):Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status:HttpStatus.NOT_FOUND,
            statusmsg:"Not Found",
            error:data
        })
    }

    BadRequest(res:Response,data?:any):Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status:HttpStatus.BAD_REQUEST,
            statusmsg:"Data Invalid",
            error:data
        })
    }

    Unauthorized(res:Response,data?:any):Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status:HttpStatus.UNAUTHORIZED,
            statusmsg:"Unauthorized",
            error:data
        })
    }

    Forbidden(res:Response,data?:any):Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            status:HttpStatus.FORBIDDEN,
            statusmsg:"Forbidden",
            error:data
        })
    }

    Error(res:Response,data?:any):Response{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status:HttpStatus.INTERNAL_SERVER_ERROR,
            statusmsg:"Internal Server Error",
            error:data
        })
    }

}