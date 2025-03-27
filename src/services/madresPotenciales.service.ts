import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { MadresPotencialesDTO } from "../DTOs/madresPotenciales.DTO";
import { InfoMadresEntity } from "../entities/infoMadres.entity";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { UsuariosEntity } from "../entities/usuarios.entity";
import { InformacionMadresService } from "./infoMadres.service";
import { MadresPotencialesQueryResult } from "../interfaces/madresPotenciales.interface";

export class MadresPotencialesServices extends BaseService<MadresPotencialesEntity> {

    constructor(
        private readonly _InfoMadresService: InformacionMadresService = new InformacionMadresService()
    ) {
        super(MadresPotencialesEntity);
    }

    async CreateMadrePotencial(body: MadresPotencialesDTO): Promise<MadresPotencialesEntity> {
        const newInfoMadre: InfoMadresEntity = await this._InfoMadresService.CreateInfoMadre(body.infoMadre!);
        let madrePotencial = new MadresPotencialesEntity();
        madrePotencial.infoMadre = newInfoMadre;
        return (await this.execRepository).save(madrePotencial);
    }

    async UpdateMadrePotencial(id: number, body: MadresPotencialesDTO): Promise<UpdateResult> {
        await this._InfoMadresService.UpdateInfoMadre(body.infoMadre!);
        let UpdatemadrePotencial = new MadresPotencialesEntity();
        UpdatemadrePotencial = Object.assign(UpdatemadrePotencial, body);
        return (await this.execRepository).update(id, body);
    }

    async getMadrePotencial(mes:number,anio:number): Promise<MadresPotencialesQueryResult[]> {
        const repository = await this.execRepository;
        const queryBuilder = repository.createQueryBuilder("m")
            .innerJoin("m.infoMadre", "im")
            .innerJoin("m.entidad", "e")
            .innerJoin("m.empleado", "em")
            .select([
                "e.nombre AS entidad",
                "im.nombre AS nombre",
                "im.apellido AS apellido",
                "im.fecha_parto AS fechaParto",
                "im.documento AS documento",
                "im.fecha_nacimiento AS fechaNacimiento",
                "im.telefono AS telefono",
                "im.barrio AS barrio",
                "im.direccion AS direccion",
                "m.educacion_presencial AS educacionPresencial",
                "m.fecha_llamada AS fechaLlamada",
                "m.llamada AS llamada",
                "em.nombre AS responsable",
                "m.asesoria AS asesoria",
                "m.donante_efectiva AS donanteEfectiva",
                "m.fecha_visita AS fechaVisita",
                "m.observacion AS observacion"
            ])
            .where("MONTH(m.fecha_registro) = :mes", { mes })
            .andWhere("YEAR(m.fecha_registro) = :anio", { anio });

        return await queryBuilder.getRawMany();

    }


}