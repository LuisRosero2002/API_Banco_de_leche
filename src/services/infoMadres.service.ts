import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { MadresPotencialesDTO } from "../DTOs/madresPotenciales.DTO";
import { InfoMadresEntity } from "../entities/infoMadres.entity";
import { InfoMadresDTO } from "../DTOs/infoMadres.DTO";

export class InformacionMadresService extends BaseService<InfoMadresEntity>{
    constructor(){
        super(InfoMadresEntity);
    }

    async CreateInfoMadre(body:InfoMadresDTO):Promise<InfoMadresEntity>{
        return (await this.execRepository).save(body);
    }

    async UpdateInfoMadre(body:InfoMadresDTO):Promise<UpdateResult>{
        const { id } = body;
        const repository = await this.execRepository;
        return repository.update(id,body);
    }


}