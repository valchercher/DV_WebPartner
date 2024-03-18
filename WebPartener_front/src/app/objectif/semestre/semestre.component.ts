import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import MultiSelect from 'primevue/multiselect';
import { Semestre } from '../../interface/indiacteur';

@Component({
  selector: 'app-semestre',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule],
  templateUrl: './semestre.component.html',
  styleUrl: './semestre.component.css'
})
export class SemestreComponent implements OnInit{
  semestreForm:FormGroup
  form!:FormGroup;
  dropdownList:any;
  dropdownSettings:any;
  @Input() semestres:Semestre[]=[]
  constructor(private fb: FormBuilder) {
    
    this.semestreForm =this.fb.group({

    })
  }

  ngOnInit() {
    this.initForm();
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Selectioner Tous',
      unSelectAllText: 'Deselectionner Tous'
    };
  }
  initForm(){
    this.form = this.fb.group({
      grocery : ['',[Validators.required]]
    })
  }

  handleButtonClick(){
    console.log('reactive form value ', this.form.value);
    console.log('Actual data ', this.getObjectListFromData(this.form.value.grocery.map((item:any) => item.item_id)));
  }

  onItemSelect(event:any){
    console.log('$event is ', event); 
  }

  getObjectListFromData(ids:any){
    return this.getData().filter(item => ids.includes(item.item_id))
  }

  getData() : Array<any>{
    return [
      { item_id: this.semestres[0].id, item_text:this.semestres[0].libelle, group : 'F' },
      { item_id: this.semestres[1].id, item_text: this.semestres[1].libelle, group : 'F' },
      
    ];
  }

  setDefaultSelection(){
    let item = this.getData()[0];
    this.form.patchValue({
      grocery : [{
        item_id : item['item_id'],
        item_text : item['item_text']
      }]  
    })
  }
}
