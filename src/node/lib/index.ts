import { Builder } from 'xml2js'

/**
 * Generates a XML string from a given object
 * @param data the data to be converted to XML
 * @returns the XML string
 */
export function generateXML(data: object): string {
  const builder = new Builder()
  const xml = builder.buildObject(data)
  return xml
}
