import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Pallier } from '../../interface/indiacteur';

@Component({
  selector: 'app-indicateurpallier',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './indicateurpallier.component.html',
  styleUrl: './indicateurpallier.component.css'
})
export class IndicateurpallierComponent implements OnInit {
  @Input() dataPallier:Pallier[]=[]
  @Output("createPallier") cretePallier:EventEmitter<Pallier> = new EventEmitter<Pallier>();
  @Output('updateIndicateurPallier') updateIndicateurPallier:EventEmitter<Pallier> = new EventEmitter<Pallier>();
  donnees!:Pallier
  activeAdd:boolean = false
  active :boolean =true
  affiche:boolean =true
  save:boolean = true
  formPallier:FormGroup
  constructor(private fb:FormBuilder){
    this.formPallier = this.fb.group({
      id:[],
      libelle:[,[Validators.maxLength(20),Validators.min(3)]],
      condition:[,[Validators.maxLength(2)]],
      regle_pallier:[,[Validators.required]],
      commission_CC:[,[Validators.required]],
      commission_RA:[,[Validators.required]],
      regle_pallier_sablix:[,[Validators.required]],
      commission_RAVT:[,[Validators.required]],
      commission_SADI:[,[Validators.required]],
    })
  }
  ngOnInit(): void {
    
  }
  add_quanti(event:Event){
    this.activeAdd=true
    this.active=false
    this.affiche=false
  }
  remove_quanti(event:Event){
    this.activeAdd=false
    this.active=true
    this.affiche=true
    this.save = true
  }
  afficheSave(event:Event){
    let valueField = event.target as HTMLInputElement;
    console.log(valueField.value);
    if (valueField.value.length >=3){
      this.save=false
      console.log(this.save);
      
    }else{
      this.save = true
    }
  }
  enregistrer(){
    console.log(this.formPallier.value);
    this.cretePallier.emit(this.formPallier.value)
    this.affiche= true
    this.formPallier.reset()
    this.activeAdd=false
    this.save=true
    this.active=true
  }
  updatePallier(event:Event)
  {
    let input = event.target as HTMLInputElement
    let valueField = input.value
    console.log(valueField);
    this.update(input)
  }
  update(input:HTMLInputElement){
    let columnIndex:number;
    let iconeId = input.id.split('_')[0]
    let icone = document.getElementById(`${iconeId}_iconePallier`) as HTMLLIElement
    let miseEnJour =  Array.isArray(icone) ? icone : [icone]; 
    console.log(input.id);
    
    console.log(icone);
    
      miseEnJour.forEach(elt=>
      {
          elt.style.display = "block"
            elt.addEventListener('click',()=>
            {
              if (input.parentElement && input.parentElement.parentElement) {
                if(input.parentElement.parentElement  instanceof HTMLTableCellElement ){
                    columnIndex =input.parentElement.parentElement.cellIndex;    
                }
              }
              console.log(columnIndex);
              
              let rows = document.querySelectorAll(`.table_pallier tbody tr`) ;
              let  data:any=[]    
              let classe ="";     
              console.log(rows);
              
                rows.forEach(function(row) 
                {
                  if (row instanceof HTMLTableRowElement) {
                    console.log(row);
                    let cell = row.cells[columnIndex];
                    console.log(cell);
                    
                    let field = cell.querySelector('input')
                    let value = field?.value;
                    if (field && field.classList.length > 0) {
                         classe = field.name;
                      data.push(value)
                      console.log(classe);
                      
                    }
                  }
                });
               
                console.log(data);
                ['<', '11', '0', '0', '105', '20', '10']
              this.donnees={
                id:parseInt(iconeId),
                condition:data[0],
                regle_pallier:data[1],
                libelle:classe,
                commission_CC:data[2],
                commission_RA:data[3],
                regle_pallier_sablix:data[4],
                commission_RAVT:data[5],
                commission_SADI:data[6],
  
              }  
                console.log(this.donnees);   
              this.updateIndicateurPallier.emit(this.donnees)
        })
      })
   }
}
