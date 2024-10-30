import getDeliveryPrice from '../src/both/getDeliveryPrice'

console.log('Petit colis français: ', getDeliveryPrice(100, 'FR'))
console.log('Gros colis italien: ', getDeliveryPrice(2750, 'IT'))
