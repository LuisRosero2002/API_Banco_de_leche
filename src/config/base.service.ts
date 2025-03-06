import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ConfigServer } from "./config.server";
import { UsuariosEntity } from "../entities/usuarios.entity";

export class BaseService<T extends ObjectLiteral> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.InitConnect();
        return getConn.getRepository(entity);
    }
}
