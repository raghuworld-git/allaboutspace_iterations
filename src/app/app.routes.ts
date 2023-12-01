import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [  
  {
    path: 'astronauts',
    loadChildren: () =>
      import('../features/astronaut/astronaut.routes').then((r) => r.routes),
  },
];
