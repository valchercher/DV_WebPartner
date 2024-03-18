import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { IndicateurComponent } from './indicateur/indicateur.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ObjectifComponent } from './objectif/objectif.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
        path:'indicateur',title:"indicateur",component:IndicateurComponent
        
    },
    {
            path:'objectif',title:"objectif",component:ObjectifComponent
    },
    {
        path:'ajouter',title:"ajouter",component:UserComponent
    }, 
    {
        path:"**",title:"Not Found",component:PageNotFoundComponent
    },
    {
        path:"",redirectTo:"/indicateur",pathMatch:'full'
    },

];

// @NgModule({
//     imports:[RouterModule.forRoot(routes),],
//     exports:[RouterModule]
// })
// export class AppRoutingModule{}