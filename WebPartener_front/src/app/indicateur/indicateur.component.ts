import { Component, OnInit } from '@angular/core';
import { IndicateurqualiComponent } from './indicateurquali/indicateurquali.component';
import { IndicateurquantiComponent } from './indicateurquanti/indicateurquanti.component';
import { IndicateurpallierComponent } from './indicateurpallier/indicateurpallier.component';
import { IndicateurService } from '../service/indicateur.service';
import { Cle_Valeur, Quali, Quanti } from '../interface/indiacteur';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-indicateur',
  standalone: true,
  imports: [IndicateurqualiComponent,IndicateurquantiComponent,IndicateurpallierComponent],
  templateUrl: './indicateur.component.html',
  styleUrl: './indicateur.component.css'
})
export class IndicateurComponent  implements OnInit{
    constructor(private service:IndicateurService,private fb:FormBuilder){}
dataQuanti :Quanti[]=[];
dataQuali :Quali[]=[];
dataKeys : string[]=[] 
dataCleValue :Cle_Valeur[]=[]
  ngOnInit(): void {
    this.allIndicateur()
  }
  allIndicateur(){
    this.service.all().subscribe({
      next:(response=>{
        console.log(response);
        this.dataQuali=response.data.quali;
        this.dataQuanti= response.data.quanti;
        console.log(this.dataQuanti);
        console.log(this.dataKeys);
        console.log(this.dataCleValue);
        
      }),error:(error=>{
        console.error('error',error);
        
      }),complete:()=>{
        console.log('complete');
        
      }
    })
  }

}
