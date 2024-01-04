import { Routes } from '@angular/router';
import { AstronautInfoComponent } from './astronaut-info/astronaut-info.component';
import { AstronautsListComponent } from './astronauts-list/astronauts-list.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: AstronautsListComponent },
    { path: ':page/:size', pathMatch: 'full', component: AstronautsListComponent },
    { path: ':id', pathMatch: 'full', component: AstronautInfoComponent }
];
