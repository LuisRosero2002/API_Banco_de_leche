import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { MadreDonanteDTO } from "../DTOs/madresDonantes.DTO";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";
import { ExamenesPrenatalEntity } from "../entities/examenesPrenatal.entity";
import { ExtraccionFriam016Entity } from "../entities/extraccionFriam016.entity";
import { GestacionEntity } from "../entities/gestacion.entity";
import { HijosMadresEntity } from "../entities/hijosMadres.entity";
import { InfoMadresEntity } from "../entities/infoMadres.entity";
import { LaboratoriosEntity } from "../entities/laboratorios.entity";
import { LecheSalaExtraccionFriam016Entity } from "../entities/lecheSalaExtraccionFriam016.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
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
            let newMadre: MadreDonanteDTO = body;
            let newMadreAux: MadreDonanteDTO = JSON.parse(JSON.stringify(body));
            const repoMain = await this.execRepository;
            const infoMadre = AppDataSource.getRepository(InfoMadresEntity);
            const hijosMadreData = AppDataSource.getRepository(HijosMadresEntity);
            const gestacionData = AppDataSource.getRepository(GestacionEntity);
            const examenesData = AppDataSource.getRepository(ExamenesPrenatalEntity);
            const medicamentosData = AppDataSource.getRepository(MedicamentosEntity);
            const madrePotencialData = AppDataSource.getRepository(MadresPotencialesEntity);

            // Gestación
            const newGestacion = Object.assign(new GestacionEntity(), body.gestacion, {
                madreDonante: newMadre.madreDonante
            });

            // Exámenes
            const newExamen = Object.assign(new ExamenesPrenatalEntity(), body.examenPrenatal, {
                madreDonante: newMadre.madreDonante
            });

            // Medicamentos
            const newMedicamentos = Object.assign(new MedicamentosEntity(), body.medicamento, {
                madreDonante: newMadre.madreDonante
            });


            if (body.madreDonante.id !== undefined && body.madreDonante.id !== null) {
                await repoMain.update(body.madreDonante.id, body.madreDonante);
                await gestacionData.update(body.gestacion.id, newGestacion);
                await examenesData.update(body.examenPrenatal.id, newExamen);
                await medicamentosData.update(body.medicamento.id, newMedicamentos);
            } else {
                newMadre.madreDonante = await repoMain.save(body.madreDonante);
                //Hijos madre
                if (body.hijosMadre.length > 0 && newMadreAux.madreDonante.id === null) {
                    for (const hijo of body.hijosMadre) {
                        const newHijo = Object.assign(new HijosMadresEntity(), hijo, {
                            madreDonantes: newMadre.madreDonante
                        });
                        if (newHijo.id !== undefined && newHijo.id !== null) {
                            await hijosMadreData.update(newHijo.id, newHijo);
                        } else {
                            await hijosMadreData.save(newHijo);
                        }
                    }
                }
                await gestacionData.save(newGestacion);
                await examenesData.save(newExamen);
                await medicamentosData.save(newMedicamentos);
            }

            if (body.madreDonante.id !== undefined && body.madreDonante.id !== null) {
                await repoMain.update(body.madreDonante.id, body.madreDonante);
                await gestacionData.update(body.gestacion.id, newGestacion);
                await examenesData.update(body.examenPrenatal.id, newExamen);
                await medicamentosData.update(body.medicamento.id, newMedicamentos);
            } else {
                newMadre.madreDonante = await repoMain.save(body.madreDonante);
                await gestacionData.save(newGestacion);
                await examenesData.save(newExamen);
                await medicamentosData.save(newMedicamentos);
            }

            if (body.madreDonante.donanteApta === 1) {
                await madrePotencialData.update(body.madreDonante.madrePotencial, { donante_efectiva: 1 });
            } else if (body.madreDonante.donanteApta === 0) {
                await madrePotencialData.update(body.madreDonante.madrePotencial, { donante_efectiva: 0 });
            }

            if (body.infoMadre.id !== undefined && body.infoMadre.id !== null) {
                await infoMadre.update(body.infoMadre.id, body.infoMadre);
            } else {
                await infoMadre.save(body.infoMadre);
            }

            // Commit 
            await queryRunner.commitTransaction();

            const madreFinal = await repoMain.findOne({
                where: { id: newMadre.madreDonante.id },
                relations: ['hijosMadre', 'gestacion', 'examenesPrenatal', 'medicamento']
            });

            if (madreFinal?.donanteApta === 1 && madreFinal.tipoDonante === "interna") {
                try {

                    const repositorySalaExtraccions = AppDataSource.getRepository(LecheSalaExtraccionFriam016Entity);
                    const repositoryFrascosInternos = AppDataSource.getRepository(ExtraccionFriam016Entity);
                    const repositoryEntradasSalidas = AppDataSource.getRepository(EntradasSalidasFriam012Entity);

                    const madrePotentical = madrePotencialData.create({
                        id: Number(newMadre.madreDonante.madrePotencial)
                    })

                    const madreInterna: LecheSalaExtraccionFriam016Entity | null = await repositorySalaExtraccions.findOne({
                        where: {
                            madrePotencial: madrePotentical
                        }
                    })

                    const resgitroLecheExtraida = repositorySalaExtraccions.create({
                        id: madreInterna?.id
                    })
                    const frascosInternos: ExtraccionFriam016Entity[] | [] = await repositoryFrascosInternos.find({
                        where: {
                            lecheSalaExtraccion: resgitroLecheExtraida
                        }
                    })

                    frascosInternos.forEach(async (frasco) => {
                        await repositoryEntradasSalidas.save({
                            fechaVencimiento: undefined,
                            procedencia: madreInterna?.procedencia,
                            fechaEntrada: undefined,
                            fechaSalida: undefined,
                            madreDonante: madreFinal,
                            empleadoEntrada: undefined,
                            empleadoSalida: undefined,
                            extraccion: frasco,
                            frascoRecolectado: undefined
                        })
                    })
                } catch (error) {
                    throw error;
                }
            }
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
            // .andWhere('mp.donante_efectiva = 1')
            .getRawMany();
    }


    async uploadPDF(file: Express.Multer.File, body: any): Promise<any> {
        const laboratoriosData = AppDataSource.getRepository(LaboratoriosEntity);

        const newLaboratorio = Object.assign(new LaboratoriosEntity(), {
            resultado: body.resultado,
            fechaVencimiento: body.fechaVencimiento,
            madrePotencial: { id: body.madrePotencial },
            tipoLaboratorio: body.tipoLaboratorio,
            documento: file.filename
        });
        return await laboratoriosData.save(newLaboratorio);
    }



}