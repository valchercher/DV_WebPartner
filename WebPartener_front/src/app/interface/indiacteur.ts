export interface Response<T>{
    data:T
    statut:number
    message:string
}
export interface Indiacteur {
    
}
export interface Quanti{
    id:number
    indicateur:string
    poids_RA:number 
    poids_CC: number
    poids_RAVT: number
    poids_SADI: number
}
export interface Quali{
    id:number
    indicateur:string
    poids_RA:number 
    poids_CC: number
    poids_RAVT: number
    poids_SADI: number
    objectif:number
}
export interface Pallier {
    id:number
    condition:string
    libelle:string
    regle_pallier:number
    regle_pallier_sablix:number
    commission_CC:number
    commission_RA:number
    commission_RAVT:number
    commission_SADI:number
}
export interface Indicateur{
    quanti :Quanti[]
    quali:Quali[]
    pallier:Pallier[]
}
export interface Cle_Valeur{
cle:string
valeur:string | number
}