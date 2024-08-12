import { Args } from '../../../types/args'
import statusCodes from './statusCodes'

import crypto from 'crypto'
import * as soap from 'soap'

// const merchant = process.env.MONDIAL_RELAY_ENSEIGNE || 'BDTEST13'
const privateKey = process.env.MONDIAL_RELAY_PRIVATE_KEY || 'PrivateK'
const apiUrl = process.env.MONDIAL_RELAY_API_URL || 'https://api.mondialrelay.com/Web_Services.asmx?WSDL'

export function securityKey(args: any) {
  const content = args.join('') + privateKey
  return crypto.createHash('md5').update(content).digest('hex').toUpperCase()
}

export function validateStatusCode(code: string) {
  return code === '0'
}

export async function executeApiCall(args: Args, apiMethod: string) {
  const client = await soap.createClientAsync(apiUrl, { endpoint: apiUrl })
  args.Security = securityKey(Object.values(args))

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
