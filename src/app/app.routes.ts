import { Routes } from '@angular/router';

export const routes: Routes = [  
  {
    path: 'astronauts',
    loadChildren: () =>
      import('../features/astronaut/astronaut.routes').then((r) => r.routes),
  },
];
