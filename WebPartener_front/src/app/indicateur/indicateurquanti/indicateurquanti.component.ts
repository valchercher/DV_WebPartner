import { Component, Input, OnInit } from '@angular/core';
import { Cle_Valeur, Quali, Quanti } from '../../interface/indiacteur';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-indicateurquanti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicateurquanti.component.html',
  styleUrl: './indicateurquanti.component.css'
})
export class IndicateurquantiComponent implements OnInit {
constructor(){}
@Input() dataQuanti:Quanti[]=[];
@Input() dataKeys : string[]=[] ;
@Input() dataCleValue :Cle_Valeur[]=[]
valueTotaux:Quanti[]=[]
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

 

}
