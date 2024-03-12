import { Component, OnInit, inject } from '@angular/core';
import { IndicateurqualiComponent } from './indicateurquali/indicateurquali.component';
import { IndicateurquantiComponent } from './indicateurquanti/indicateurquanti.component';
import { IndicateurpallierComponent } from './indicateurpallier/indicateurpallier.component';
import { IndicateurService } from '../service/indicateur.service';
import { Cle_Valeur, Pallier, Quali, Quanti, Response } from '../interface/indiacteur';
import { FormBuilder } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-indicateur',
  standalone: true,
  imports: [IndicateurqualiComponent,IndicateurquantiComponent,IndicateurpallierComponent,SidebarComponent,NavbarComponent],
  templateUrl: './indicateur.component.html',
  styleUrl: './indicateur.component.css'
})
export class IndicateurComponent  implements OnInit{
  constructor(private service:IndicateurService,private fb:FormBuilder){}
  dataQuanti :Quanti[]=[];
  dataQuali :Quali[]=[];
  dataKeys : string[]=[] 
  dataCleValue :Cle_Valeur[]=[]
  dataPallier:Pallier[]=[]
  toaster = inject(ToastrService); 
  ngOnInit(): void {
    this.allIndicateur()
  }
  allIndicateur(){
    this.service.all().subscribe({
      next:(response=>{
        console.log(response);
        this.dataQuali=response.data.quali;
        this.dataQuanti= response.data.quanti;
        this.dataPallier = response.data.pallier;
        
      }),error:(error=>{
        console.error('error',error);
        
      }),complete:()=>{
        console.log('complete');
        
      }
    })
  }
  handleCreatePallier(event:Pallier){
    this.service.storePallier(event).subscribe({
      next:((response:Response<Pallier>)=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        this.dataPallier.push(response.data)   

        
      })
    })
    
  }
  handleCreateQuanti(quanti:Quanti){
    this.service.storeQuanti(quanti).subscribe({
      next:((response:Response<Quanti>)=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        this.dataQuanti.push(response?.data)      
      })
    })
  }
  handleCreateQuali(quali:Quali){
    this.service.storeQuali(quali).subscribe({
      next:((response:Response<Quali>)=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        this.dataQuali.push(response.data)
        
      })
    })
  }
  handleUpdateQuanti(quanti:Quanti){
    this.service.updateQuanti(quanti,quanti.id).subscribe({
      next:(response=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        
      })
    })
  }
  handleUpdateQuali(quali:Quali){
    console.log(quali);
    
    this.service.updateQuali(quali,quali.id).subscribe({
      next:(response=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        
      })
    })
  }
  handleUpdatePallier(pallier:Pallier){
    this.service.updatePallier(pallier,pallier.id).subscribe({
      next:(response=>{
        console.log(response);
        this.toaster.success(response.message,"success")
        
      })
    })
  }
}