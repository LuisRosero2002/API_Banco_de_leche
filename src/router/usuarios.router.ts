import { Request, Response } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { BaseRouter } from "./router";

export class UsuariosRouter extends BaseRouter<UsuariosController>{
    constructor(){
        super(UsuariosController)
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

        this.router.put('/UpdateUser/:id', 
            (req, res, next) => {
                //MIDDLEWARE
            },   
            (req:Request, res:Response) => {
                this.controller.DeleteUser(req, res).catch(err => res.status(500).send(err.message));
        });
    }
}