import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { EntidadesEntity } from "../entities/entidades.entity";

export class EntidadesServices extends BaseService<EntidadesEntity>{
    constructor(){
        super(EntidadesEntity);
    }

    async getAllEntidades():Promise<EntidadesEntity[]>{
        return (await this.execRepository).find();
    }

    async getEntidadById(id:number):Promise<EntidadesEntity | undefined | null>{
        return (await this.execRepository).findOneBy({id});
    }

    async createEntidad(body:EntidadesEntity):Promise<EntidadesEntity>{
        return (await this.execRepository).save(body);
    }

    async deleteEntidad(id:number):Promise<UpdateResult>{
        return (await this.execRepository).update(id,{activo:0});
    }
}