import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { IndicateurComponent } from './indicateur/indicateur.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:'indicateur',title:"indicateur",component:IndicateurComponent
        
    },
    {
        path:"**",title:"Not Found",component:PageNotFoundComponent
    },
    {
        path:"",redirectTo:"/indicateur",pathMatch:'full'
    }

];

// @NgModule({
//     imports:[RouterModule.forRoot(routes),],
//     exports:[RouterModule]
// })
// export class AppRoutingModule{}