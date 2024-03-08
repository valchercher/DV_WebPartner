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
export interface Indicateur{
    quanti :Quanti[]
    quali:Quali[]
}
export interface Cle_Valeur{
cle:string
valeur:string | number
}