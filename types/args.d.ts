export type Args =
  | SearchZipCodesArgs
  | SearchPointRelaisArgs
  | CreateLabelArgs
  | GetLabelsArgs
  | GetStatArgs
  | GetTrackingArgs

export interface SearchZipCodesArgs {
  Enseigne: string
  Pays: string
  Ville: string
  CP: string
  NbResult: string
  Security?: string
  PrivateKey: string
}

export interface SearchPointRelaisArgs {
  Enseigne: string
  Pays: string
  Ville: string
  CP: string
  NombreResultats: string
  Security?: string
  PrivateKey: string
}

export interface CreateLabelArgs {
  Enseigne: string
  ModeCol: string
  ModeLiv: string
  NDossier: string
  NClient: string
  Expe_Langage: string
  Expe_Ad1: string
  Expe_Ad2: string
  Expe_Ad3: string
  Expe_Ad4: string
  Expe_Ville: string
  Expe_CP: string
  Expe_Pays: string
  Expe_Tel1: string
  Expe_Tel2: string
  Expe_Mail: string
  Dest_Langage: string
  Dest_Ad1: string
  Dest_Ad2: string
  Dest_Ad3: string
  Dest_Ad4: string
  Dest_Ville: string
  Dest_CP: string
  Dest_Pays: string
  Dest_Tel1: string
  Dest_Tel2: string
  Dest_Mail: string
  Poids: string
  Longueur: string
  Taille: string
  NbColis: string
  CRT_Valeur: string
  CRT_Devise: string
  Exp_Valeur: string
  Exp_Devise: string
  COL_Rel_Pays: string
  COL_Rel: string
  LIV_Rel_Pays: string
  LIV_Rel: string
  TAvisage: string
  TReprise: string
  Montage: string
  TRDV: string
  Assurance: string
  Instructions: string
  Texte: string
  Security?: string
  PrivateKey: string
}

export interface GetLabelsArgs {
  Enseigne: string
  Expeditions: string
  Langue: string
  Security?: string
  PrivateKey: string
}

export interface GetStatArgs {
  Enseigne: string
  STAT_ID: number
  Langue: string
  Security?: string
  PrivateKey: string
}

export interface GetTrackingArgs {
  Enseigne: string
  Expedition: string
  Langue: string
  Security?: string
  PrivateKey: string
}
