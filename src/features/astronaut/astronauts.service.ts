import { Injectable } from "@angular/core";
import { RestGenericService } from "../../utilities/service/generic-rest-service/rest-generic.service";
import { environment } from "../../environments/environment";
import { Astronauts } from "../../common/models/astronauts/astronauts.model";


@Injectable({
    providedIn: 'root'
})
export class AstronautService extends RestGenericService {

    constructor() {
        super({
            baseUrl: environment.LL2_BASE_URL,
            resourceName: "astronaut",
        });
    }

    fetchAstronauts() {
        this.list<Astronauts[]>().subscribe();
    }
}