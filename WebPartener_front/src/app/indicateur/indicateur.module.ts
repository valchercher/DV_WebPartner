import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicateurpallierComponent } from './indicateurpallier/indicateurpallier.component';
import { IndicateurqualiComponent } from './indicateurquali/indicateurquali.component';
import { IndicateurquantiComponent } from './indicateurquanti/indicateurquanti.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
   
   
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'indicateur',component:IndicateurquantiComponent
      }
    ])
  ]
})
export class IndicateurModule { }
