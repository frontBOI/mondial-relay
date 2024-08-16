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

This package exports various utilities to help you develop an application that communicates with Mondial Relay. The features are separated in two modules: `client` (React component) and `server` (SOAP concerned functions for API v1, REST for API v2). This way, the server imports won't mess with the client code (which can lead to problems in a React application for example).

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
      brandIdAPI="BDTEST" // optional (default: "BDTEST", replace with your Brand Id API value)
      defaultCountry="FR" // optional (default: "FR")
      defaultPostcode="59000" // optional (default: "59000")
      allowedCountries="FR,BG" // optional (default: "FR")
      onParcelShopSelected={setParcelShop} // setter function when a parcel shop is clicked
    />
  )
}
```

_This component has been completely developed using Typescript._

## Server

The server utilities are separated in several functional domains.

❗️**IMPORTANT**: the library sends requests to the **production** Mondial Relay API endpoint. Be sure to use test credentials for your development stage !

### Setup

You must have an account at [Mondial Relay connect hub](https://connect.mondialrelay.com) to obtain the values required to successfully request Mondial Relay's WebService. You can create an account [here](https://www.mondialrelay.fr/connexion-inscription/).

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

To try this function, you can fill the `Login` and `Password` fields in `/examples/createShipment.ts` and then run `npm run demo:create_shipment` to see it in action.

### API v1 👴🏼

These are all the functions made available in the Mondial Relay's API v1, using SOAP.
Here is an exhaustive list of the actions you can trigger using this library:

- `getLabels`: get labels
- `createLabel`: create a label
- `getTracking`: get the current tracking for a package
- `getStatMessage`: get statistic message
- `searchZipCodes`: search relay points by zip code
- `searchPointsRelais`: search relay points by zip code

For example:

```typescript
import { getLabels } from '@frontboi/mondial-relay'

getLabels().then(labels => console.log(labels))
```

## Client and server

Some functions are available both for the client and the server.

### Get delivery price HT 🚛

You can get your delivery price without taxes using the following function:

```typescript
import { getDeliveryPriceHT } from '@frontboi/mondial-relay'

const deliveryPrice = getDeliveryPriceHT(
  3000, // the weight in grams
  'FR', // the destination country
)
```

---

### Support

You can create a PR on this project and I will review it.
If you prefer, you can contact me on Linkedin or by email (contact@tomblanchet.fr).

### Credit

API v1 integration was heavily influenced by [this code](https://github.com/nooqta/mondial-relay-api). Thank you for your work.

_Tom Blanchet - 2024_
