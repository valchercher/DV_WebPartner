import { Component, OnInit } from '@angular/core';
import { AnneeComponent } from './annee/annee.component';
import { SemestreComponent } from './semestre/semestre.component';
import { ObjectifAnneeComponent } from './objectif-annee/objectif-annee.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OutilService } from '../service/outil.service';
import { DataObjectif, Item, Outil, RequestObjectif, Semestre } from '../interface/indiacteur';
import { response } from 'express';

@Component({
  selector: 'app-objectif',
  standalone: true,
  imports: [AnneeComponent,SemestreComponent,ObjectifAnneeComponent,SidebarComponent],
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.css'
})
export class ObjectifComponent implements OnInit{

  semestres:Semestre[]=[]
  outiles :Outil[]=[]
  dataObjectifs:DataObjectif[]=[]
   constructor(private service:OutilService){

   }
   ngOnInit(): void {
     return this.allOutilSemestre()
   }
   allOutilSemestre()
   {
     this.service.allOutil().subscribe({
      next:(response=>{
        console.log(response);
        this.semestres= response.data.semestre;
        this.outiles = response.data.outil;
        this.dataObjectifs = response.data.objectifs
        console.log(response.data.objectifs);
        
      })
    })
   }
   ObjectifRequest(event:RequestObjectif){
    console.log(event);
    this.service.store(event).subscribe({
      next:(response=>{
        console.log(response);
        
      })
    })
   }
   DeleteUnObjectif(item:Item){
    console.log(item);
    this.service.delete(item.outil_id,item.annee_id).subscribe({
      next:(response=>{
        console.log(response);
        
      })
    })
   }
}
