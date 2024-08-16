import getDeliveryPriceHT from '../src/both/getDeliveryPriceHT'

console.log('Petit colis français: ', getDeliveryPriceHT(100, 'FR'))
console.log('Gros colis italien: ', getDeliveryPriceHT(2750, 'IT'))
