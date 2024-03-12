import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cle_Valeur, Quali, Quanti } from '../../interface/indiacteur';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-indicateurquanti',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './indicateurquanti.component.html',
  styleUrl: './indicateurquanti.component.css'
})
export class IndicateurquantiComponent implements OnInit
{
  @Input() dataQuanti:Quanti[]=[];
  @Input() dataKeys : string[]=[] ;
  @Input() dataCleValue :Cle_Valeur[]=[];
  @Output("createQuanti") createQuanti:EventEmitter<Quanti> = new EventEmitter<Quanti>();
  @Output("updateQuanti") updateQuanti:EventEmitter<Quanti> = new EventEmitter<Quanti>()
  formQuanti:FormGroup
  valueTotaux:Quanti[]=[];
  active:boolean =true;
  activeAdd:boolean = false;
  affiche:boolean =true;
  save:boolean =true
  donnees!:Quanti
  constructor(private fb:FormBuilder)
  {
    this.formQuanti = this.fb.group({
      id:[],
      indicateur:[],
      poids_CC:[],
      poids_RA:[],
      poids_RAVT:[],
      poids_SADI:[],
    })
  }
  ngOnInit(): void {
    console.log(this.dataQuanti);
  }
  isNumeric(value: any): boolean {
    return !isNaN(value);
  }
  isString(value:any):boolean{
    return isNaN(value)
  }
  calculateSum(data: Quanti[], getProperty: (quanti: Quanti) => number): number {
    let sum = 0;
    for (let quanti of data) {
      sum += getProperty(quanti);
    }
    return sum;
  }
  getPoids_RA(quanti:Quanti){
    return quanti.poids_RA
  }
  getPoids_CC(quanti:Quanti){
    return quanti.poids_CC
  }
  getPoids_RAVT(quanti:Quanti){
    return quanti.poids_RAVT
  }
  getPoids_SADI(quanti:Quanti){
    return quanti.poids_SADI
  }
  activate(event:Event)
  {
    let art=event.target as HTMLButtonElement;
    let valeur=document.getElementById(`${art?.id}`)
    // this.displayNone(valeur)
  }
  add_quanti(event:Event)
  {
    this.activeAdd=true
    this.active=false
    this.affiche=false
  }
  remove_quanti(event:Event)
  {
    this.activeAdd=false
    this.active=true
    this.affiche=true
    this.save = true
  }
  afficheSave(event:Event)
  {
    let valueField = event.target as HTMLInputElement;
    console.log(valueField.value);
    if (valueField.value.length >=3){
      this.save=false
    }else{
      this.save = true
    }
  }
  enregistrer()
  {
  console.log(this.formQuanti.value);
  this.createQuanti.emit(this.formQuanti.value)
  this.affiche= true
  this.formQuanti.reset()
  this.activeAdd=false
  this.save=true
  this.active=true
  }
  plus(event:Event)
  {
  let boutton = event.target as HTMLButtonElement;
  let valueField = boutton.parentElement?.nextElementSibling as HTMLInputElement;
  let valeur = parseInt(valueField?.value)
  if(!isNaN(valeur)){
    if(valeur <= 99){
      valueField.value = (valeur + 1).toString()
      console.log(valeur); 
      let classe = boutton.classList[0]
      this.correspondanceTableRows("floop_counter","floop_counter_table",boutton,"+",`${classe}`)
      this.update(boutton,valueField)
    }
  }
  }
  moins(event:Event)
  {
  let boutton = event.target as HTMLButtonElement;
  let valueField = boutton.parentElement?.previousElementSibling as HTMLInputElement;
  let valeur = parseInt(valueField?.value)
  if(!isNaN(valeur)){
    if(valeur>0){
      valueField.value = (valeur - 1).toString()
      console.log(valeur);  
      console.log(valueField.id);
      let classe=boutton.classList[0];
      this.correspondanceTableRows("floop_counter","floop_counter_table",boutton,"-",`${classe}`)
      this.update(boutton,valueField)
    }

  }
  }
  updateLibelle(event:Event)
  {
  let valueField = event.target as HTMLInputElement
  let idcone = valueField.id.split('_')[0];
  this.update(valueField,valueField)

  }
  update(boutton:HTMLButtonElement|HTMLInputElement,valueField:HTMLInputElement)
  {
  let columnIndex:number;
  let iconeId = valueField.id.split('_')[0]
  let icone = document.getElementById(`${iconeId}_icone`) as HTMLLIElement
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
            
            let rows = document.querySelectorAll(`.floop_counter thead tr`) ;
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
              poids_SADI:data[4]

            }  
              console.log(data);
              console.log(this.donnees);   
            this.updateQuanti.emit(this.donnees)
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
          let quantiCC = table2?.querySelector(`tr:nth-child(${rowNumber }) .quanti_${classe}`);
          console.log(quantiCC);
          if (quantiCC)
          {
              let chiffresCC = quantiCC?.textContent?.match(/\d/g);
            if(chiffresCC){
              let quantiCCValue = parseInt(chiffresCC.join(''));
              let CC= eval(`${quantiCCValue} ${operation} 1`)
              quantiCC.innerHTML = (`${CC}%`);
            }
          }
      
      }
  }
}
