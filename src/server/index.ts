import {
  CreateLabelArgs,
  GetLabelsArgs,
  GetStatArgs,
  GetTrackingArgs,
  SearchPointRelaisArgs,
  SearchZipCodesArgs,
} from '../../types/args'
import { executeApiCall } from './lib/utils'

export async function searchZipCodes(args: SearchZipCodesArgs) {
  const result = await executeApiCall(args, 'WSI2_RechercheCP')
  return result.Liste.Commune
}

export async function searchPointsRelais(args: SearchPointRelaisArgs) {
  const result = await executeApiCall(args, 'WSI4_PointRelais_Recherche')
  return result.PointsRelais.PointRelais_Details
}

export async function createLabel(args: CreateLabelArgs) {
  return await executeApiCall(args, 'WSI2_CreationEtiquette')
}

export async function getLabels(args: GetLabelsArgs) {
  return await executeApiCall(args, 'WSI3_GetEtiquettes')
}

export async function getStatMessage(args: GetStatArgs) {
  const result = await executeApiCall(args, 'WSI2_STAT_Label')
  return result
}

export async function getTracking(args: GetTrackingArgs) {
  return await executeApiCall(args, 'WSI2_TracingColisDetaille')
}
