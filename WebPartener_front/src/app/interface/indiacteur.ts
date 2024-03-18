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
export interface OutilSemestre{
    outil:Outil[]
    semestre:Semestre[]
    objectifs:DataObjectif[]
    roles:Role[]
    ras:Ra[]
}
export interface Ra{
    id:number
    nom_agence:string
    adresse_agence:string
    user:User
}
export interface User{
    id:number
    name:string
    prenom:string
    matricule:string
    username:string
    email:string
    role:Role
}
export interface Role{
    id:number
    libelle:string
    code:string
}
export interface Outil{
    id:number
    indicateur:Quanti
}
export interface Semestre{
    id:number
    libelle:string
}
export interface RequestObjectif{
    annee:string
    semestre:number[]
    objectif:Valeur[]
}
export interface Valeur{
    value:number
    outil_id:number
}
export interface Objectif{
    id:number
    outil_id:number
    annee_id:number
    value:number
}
export interface AnneeSemestre
{
    id:number
    annee:Semestre
    semestre:Semestre
}
export interface DataObjectif
{
    id:number
    outil_id:Outil
    value:number
    annee_semestre:AnneeSemestre[]
    statut:number
}
export interface Item{
   outil_id:number
   annee_id:string
}

export interface RequestUser{
    prenom:string
    name:string
    matricule:string
    email:string
    password:string
    confirme_password:string
    role_id:number
    ra_id?:number
    username?:string
    nom_agence?:string
    adresse_agence?:string
    parteners?:Parteners[]

}
export interface Parteners{
    objectif_id:number
    value:number
}