import { Request, Response } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { BaseRouter } from "./router";
import { ConfigMiddleware } from "../middlewares/config.middleware";

export class UsuariosRouter extends BaseRouter<UsuariosController,ConfigMiddleware>{
    constructor(){
        super(UsuariosController,ConfigMiddleware)
    }

    routes(): void {
        this.router.post('/CreateUser',  
        (req:Request,res:Response) => {
            this.controller.CreateUser(req, res)
                .catch(err => res.status(500).send(err.message));
        });

        this.router.get('/users', (req:Request, res:Response) => {
            this.controller.getUsers(req, res).catch(err => res.status(500).send(err.message));
        });

        this.router.put('/deleteUser/:id', 
            (req, res, next) => {
                //MIDDLEWARE
            },   
            (req:Request, res:Response) => {
                this.controller.DeleteUser(req, res).catch(err => res.status(500).send(err.message));
        });
    }
}