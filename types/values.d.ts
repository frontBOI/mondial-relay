interface TracingDetaille {
  Date: string
  Heure: string
  Libelle: string
  Relais_Num: string
  Emplacement: string
  Relais_Pays: string
}

export interface GetTrackingValues {
  STAT: string
  Libelle01: string
  Libelle02: string
  Relais_Num: string
  Relais_Libelle: string
  Tracing: {
    ret_WSI2_sub_TracingColisDetaille: TracingDetaille[]
  }
}

export type SearchZipCodesValues = { CP: string; Ville: string; Pays: string }[]

export type SearchPointRelayValues = {
  CP: string
  Num: string
  STAT: string
  Pays: string
  Ville: string
  LgAdr1: string
  LgAdr2: string
  LgAdr3: string
  LgAdr4: string
  URL_Plan: string
  Distance: string
  Latitude: string
  Longitude: string
  URL_Photo: string
  Information: string
  TypeActivite: string
  Localisation1: string
  Localisation2: string
  Horaires_Lundi: string[]
  Horaires_Mardi: string[]
  Horaires_Jeudi: string[]
  Horaires_Samedi: string[]
  Informations_Dispo: string
  Horaires_Vendredi: string[]
  Horaires_Dimanche: string[]
  Horaires_Mercredi: string[]
}[]

export interface GetLabelsValues {
  STAT: string
  URL_PDF_A4: string
  URL_PDF_A5: string
  URL_PDF_10x15: string
}
