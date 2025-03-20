export interface Person {
  City: string
  Email: string
  HouseNo: string
  PhoneNo: string
  MobileNo: string
  Lastname: string
  PostCode: string
  Firstname: string
  Streetname: string
  CountryCode: string
  Title?: 'Mr' | 'Mme'
}

export interface ShipContext {
  Login: string
  Password: string
  Culture?: string
  CustomerId?: string
  VersionAPI?: string
}

export interface ShipOutputOptions {
  OutputFormat: string
  OutputType: string
}

export interface Shipment {
  Sender: Person
  OrderNo: string
  Recipient: Person
  CustomerNo: string
  ParcelCount: string
  DeliveryInstruction?: string

  ShipmentValue?: {
    currency: 'EUR'
    amount: string
  }

  Options?: {
    Option: {
      Key: string
      Value: string
    }
  }

  /**
   * Où le colis est récupéré
   * @src https://www.mondialrelay.fr/media/123861/web-service-dual-carrier-v-27.pdf
   */
  CollectionMode: {
    Mode: 'CCC' | 'REL'
  }

  // où le colis est livré
  DeliveryMode: {
    Mode: 'LCC' | 'HOM' | '24R' | '24L' | 'XOH'
    Location?: string
  }

  Parcels: {
    Parcel: {
      Content: string

      Weight: {
        Value: number
        Unit: 'gr'
      }

      Length?: {
        Value: number
        Unit: 'cm'
      }
      Width?: {
        Value: number
        Unit: 'cm'
      }
      Depth?: {
        Value: number
        Unit: 'cm'
      }
    }
  }
}

export interface CreateShipmentResponse {
  rawResponse: any
  sendingNumber: string
  etiquetteLink: string
}
