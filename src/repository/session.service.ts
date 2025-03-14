import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { SessionDTO } from "../DTOs/session.DTO";
import { SessionEntity } from "../entities/sessions.entity";
import { UsuariosEntity } from "../entities/usuarios.entity";

export class SessionService extends BaseService<SessionEntity> {
    constructor() {
        super(SessionEntity)
    }

    async insertToken(dataUser: SessionDTO): Promise<SessionEntity> {
        return (await this.execRepository).save(dataUser);
    }

    async sessionValidate(dataUser: UsuariosEntity): Promise<SessionEntity | undefined | null> {
        const repository = await this.execRepository;
        return repository.findOneBy({ id: dataUser.id });
    }

    async updateToken(token: SessionDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(
            { usuario: { id: token.usuario.id } },
            { token: token.token } 
        );
    }
}