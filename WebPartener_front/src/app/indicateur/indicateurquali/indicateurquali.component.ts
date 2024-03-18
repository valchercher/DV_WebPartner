import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quali } from '../../interface/indiacteur';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-indicateurquali',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './indicateurquali.component.html',
  styleUrl: './indicateurquali.component.css'
})
export class IndicateurqualiComponent implements OnInit {
  @Input() dataQuali:Quali[]=[];
  @Output('createQuali') createQuali:EventEmitter<Quali> = new EventEmitter<Quali>();
  @Output('updateQuali') updateQuali:EventEmitter<Quali> = new EventEmitter<Quali>();
  donnees!:Quali
  formQuali:FormGroup
  affiche:boolean = true;
  active:boolean =true;
  activeAdd :boolean = false;
  save :boolean = true;


  constructor(private fb:FormBuilder){
    this.formQuali = this.fb.group({
      id:[],
      indicateur:[],
      poids_CC:[],
      poids_RA:[],
      poids_RAVT:[],
      poids_SADI:[],
      objectif:[],
    })
  }
  ngOnInit(): void {
  
console.log(this.dataQuali);

}
  calculateSum(data: Quali[], getProperty: (quali: Quali) => number): number {
    let sum = 0;
    for (let quali of data) {
      sum += getProperty(quali);
    }
    return sum;
  }
  getPoids_RA(quali:Quali){
    return quali.poids_RA
  }
  getPoids_CC(quali:Quali){
    return quali.poids_CC
  }
  getPoids_RAVT(quali:Quali){
    return quali.poids_RAVT
  }
  getPoids_SADI(quali:Quali){
    return quali.poids_SADI
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
    this.createQuali.emit(this.formQuali.value)
    this.affiche= true
    this.formQuali.reset()
    this.activeAdd=false
    this.save=true
    this.active=true
  }
  plus(event:Event){
    let boutton = event.target as HTMLButtonElement;
    let valueField = boutton.parentElement?.nextElementSibling as HTMLInputElement;
    let valeur = parseInt(valueField?.value)
    if(!isNaN(valeur)){
      if(valeur <= 99){
       valueField.value = (valeur + 1).toString()
       let classe = boutton.classList[0]
       console.log(valeur);
       this.update(boutton,valueField)
       this.correspondanceTableRows("floop_counter_quali","floop_counter_table_quali",boutton,"+",`${classe}`)

      }
    }
    
   }
   moins(event:Event){
    let boutton = event.target as HTMLButtonElement;
    let valueField = boutton.parentElement?.previousElementSibling as HTMLInputElement;
    let valeur = parseInt(valueField?.value)
    if(!isNaN(valeur)){
      if(valeur>0){
       valueField.value = (valeur - 1).toString()
       console.log(valeur);
       let classe = boutton.classList[0]
       this.update(boutton,valueField)
       this.correspondanceTableRows("floop_counter_quali","floop_counter_table_quali",boutton,"-",`${classe}`)
       
      }
    }
    
   }
   updateLibelleQuali(event:Event){
  
   }
   update(boutton:HTMLButtonElement|HTMLInputElement,valueField:HTMLInputElement){
    let columnIndex:number;
    let iconeId = valueField.id.split('_')[0]
    let icone = document.getElementById(`${iconeId}_icones`) as HTMLLIElement
    let miseEnJour =  Array.isArray(icone) ? icone : [icone]; 
      miseEnJour.forEach(elt=>
      {
          elt.style.display = "block"
            elt.addEventListener('click',()=>
            {
              if (boutton.parentElement && boutton.parentElement.parentElement) {
                if(boutton.parentElement.parentElement.parentElement  instanceof HTMLTableCellElement ){
                    columnIndex =boutton.parentElement.parentElement.parentElement.cellIndex;    
                }
              }
              console.log(columnIndex);
              
              let rows = document.querySelectorAll(`.floop_counter_quali thead tr`) ;
              let  data:any=[]         
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
                      let classe = field.classList[0];
                      data.push(value)
                    }
                  }
                });
              this.donnees={
                id:parseInt(iconeId),
                indicateur:data[0],
                poids_CC:data[1],
                poids_RA:data[2],
                poids_RAVT:data[3],
                poids_SADI:data[4],
                objectif:data[5]
  
              }  
                console.log(data);
                console.log(this.donnees);   
              this.updateQuali.emit(this.donnees)
        })
      })
   }
   correspondanceTableRows(tableId1:string,tableId2:string,element:HTMLButtonElement,operation:string,classe:string)
   {
       let table1 = document.querySelector(`.${tableId1}`) as HTMLTableElement;
       let table2 = document.querySelector(`.${tableId2}`) as HTMLTableElement;
       console.log(element);
      
       let rowNumber = 0;
       let rows: HTMLTableRowElement[] = [];
       if(table1 && table1.tHead && table1.tHead.rows){
         rows =Array.from(table1?.tHead?.rows);
         rowNumber = rows.findIndex(row=>row.contains(element.parentElement))
       }
       console.log(rows);
       console.log(rowNumber);
       console.log(classe);
       
       if (rowNumber !== -1)
       {
         console.log(table2);
           let quantiCC = table2?.querySelector(`tr:nth-child(${rowNumber }) .quali_${classe}`);
           console.log(quantiCC);
           if (quantiCC)
           {
               let chiffresCC = quantiCC?.textContent?.match(/\d/g);
              if(chiffresCC){
               let quantiCCValue = parseInt(chiffresCC.join(''));
               let CC :number;
               if(operation === "+"){
                  CC= quantiCCValue + 1
                }else{
                  CC= quantiCCValue - 1
                }
                quantiCC.innerHTML = (`${CC}%`);
              }
           }
       
       }
   }
}