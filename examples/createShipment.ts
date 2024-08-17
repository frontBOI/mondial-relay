import createShipment from '../src/server/createShipment/index'

import chalk from 'chalk'

async function run() {
  try {
    console.log(chalk.yellow('Sending a demo shipment request to Mondial Relay...'))
    const response = await createShipment({
      context: {
        CustomerId: 'BDTEST',
        Password: "'2crtPDo0ZL7Q*3kLumB",
        Login: 'BDTEST@business-api.mondialrelay.com',
      },
      shipment: {
        OrderNo: '120120',

        CustomerNo: '120120',

        ParcelCount: '1',

        DeliveryInstruction: 'Hello world',

        CollectionMode: {
          Mode: 'CCC',
        },

        DeliveryMode: {
          Mode: '24R',
          Location: 'FR-000484',
        },

        Sender: {
          Title: 'Mr',
          Firstname: 'John',
          Lastname: 'Sender',
          Streetname: 'Villebois Mareuil',
          HouseNo: '3',
          CountryCode: 'FR',
          PostCode: '69003',
          City: 'Lyon',
          PhoneNo: '',
          MobileNo: '+33646781454',
          Email: 'john.sender@example.com',
        },

        Recipient: {
          Title: 'Mr',
          Firstname: 'Maria',
          Lastname: 'Receiver',
          Streetname: 'Villebois Mareuil',
          HouseNo: '2',
          CountryCode: 'FR',
          PostCode: '69003',
          City: 'Lyon',
          PhoneNo: '',
          MobileNo: '+33646781454',
          Email: 'maria.reciever@example.com',
        },

        Parcels: {
          Parcel: {
            Content: 'Des bigoudis de tailles variables',
            Weight: {
              Unit: 'gr',
              Value: 2000,
            },
          },
        },
      },
    })

    console.log(chalk.green('Sent successfully.'))
    console.log(response)
  } catch (e) {
    console.error(chalk.red(e))
  }
}

run()
