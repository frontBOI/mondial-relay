import {
  CreateLabelArgs,
  GetLabelsArgs,
  GetStatArgs,
  GetTrackingArgs,
  SearchPointRelaisArgs,
  SearchZipCodesArgs,
} from '../../../types/args'
import { executeApiCall } from './lib/utils'

/**
 * Searches for postal codes based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of postal codes that match the search criteria.
 * */
export async function searchZipCodes(args: SearchZipCodesArgs) {
  const result = await executeApiCall(args, 'WSI2_RechercheCP')
  return result.Liste.Commune
}

/**
 * Searches for relay points based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of relay points that match the search criteria.
 * */
export async function searchPointsRelais(args: SearchPointRelaisArgs) {
  const result = await executeApiCall(args, 'WSI4_PointRelais_Recherche')
  return result.PointsRelais.PointRelais_Details
}

/**
 * Creates an etiquette using the Mondial Relay API.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @deprecated Use the API v2 function instead - see {@link [createShipment](../createShipment/index.ts)}.
 * */
export async function createLabel(args: CreateLabelArgs) {
  return await executeApiCall(args, 'WSI2_CreationEtiquette')
}

/**
 * Retrieves a list of etiquettes based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of etiquettes that match the search criteria.
 * */
export async function getLabels(args: GetLabelsArgs) {
  return await executeApiCall(args, 'WSI3_GetEtiquettes')
}

/**
 * Retrieves a list of stat messages based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of stat messages that match the search criteria.
 * */
export async function getStatMessage(args: GetStatArgs) {
  const result = await executeApiCall(args, 'WSI2_STAT_Label')
  return result
}

/**
 * Searches for a package tracking information based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The tracking information for the package that matches the search criteria.
 * */
export async function getTracking(args: GetTrackingArgs) {
  return await executeApiCall(args, 'WSI2_TracingColisDetaille')
}
