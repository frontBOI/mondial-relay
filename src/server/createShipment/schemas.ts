import { z } from 'zod'

// @src: https://www.mondialrelay.fr/media/124596/web-service-dual-carrier-v-271.pdf

export const PersonSchema = z
  .object({
    City: z
      .string()
      .max(30)
      .regex(/^[A-Za-z_\-'\s]{2,30}$/),

    Email: z.string().email().max(70),

    HouseNo: z
      .string()
      .max(10)
      .regex(/^[0-9A-Z_\-'.,/]{0,10}$/),

    PhoneNo: z.string().max(20),
    MobileNo: z.string().max(20),
    Lastname: z.string(),
    Firstname: z.string(),

    PostCode: z
      .string()
      .max(10)
      .regex(/^[0-9A-Za-z_\-']{2,10}$/),

    Streetname: z
      .string()
      .max(40)
      .regex(/^[0-9A-Za-z_\-'.,\s]{0,40}$/),

    CountryCode: z
      .string()
      .max(2)
      .regex(/^[A-Z]{2}$/),

    Title: z.enum(['Mr', 'Mme']),
  })
  .refine(
    data => {
      const totalLength = data.Title.length + data.Firstname.length + data.Lastname.length
      return totalLength <= 32
    },
    {
      message: 'The combined length of Title, Firstname, and Lastname should not exceed 32 characters',
      path: ['Title', 'Firstname', 'Lastname'],
    },
  )
  .refine(
    data => {
      const totalLength = data.Streetname.length + data.HouseNo.toString().length
      return totalLength <= 40
    },
    {
      message: 'The combined length of Streetname and houseNo should not exceed 40 characters',
      path: ['Streetname', 'houseNo'],
    },
  )

export const ShipContextSchema = z.object({
  Login: z.string(),
  Password: z.string(),
  VersionAPI: z.string().optional(),

  Culture: z
    .string()
    .max(5)
    .regex(/^[a-z]{2}-[A-Z]{2}$/)
    .optional(),

  CustomerId: z
    .string()
    .max(8)
    .regex(/^[0-9A-Z]{2}[0-9A-Z ]{4,6}$/),
})

export const ShipOutputOptionsSchema = z
  .object({
    OutputFormat: z.enum(['10x15', 'A4', 'A5']),
    OutputType: z.enum(['ZplCode', 'PdfUrl', 'IplCode']),
  })
  .optional()

const ParcelSchema = z.object({
  Content: z
    .string()
    .max(40)
    .regex(/^[0-9A-Za-z_\- '., /]{0,40}$/),

  Weight: z.object({
    Value: z.number(),
    Unit: z.literal('gr'),
  }),

  Length: z
    .object({
      Value: z.number(),
      Unit: z.literal('cm'),
    })
    .optional(),

  Width: z
    .object({
      Value: z.number(),
      Unit: z.literal('cm'),
    })
    .optional(),

  Depth: z
    .object({
      Value: z.number(),
      Unit: z.literal('cm'),
    })
    .optional(),
})

const ParcelsSchema = z.object({
  Parcel: ParcelSchema,
})

export const ShipmentSchema = z.object({
  Sender: PersonSchema,
  Recipient: PersonSchema,

  OrderNo: z
    .string()
    .max(15)
    .regex(/^(|[0-9A-Z_-]{0,15})$/),

  CustomerNo: z
    .string()
    .max(9)
    .regex(/^(|[0-9A-Z]{0,9})$/),

  ParcelCount: z
    .string()
    .max(2)
    .regex(/^[0-9]{1,2}$/),

  DeliveryInstruction: z
    .string()
    .max(30)
    .regex(/^[0-9A-Za-z_\- '., /]{0,30}$/)
    .optional(),

  ShipmentValue: z
    .object({
      currency: z.literal('EUR'),
      amount: z.string().regex(/^[0-9]{0,10}$/),
    })
    .optional(),

  Options: z
    .object({
      Option: z.object({
        Key: z.string(),
        Value: z.string(),
      }),
    })
    .optional(),

  CollectionMode: z.object({
    Mode: z.enum(['CCC', 'REL']),
    location: z
      .string()
      .max(10)
      .regex(/^[0-9A-Z-]{0,10}$/)
      .optional(),
  }),

  DeliveryMode: z.object({
    Mode: z.enum(['LCC', 'HOM', '24R', '24L', 'XOH']),
    location: z
      .string()
      .max(10)
      .regex(/^[0-9A-Z-]{0,10}$/)
      .optional(),
  }),

  Parcels: ParcelsSchema,
})
