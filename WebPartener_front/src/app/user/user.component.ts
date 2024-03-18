import { Component, Input, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { RoleComponent } from './role/role.component';
import { OjectifPartenerComponent } from './ojectif-partener/ojectif-partener.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataObjectif, Objectif, Outil, Ra, RequestUser, Role } from '../interface/indiacteur';
import { OutilService } from '../service/outil.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AddUserComponent,RoleComponent,OjectifPartenerComponent,SidebarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit
{
  dataRole:Role[]=[] 
  dataOutil:Outil[]=[]
  dataRa : Ra[]=[]
  dataObjectifs:DataObjectif[]=[]
  constructor(private service:OutilService)
  {

  }
  ngOnInit(): void {
    this.all()
    console.log(this.dataRole);
    
  }
  all()
  {
    this.service.allOutil().subscribe({
      next:(response=>{
        this.dataRole = response.data.roles
        this.dataOutil = response.data.outil
        this.dataRa = response.data.ras
        this.dataObjectifs =response.data.objectifs
      })
    })
  }
  dataRequestUser(event:RequestUser){
    this.service.storeUser(event).subscribe({
      next:(response=>{
        console.log(response.data);
        
      })
    }
    )
  }
}
