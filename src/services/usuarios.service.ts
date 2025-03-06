import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { UsuariosDTO } from "../DTOs/usuarios.DTO";
import { UsuariosEntity } from "../entities/usuarios.entity";
import * as bcrypt from "bcrypt";

export class UsuariosService extends BaseService<UsuariosEntity>{
    constructor(){
        super(UsuariosEntity);
    }

    async CreateUser(body:UsuariosDTO):Promise<UsuariosEntity>{
        const newUser = (await this.execRepository).create(body);
        const hash = await bcrypt.hash(newUser.password,10);
        newUser.password = hash;
        const repository = await this.execRepository;
        return repository.save(newUser);
    }

    async DeleteUser(id:string):Promise<UpdateResult>{
        const repository = await this.execRepository;
        return repository.update(id,{activo:0});
    }

    async FindUserbyUsername(username:string):Promise<UsuariosEntity | undefined | null>{
        const repository = await this.execRepository;
        const user = repository.createQueryBuilder("user")
        .addSelect("user.password")
        .where({username})
        .getOne();
        return user;
    }

    async FindAll():Promise<UsuariosEntity[]>{
        const repository = await this.execRepository;
        return repository.find();
    }
}