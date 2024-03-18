import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ojectif-partener',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ojectif-partener.component.html',
  styleUrl: './ojectif-partener.component.css'
})
export class OjectifPartenerComponent implements OnInit {
  partenerForm:FormGroup;
  submit:boolean =true
  constructor(private fb:FormBuilder){
    this.partenerForm =this.fb.group({
      parteners:this.fb.array([

      ])
    })
  }

  ngOnInit(): void {
    
  }
  get parteners():FormArray
  {
    return this.partenerForm.get('parteners') as FormArray
  }
  createItems():FormGroup
  {
    return this.fb.group({
      objectif:[],
      outil_id:[]

    })
  }
  addItems(){
    console.log("bdbfb");
    this.submit=false
     return this.parteners.push(this.createItems())
  }
  deleteItems(i:number,item:any)
  {
    return this.parteners.removeAt(i)
  }
}
