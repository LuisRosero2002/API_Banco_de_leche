import { BaseService } from "../config/base.service";
import { VisitaSeguimientoMadresEntity } from "../entities/visitaSeguimientoMadres.entity";

export class SeguimientoMadreService extends BaseService<VisitaSeguimientoMadresEntity> {
    constructor() {
        super(VisitaSeguimientoMadresEntity);
    }

    
}