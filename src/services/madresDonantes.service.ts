import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { MadreDonanteDTO } from "../DTOs/madresDonantes.DTO";
import { ExamenesPrenatalEntity } from "../entities/examenesPrenatal.entity";
import { GestacionEntity } from "../entities/gestacion.entity";
import { HijosMadresEntity } from "../entities/hijosMadres.entity";
import { LaboratoriosEntity } from "../entities/laboratorios.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { MedicamentosEntity } from "../entities/medicamentos.entity";

export class MadresDonantesServices extends BaseService<MadresDonantesEntity> {
    constructor() {
        super(MadresDonantesEntity)
    }

    async CreateMadreDonante(body: MadreDonanteDTO): Promise<MadresDonantesEntity> {
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const repoMain = await this.execRepository;
            const hijosMadreData = AppDataSource.getRepository(HijosMadresEntity);
            const gestacionData = AppDataSource.getRepository(GestacionEntity);
            const examenesData = AppDataSource.getRepository(ExamenesPrenatalEntity);
            const medicamentosData = AppDataSource.getRepository(MedicamentosEntity);

            const newMadreDonante = await repoMain.save(body);

            // Hijos
            if (body.hijosMadre.length > 0) {
                const newHijosMadre = body.hijosMadre.map(hijo => {
                    return Object.assign(new HijosMadresEntity(), hijo, {
                        madreDonantes: newMadreDonante
                    });
                });
                await hijosMadreData.save(newHijosMadre);
            }

            // Gestación
            const newGestacion = Object.assign(new GestacionEntity(), body.gestacion, {
                madreDonante: newMadreDonante
            });
            await gestacionData.save(newGestacion);

            // Exámenes
            const newExamen = Object.assign(new ExamenesPrenatalEntity(), body.examenPrenatal, {
                madreDonante: newMadreDonante
            });
            await examenesData.save(newExamen);

            // Medicamentos
            const newMedicamentos = Object.assign(new MedicamentosEntity(), body.medicamento, {
                madreDonante: newMadreDonante
            });
            await medicamentosData.save(newMedicamentos);

            // Commit 
            await queryRunner.commitTransaction();

            const madreFinal = await repoMain.findOne({
                where: { id: newMadreDonante.id },
                relations: ['hijosMadre', 'gestacion', 'examenesPrenatal', 'medicamento']
            });
            return madreFinal!;

        } catch (error) {
            // Rollback 
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async GetMadresDonantes() {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const repoMain = await this.execRepository;
            return await repoMain.createQueryBuilder('md')
                .innerJoin('md.madrePotencial', 'mp')
                .innerJoin('mp.infoMadre', 'im')
                .select([
                    'md.id_madre_donante AS id_madre_donante',
                    'md.donante_apta AS donante_apta',
                    'mp.donante_efectiva AS donante_efectiva',
                    'im.documento AS documento',
                    'im.nombre AS nombre',
                    'im.apellido AS apellido',
                    'im.direccion AS direccion',
                    'im.telefono AS telefono',
                    'im.celular AS celular',
                ])
                .where('md.donante_apta = 1')
                .andWhere('mp.donante_efectiva = 1')
                .getRawMany();

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }

    }

    async uploadPDF(file: Express.Multer.File, body: any): Promise<any> {
        const laboratoriosData = AppDataSource.getRepository(LaboratoriosEntity);

        const newLaboratorio = Object.assign(new LaboratoriosEntity(), {
            resultado: body.resultado,
            fechaVencimiento: body.fechaVencimiento,
            madreDonante: { id: body.madreDonante },
            tipoLaboratorio: body.tipoLaboratorio,
            documento: file.filename
        });
        return await laboratoriosData.save(newLaboratorio);

    }



}