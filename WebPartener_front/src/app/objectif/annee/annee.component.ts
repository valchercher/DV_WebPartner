import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annee',
  standalone: true,
  imports: [],
  templateUrl: './annee.component.html',
  styleUrl: './annee.component.css'
})
export class AnneeComponent  implements OnInit{
  constructor(){}
  ngOnInit(): void {
    
  }

  ajouterAnnee(){

  }
  chargerAnnee(){}
  getCurrentDate(){
    const currentDate = new Date()
    return currentDate.toISOString().split('T')[0].split('-')[0]
  }
}
