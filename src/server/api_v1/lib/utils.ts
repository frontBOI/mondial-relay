import { Args } from '../../../../types/args'
import statusCodes from './statusCodes'

import crypto from 'crypto'
import * as soap from 'soap'

const apiUrl = 'https://api.mondialrelay.com/WebService.asmx?WSDL'

/**
 * Validates the status code of the Mondial Relay APIv1 response.
 * @param code - the status code of the response.
 * @returns true if the status code is valid, false otherwise.
 * @internal
 * */
export function validateStatusCode(code: string) {
  return code === '0'
}

/**
 * Executes an API call to the Mondial Relay APIv1.
 * @param args - parameters necessary for the API call.
 * @param apiMethod - the Mondial Relay APIv1 method to call.
 * @returns The result of the request, whichever it may be.
 * @internal
 * */
export async function executeApiCall(args: Args, apiMethod: string) {
  const client = await soap.createClientAsync(apiUrl, { endpoint: apiUrl })
  args.Security = crypto.createHash('md5').update(Object.values(args).join('')).digest('hex').toUpperCase()

  apiMethod = apiMethod + 'Async'
  const result = (await client[apiMethod](args))[0]
  const resultKey = apiMethod.replace(/Async$/, 'Result')
  const statusCode = result[resultKey].STAT

  if (validateStatusCode(statusCode)) {
    return result[resultKey]
  } else {
    throw statusCodes[statusCode]
  }
}
