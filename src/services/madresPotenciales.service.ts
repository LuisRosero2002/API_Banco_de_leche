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
        let madrePotencial: MadresPotencialesDTO = body;
        madrePotencial.infoMadre = newInfoMadre;
        return (await this.execRepository).save(madrePotencial);
    }

    async UpdateMadrePotencial(id: number, body: MadresPotencialesDTO): Promise<UpdateResult> {
        await this._InfoMadresService.UpdateInfoMadre(body.infoMadre!);
        const { fecha_registro, ...newBody } = body;
        // let UpdatemadrePotencial = new MadresPotencialesEntity();
        // UpdatemadrePotencial = Object.assign(UpdatemadrePotencial, newBody);
        return (await this.execRepository).update(id, newBody);
    }

    async getMadrePotencial(mes: number, anio: number): Promise<MadresPotencialesQueryResult[]> {
        const repository = await this.execRepository;
        const queryBuilder = repository.createQueryBuilder("m")
            .innerJoin("m.infoMadre", "im")
            .innerJoin("m.entidad", "e")
            .innerJoin("m.empleado", "em")
            .select([
                "m.id_madre_potencial AS idMadrePotencial",
                "m.id_info_madre AS infoMadre",
                "e.nombre AS entidad",
                "im.nombre AS nombre",
                "im.apellido AS apellido",
                "im.fecha_parto AS fechaParto",
                "im.documento AS documento",
                "im.fecha_nacimiento AS fechaNacimiento",
                "im.telefono AS telefono",
                "im.celular AS celular",
                "im.barrio AS barrio",
                "im.direccion AS direccion",
                "im.ciudad AS ciudad",
                "m.educacion_presencial AS educacionPresencial",
                "m.fecha_llamada AS fechaLlamada",
                "m.llamada AS llamada",
                "em.nombre AS responsable",
                "m.asesoria AS asesoria",
                "m.donante_efectiva AS donanteEfectiva",
                "m.fecha_visita AS fechaVisita",
                "m.observacion AS observacion",
                "m.fecha_registro AS fechaRegistro",
            ])
            .where("MONTH(m.fecha_registro) = :mes", { mes })
            .andWhere("YEAR(m.fecha_registro) = :anio", { anio })
            .orderBy("m.fecha_registro", "DESC");

        return await queryBuilder.getRawMany();

    }

    async getAllMadrePotencial(): Promise<MadresPotencialesEntity[]> {
        const repository = await this.execRepository;
        const resultados = repository
            .createQueryBuilder('mp')
            .innerJoinAndSelect('mp.infoMadre', 'im')
            .where('mp.donante_efectiva = :valor', { valor: 1 })
            .orderBy('mp.fecha_registro', 'DESC')
            .getMany();

        return resultados;
    }

    async getAllMadrePotencialByMadreDonante(): Promise<MadresPotencialesEntity[]> {
        const repository = await this.execRepository;
        const resultados = repository
            .createQueryBuilder('mp')
            .innerJoinAndSelect('mp.infoMadre', 'im')
            .innerJoinAndSelect('mp.MadreDonante', 'md')
            .innerJoinAndSelect('md.laboratorio', 'lab')
            .where('md.donanteApta = :valor', { valor: 1 })
            .orderBy('mp.fecha_registro', 'DESC')
            .getMany();

        return resultados;
    }

    async getInfoCompleteMadrePotencial(id: number): Promise<MadresPotencialesEntity | null> {
        const repository = await this.execRepository;
        const resultados = repository
            .createQueryBuilder('mp')
            .innerJoinAndSelect('mp.infoMadre', 'im')
            .innerJoinAndSelect('mp.MadreDonante', 'md')
            .innerJoinAndSelect('md.laboratorio', 'lab')
            .innerJoinAndSelect('md.gestacion', 'g')
            .innerJoinAndSelect('md.hijosMadre', 'hm')
            .innerJoinAndSelect('md.examenesPrenatal', 'ep')
            .innerJoinAndSelect('md.medicamento', 'm')
            .where('mp.id_madre_potencial = :id', { id })
            .getOne();

        return resultados;
    }


}