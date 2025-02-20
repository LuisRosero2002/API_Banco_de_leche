import { Router } from "express";

export class BaseRouter<T> {
    public router: Router;
    public controller:T;
    // public middleware: U
    
    constructor(
        TController: {new (): T;},
        // Umiddleware: {new (): U;}
    ) {
        this.router = Router();
        this.controller = new TController();
        // this.middleware = new Umiddleware();
        this.routes();
    }

    routes(){}
}