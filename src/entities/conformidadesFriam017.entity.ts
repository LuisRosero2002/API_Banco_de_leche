import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "conformidades_friam_017" })
export class ConformidadesFriam017Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_conformidades" })
    id!: number;
    @Column({ name: "fecha", type: "date" })
    fecha!: Date;
    @Column({ name: "envase", type: "int" })
    envase!: number;
    @Column({ name: "suciedad", type: "int" })
    suciedad!: number;
    @Column({ name: "color", type: "int" })
    color!: number;
    @Column({ name: "flavor", type: "int" })
    flavor!: number;
    @Column({ name: "muestra_testeadas", type: "int" })
    muestraTesteadas!: number;
    @Column({ name: "muestras_reprobadas", type: "int" })
    muestrasReprobadas!: number;
}