<div align='center'>
    <img src="doc/package.webp" height="128">
    <h1 align='center'>mondial-relay</h1>
</div>

<div align="center">
    <img src=https://img.shields.io/badge/Created_by-Tom_Blanchet-blue?color=FED205&style=for-the-badge>
    <img src=https://img.shields.io/badge/Maintained%20%3F-yes-green.svg?style=for-the-badge>
</div>
 
<div align="center">
    <img src=https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white>
    <img src=https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB>
</div>
 
<div align="center">
    <a href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiFmq2GueKEAxXf_7sIHcONCvcQFnoECBEQAQ&url=https%3A%2F%2Ffr.linkedin.com%2Fin%2Ftom-blanchet&usg=AOvVaw2NyolXUeo7ja8PpF4VNmHt&opi=89978449'>
    <img src=https://img.shields.io/badge/Tom_Blanchet-0077B5?logo=linkedin&logoColor=white&style=for-the-badge>
    </a>
</div>

```
An unofficial package that allows you to interact with MondialRelay's API in NodeJS and Typescript.
```

This package provides functions for easy interaction with MondialRelay without having to setup a Prestashop or any ecommerce module, along with a React component to integrate the MondialRelay parcel shop selector. Handy !

# Install

```bash
npm install @frontboi/mondial-relay
```

# ✨ Features

> You must have an account at [Mondial Relay connect hub](https://connect.mondialrelay.com) to obtain the values required to successfully request Mondial Relay's WebService. You can create an account [here](https://www.mondialrelay.fr/connexion-inscription/).

This package exports various utilities to help you develop an application that communicates with Mondial Relay. The features are separated in two modules: `client` (React component) and `server` (SOAP concerned functions for API v1, REST for API v2). This way, the server imports won't mess with the client code (which can lead to problems in a React application for example).

This package's utilities are separated in three functional domains:

- Client-side only function _(e.g. a React component)_
- Server-side only function _(e.g. create a shipment, which requireds a secret so backend only)_
- Functions available on both environment

## Client

This package exports a React component ready to be integrated on a webpage so that the user can select the relay point he wishes:

```tsx
import { useState } from 'react'

import { ParcelShopSelector } from '@frontboi/mondial-relay'
import { ParcelShopID, ParcelShopSelected } from '@frontboi/mondial-relay/types/parcel-shop'

export default function MondialRelayMapSelector() {
  const [parcelShop, setParcelShop] = useState<ParcelShopSelected & ParcelShopID>()

  return (
    <ParcelShopSelector
      weight={3000} // (in grams) optional, filters parcel shops by package weight
      nbResults={7} // optional (default: 7)
      deliveryMode="24R" // optional (default: "24R)
      brandIdAPI="BDTEST" // optional (default: "BDTEST", replace with your Brand Id API value for production usage)
      defaultCountry="FR" // optional (default: "FR")
      defaultPostcode="59000" // optional (default: "59000")
      allowedCountries="FR,BG" // optional (default: "FR")
      onParcelShopSelected={setParcelShop} // setter function when a parcel shop is clicked
    />
  )
}
```

## Server

❗️**IMPORTANT**: because Mondial Relay does not provide a separated test environement, the library sends requests to the **production** Mondial Relay API endpoint. Be sure to use test credentials for your development stage !

### Create shipment 📤

Here is how to create a shipment and get an etiquette back:

```typescript
import createShipment from '@frontboi/mondial-relay'
import { CreateShipmentResponse } from '@frontboi/mondial-relay/types/ship'

const data: CreateShipmentResponse = await createShipment({
  // check out examples/createShipment for a complete example of
  // the object that should be passed to this function
  //
  // the parameters you pass are validated by Yup so that you are
  // sure you send correct data to Mondial Relay
})

const { rawResponse, isSandbox, sendingNumber, etiquetteLink } = data
```

To try this function, fill the `Login` and `Password` fields in `/examples/createShipment.ts` with your own keys, then run `npm run demo:create_shipment` to test for your environment.

### API v1 👴🏼

These are all the functions made available by the Mondial Relay's API v1, using SOAP.
Here is an exhaustive list of the actions you can trigger using this library:

- `getLabels`: get labels
- `createLabel`: create a label
- `getTracking`: get the current tracking for a package
- `getStatMessage`: get statistic message
- `searchZipCodes`: search relay points by zip code
- `searchPointsRelais`: search relay points by zip code

For example:

```typescript
import { getLabels, getTracking } from '@frontboi/mondial-relay'

getLabels().then(labels => console.log(labels))
getTracking().then(trackingInfos => console.log(trackingInfos.Relais_Libelle))
```

## Client and server

Functions made available both for client and server environment.

### Get delivery price (including VAT) 🚛

The `getDeliveryPrice` function allows you to calculate your delivery price, based on the destination's country and the package's weight. Please take into consideration that:

1. **Prices are based on professional delivery's price schedule**. There is currently no method to calculate the delivery price for a private individual.
2. Mondial Relay delivers from France to European countries. Therefore, **you cannot calculate delivery price from a country other than France**.

Here is an example of how to get your delivery price (VAT included):

```typescript
import { getDeliveryPrice } from '@frontboi/mondial-relay'

const deliveryPrice = getDeliveryPrice(
  3000, // the weight in grams
  'FR', // the destination country
)
```

---

### Support

You can create an issue on this project and I will gladly consider it.
If you prefer, you can contact me on my Linkedin or directly by email (contact@tomblanchet.fr).

### Credit

API v1 integration was heavily influenced by [this code](https://github.com/nooqta/mondial-relay-api). Thank you for your work.

_Tom Blanchet - 2024_
