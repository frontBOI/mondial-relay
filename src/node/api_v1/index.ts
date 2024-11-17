import {
  CreateLabelArgs,
  GetLabelsArgs,
  GetStatArgs,
  GetTrackingArgs,
  SearchPointRelaisArgs,
  SearchZipCodesArgs,
} from '../../types/args'
import { GetLabelsValues, GetTrackingValues, SearchPointRelayValues, SearchZipCodesValues } from '../../types/values'
import { executeApiCall } from './lib/utils'

const outputXML = false

/**
 * Searches for postal codes based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of postal codes that match the search criteria.
 * */
export async function searchZipCodes(args: SearchZipCodesArgs): Promise<SearchZipCodesValues> {
  const result = await executeApiCall(args, 'WSI2_RechercheCP', outputXML)
  return result.Liste.Commune
}

/**
 * Searches for relay points based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of relay points that match the search criteria.
 * */
export async function searchPointsRelais(args: SearchPointRelaisArgs): Promise<SearchPointRelayValues> {
  const result = await executeApiCall(args, 'WSI4_PointRelais_Recherche', outputXML)
  return result.PointsRelais.PointRelais_Details
}

/**
 * Creates an etiquette using the Mondial Relay API.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @deprecated Use the API v2 function instead - see {@link [createShipment](../createShipment/index.ts)}.
 * */
export async function createLabel(args: CreateLabelArgs): Promise<any> {
  return await executeApiCall(args, 'WSI2_CreationEtiquette', outputXML)
}

/**
 * Retrieves a list of etiquettes based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of etiquettes that match the search criteria.
 * */
export async function getLabels(args: GetLabelsArgs): Promise<GetLabelsValues> {
  return await executeApiCall(args, 'WSI3_GetEtiquettes', outputXML)
}

/**
 * Retrieves a list of stat messages based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of stat messages that match the search criteria.
 * */
export async function getStatMessage(args: GetStatArgs): Promise<any> {
  const result = await executeApiCall(args, 'WSI2_STAT_Label', outputXML)
  return result
}

/**
 * Searches for a package tracking information based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The tracking information for the package that matches the search criteria.
 * */
export async function getTracking(args: GetTrackingArgs): Promise<GetTrackingValues> {
  const result = await executeApiCall(args, 'WSI2_TracingColisDetaille', outputXML)
  return result
}
