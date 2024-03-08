import { Component, Input, OnInit } from '@angular/core';
import { Quali } from '../../interface/indiacteur';

@Component({
  selector: 'app-indicateurquali',
  standalone: true,
  imports: [],
  templateUrl: './indicateurquali.component.html',
  styleUrl: './indicateurquali.component.css'
})
export class IndicateurqualiComponent implements OnInit {
  constructor(){}
  @Input() dataQuali:Quali[]=[]
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
}