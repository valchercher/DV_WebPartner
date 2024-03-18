import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataObjectif, Item, Outil, RequestObjectif, Semestre, Valeur } from '../../interface/indiacteur';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-objectif-annee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule],
  templateUrl: './objectif-annee.component.html',
  styleUrl: './objectif-annee.component.css'
})
export class ObjectifAnneeComponent  implements OnInit
{
  
  @Input() dataOutiles:Outil[]=[];
  @Input() semestres:Semestre[]=[]
  @Input() dataObjectifs:DataObjectif[]=[]
  @Output() ObjectifRequest:EventEmitter<RequestObjectif> = new EventEmitter<RequestObjectif>()
  @Output() DeleteUnObjectif:EventEmitter<Item> = new EventEmitter<Item>()
  selectedOutil:Outil[]=[]
  searchOutil:Outil[]=[]
  availableOutiles:Outil[]=[]
 
  objectifAnnee:FormGroup;
  dropdownList:any;
  dropdownSettings:any;
  existe:boolean =false
  constructor(private fb:FormBuilder)
  {
    this.objectifAnnee =this.fb.group({
      objectifs:this.fb.array(
        []
      ),
      annee:[this.getCurrentDate()],
      semestre : ['',[Validators.required]]
    })
  }
  ngOnInit() 
  {
   
    this.availableOutiles=this.dataOutiles;
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Selectioner Tous',
      unSelectAllText: 'Deselectionner Tous'
    };
    return this.chargement()
  }
  chargement()
  {
    this.dataObjectifs.forEach(element=>{ 
      let semestreValue:Semestre[]=[]
      element.annee_semestre.forEach(elt => {
        semestreValue.push(elt.semestre);
        console.log(semestreValue);
        
      });
      this.objectifAnnee.get('semestre')?.patchValue(semestreValue)
    
      this.objectifs.push(this.fb.group({
        outil_id: element.outil_id,
        value: element.value,
        desabled: 'pointer-events: none'
       })) 
    })
  }
 
  handleButtonClick(){
    console.log('reactive objectifAnnee value ', this.objectifAnnee.value);
    console.log('Actual data ', this.getObjectListFromData(this.objectifAnnee.value.semestre.map((item:any) => item.id)));
  }

  onItemSelect(event:any){
    console.log('$event is ', event); 
  }

  getObjectListFromData(ids:any){
    return this.getData().filter(item => ids.includes(item.id))
  }

  getData() : Array<any>{
    return [
      { id: this.semestres[0]?.id, libelle:this.semestres[0]?.libelle, group : 'F' },
      { id: this.semestres[1]?.id, libelle: this.semestres[1]?.libelle, group : 'F' },
      
    ];
  }

  setDefaultSelection(){
    let item = this.getData()[0];
    this.objectifAnnee.patchValue({
      semestre : [{
        id : item['id'],
        libelle : item['libelle']
      }]  
    })
  }
  get objectifs():FormArray
  {
    return this.objectifAnnee.get('objectifs') as FormArray
  }
  addItem()
  {
    return this.objectifs.push(this.createItems())
  }
  createItems():FormGroup
  {
    return this.fb.group({
      outil_id:[,[Validators.required]],
      value:[]
    })
  }
  deleteItems(i:number,item:any)
  {
    let annee_id = this.objectifAnnee.get('annee')?.value
    let data :Item={
      outil_id:item.get('outil_id').value.id,
      annee_id :annee_id
    }
    this.DeleteUnObjectif.emit(data)
    return this.objectifs.removeAt(i)
  }
  selectOutile(i:number, event:Event)
  {
    let selectedValue = this.objectifs.at(i).get('outil_id')?.value;
    console.log(selectedValue.id);
    
    let select = event.target as HTMLSelectElement;
    console.log(select.value);
    if(select.value){
      // this.searchOutil = this.dataobjectifs.filter(outil=>outil.indicateur.indicateur.toLowerCase().includes(select.value.toLowerCase()) 
      // && !this.selectedOutil.includes(outil) 
    // )
    let alreadySelectedIndicateurs = this.selectedOutil.map(outil => outil.indicateur.indicateur);
     this.availableOutiles = this.dataOutiles.filter(outil => !alreadySelectedIndicateurs.includes(outil.indicateur.indicateur));
    this.searchOutil = this.availableOutiles.filter(outil =>
      outil.indicateur.indicateur.toLowerCase().includes(select.value.toLowerCase())
    );
    console.log(alreadySelectedIndicateurs);
    console.log(this.availableOutiles);
    
    
    for (let index = 0; index < this.searchOutil.length; index++) 
    {
      const element = this.searchOutil[index];
      console.log(element);
      this.selectedOutil.push(element)
    }
  }
  console.log(this.searchOutil);
  console.log(this.selectedOutil);
  //  let tab =this.compareTableau(this.selectedOutil,this.dataOutiles);
  //  this.dataOutiles=tab
  }
  private compareTableau(tab1:Outil[],tab2:Outil[])
  {
    return tab2.filter(element=>!tab1.includes(element))
  }
  selectOption(i:number,event:Event)
  {
    let ent = event.target as HTMLOptionElement;
    console.log(ent);
    
  }
  getCurrentDate(){
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0].split('-')[0]
  }
  enregistrer()
  {
  
    
    let semestre = this.objectifAnnee.get('semestre')?.value;
    let tab : number[]=[]
    for (let index = 0; index < semestre.length; index++) {
      const element = semestre[index];
      tab.push(element.id)
    }
    console.log(semestre);
    
    this.objectifAnnee.get('semestre')?.setValue(tab)
    let dataForm= this.objectifAnnee.value;
    console.log(this.objectifs.value);
    dataForm.objectifs=this.objectifs.value.map((elt:any)=>{
      return{
        value:elt.value,
        outil_id:elt.outil_id.id,
      }
    })
    console.log(this.objectifAnnee?.value);
    
    this.ObjectifRequest.emit(this.objectifAnnee.value)
    
  }
  compareOutil=function(option:Outil,value:Outil)
  {
   
    return option && value ? option.id === value.id : option===value
  }
  
}
