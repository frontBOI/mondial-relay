// @src: https://www.mondialrelay.fr/solutionspro/offres-et-services/offre-start/tarifs-et-paiement/
// rempli à la main, et à changer à chaque fois ques les tarifs changent (car pas de webservice mis à disposition)

type AvailableCountry = 'FR' | 'BE' | 'LU' | 'NL' | 'ES' | 'PT' | 'DE' | 'IT' | 'AT'

/**
 * Gives the delivery price for a given weight and destination country code. The weight can go from 250g to 30kg, and the destination country must be one of the supported countries.
 * @param weightInGrams - The weight of the package in grams.
 * @param destinationCountryCode - The 2-letter country code of the destination country.
 * @returns The delivery price in euros, or null if the weight is not supported by Mondial Relay.
 *
 * @example
 * ```typescript
 * getDeliveryPrice(500, 'FR') // this will return 3.99
 * ```
 *
 * @remarks
 *
 * This function is a simple mapping of weight and destination country code to a delivery price. It is not a real API call, and thus has been
 * filled by hand and should be updated whenever the prices change. See {@link [the prices page](https://www.mondialrelay.fr/solutionspro/offres-et-services/offre-start/tarifs-et-paiement/)} for more information.
 *
 * @experimental
 * */
export default function getDeliveryPrice(weightInGrams: number, destinationCountryCode: AvailableCountry) {
  const priceTableHT: { [key: string]: { [key: string]: number } } = {
    '250': { FR: 3.49, BE: 3.69, LU: 3.69, NL: 4.39, ES: 5.39, PT: 5.39, DE: 5.42, IT: 6.15, AT: 7.26 },
    '500': { FR: 3.99, BE: 4.17, LU: 4.17, NL: 5.03, ES: 6.16, PT: 6.16, DE: 5.98, IT: 7.02, AT: 7.82 },
    '1000': { FR: 4.49, BE: 4.95, LU: 4.95, NL: 5.55, ES: 6.6, PT: 6.6, DE: 6.71, IT: 7.47, AT: 8.88 },
    '2000': { FR: 5.49, BE: 5.74, LU: 5.74, NL: 5.95, ES: 6.84, PT: 6.84, DE: 7.83, IT: 8.15, AT: 9.25 },
    '3000': { FR: 6.49, BE: 6.9, LU: 6.9, NL: 7.63, ES: 8.74, PT: 8.74, DE: 8.9, IT: 9.32, AT: 10.55 },
    '5000': { FR: 9.99, BE: 6.9, LU: 6.9, NL: 7.63, ES: 8.74, PT: 8.74, DE: 9.52, IT: 10.12, AT: 11.56 },
    '7000': { FR: 11.49, BE: 11.82, LU: 11.82, NL: 11.82, ES: 11.25, PT: 11.25, DE: 12.25, IT: 13.01, AT: 14.58 },
    '10000': { FR: 12.99, BE: 13.42, LU: 13.42, NL: 13.42, ES: 14.29, PT: 14.29, DE: 15.15, IT: 16.12, AT: 18.01 },
    '15000': { FR: 18.99, BE: 19.51, LU: 19.51, NL: 19.51, ES: 18.99, PT: 18.99, DE: 19.89, IT: 21.15, AT: 23.42 },
    '20000': { FR: 20.99, BE: 23.18, LU: 23.18, NL: 23.18, ES: 24.36, PT: 24.36, DE: 25.12, IT: 26.74, AT: 29.56 },
    '25000': { FR: 24.99, BE: 27.14, LU: 27.14, NL: 27.14, ES: 27.14, PT: 27.14, DE: 30.21, IT: 31.45, AT: 37.67 },
    '30000': { FR: 29.99, BE: 32.57, LU: 32.57, NL: 32.57, ES: 32.57, PT: 32.57, DE: 36.42, IT: 37.58, AT: 41.73 },
  }

  // check if the destination country code is supported
  const supportedCountries = new Set(Object.values(priceTableHT).flatMap(countryPrices => Object.keys(countryPrices)))
  if (!supportedCountries.has(destinationCountryCode)) {
    throw new Error(
      `The destination country code ${destinationCountryCode} is not supported. Supported country codes are: ${Array.from(
        supportedCountries,
      ).join(', ')}`,
    )
  }

  let priceHT
  for (const weight in priceTableHT) {
    if (weightInGrams <= parseInt(weight)) {
      priceHT = priceTableHT[weight][destinationCountryCode] || null
      break
    }
  }

  if (!priceHT) {
    throw new Error(
      `The weight ${weightInGrams} is not supported. Supported weights are: ${Object.keys(priceTableHT).join(', ')}`,
    )
  }

  // ajout de la TVA
  return priceHT * 1.2
}
