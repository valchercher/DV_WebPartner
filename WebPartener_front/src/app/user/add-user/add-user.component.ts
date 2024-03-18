import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataObjectif, Objectif, Outil, Parteners, Ra, RequestUser, Role } from '../../interface/indiacteur';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  partenerForm:FormGroup
  submit:boolean =true
  agence:boolean =true
  @Input() dataRole:Role[]=[]
  @Input() dataOutil:Outil[]=[]
  @Input() dataRa :Ra[]=[]
  @Input() dataObjectifs:DataObjectif[]=[]
  @Output() dataRequestUser:EventEmitter<RequestUser> = new EventEmitter<RequestUser>();
  data:Role[]=[];
  ra:boolean = true
  constructor(private fb:FormBuilder){
    this.partenerForm =this.fb.group({
      parteners:this.fb.array([
      ]),
      prenom:[],
      name:[],
      role_id:[],
      matricule:[],
      ra_id:[],
      password:["0000"],
      confirme_password:["0000"],
      email:[],
      username:[],
      nom_agence:[],
      adresse_agence:[]
    })
  }
  ngOnInit(): void {
    this.data =this.dataRole.filter(ele=>(
        ele.code !== "Admin" &&
        ele.code !=="DV" 
    )
     )
  }
  get parteners():FormArray
  {
    return this.partenerForm.get('parteners') as FormArray
  }
  createItems():FormGroup
  {
    return this.fb.group({
      objectif_id:[],
      value:[]
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
  selectOption(event:Event)
  {
   let selectoption = this.partenerForm.get('role_id')?.value
   
   if(selectoption!=null)
   {
    if( selectoption?.code=="RA"|| selectoption?.code ==="SADI"){
      this.agence=false
      this.ra =true
    }else if(selectoption.code ==="CC"){
      this.ra =false
      this.agence =true
    }else if(selectoption.code=="RAVT"){
      this.ra=false
      this.agence =true
    }
    else{
      this.agence =true
      
    }
   }
  }
  enregistrer()
  {
    let role_id = this.partenerForm.get('role_id')?.value
    this.partenerForm.get('role_id')?.setValue(role_id.id)
    let ra_id = this.partenerForm.get('ra_id')?.value
    if(ra_id){
      this.partenerForm.get('ra_id')?.setValue(ra_id.id)
    }
    let dataForm = this.partenerForm.value
    dataForm.parteners = this.parteners.value.map((ele:any)=>{
      return {
          objectif_id:ele.objectif_id.id,
          value:ele.value
      }
    })
    console.log(this.partenerForm.value);
    this.dataRequestUser.emit(this.partenerForm.value)
  }
}
