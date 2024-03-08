import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { IndicateurComponent } from './indicateur/indicateur.component';

export const routes: Routes = [
    {
        path:'indicateur',component:IndicateurComponent
    }

];

// @NgModule({
//     imports:[RouterModule.forRoot(routes),],
//     exports:[RouterModule]
// })
// export class AppRoutingModule{}