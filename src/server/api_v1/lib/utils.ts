import { Args } from '../../../../types/args'
import statusCodes from './statusCodes'

import crypto from 'crypto'
import * as soap from 'soap'

const apiUrl = 'https://api.mondialrelay.com/WebService.asmx?WSDL'

/**
 * Executes an API call to the Mondial Relay APIv1.
 * @param args - parameters necessary for the API call.
 * @param apiMethod - the Mondial Relay APIv1 method to call.
 * @returns The result of the request, whichever it may be.
 * @internal
 * */
export async function executeApiCall(args: Args, apiMethod: string, outputXML = false) {
  const client = await soap.createClientAsync(apiUrl, { endpoint: apiUrl })
  args.Security = crypto.createHash('md5').update(Object.values(args).join('')).digest('hex').toUpperCase()

  apiMethod = apiMethod + 'Async'
  const result = (await client[apiMethod]({ ...args, PrivateKey: undefined }))[0]

  if (outputXML) {
    console.log(client.lastRequest)
  }

  const resultKey = apiMethod.replace(/Async$/, 'Result')
  const statusCode = result[resultKey].STAT

  if (parseInt(statusCode) === 0 || (parseInt(statusCode) >= 80 && parseInt(statusCode) <= 89)) {
    return result[resultKey]
  } else {
    throw statusCodes[statusCode]
  }
}
