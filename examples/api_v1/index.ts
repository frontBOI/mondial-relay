import {
  createLabel,
  getLabels,
  getStatMessage,
  getTracking,
  searchPointsRelais,
  searchZipCodes,
} from '../../src/server'
import labelData from './data/label'

import chalk from 'chalk'

async function runExamples() {
  const CP = '75020'
  const Pays = 'FR'
  const Ville = 'Paris'
  const Enseigne = 'BDTEST13'

  let result: any

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('Searching zip codes...'))
    result = await searchZipCodes({
      Enseigne,
      Pays,
      Ville,
      CP,
      NbResult: '15',
      PrivateKey: 'PrivateK',
    })
    console.log('Zip codes found: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('\nSearching points relais...'))
    result = await searchPointsRelais({
      Enseigne,
      Pays,
      Ville,
      CP,
      NombreResultats: '15',
      PrivateKey: 'PrivateK',
    })
    console.log('Just got points relais: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('\nCreating label...'))
    result = await createLabel(labelData)
    console.log('Just created label: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('\nGetting labels...'))
    result = await getLabels({
      Enseigne,
      Expeditions: '31236944',
      Langue: 'FR',
      PrivateKey: 'PrivateK',
    })
    console.log('Just got labels: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('\nGetting stat message...'))
    result = await getStatMessage({
      Enseigne,
      STAT_ID: 1,
      Langue: 'FR',
      PrivateKey: 'PrivateK',
    })
    console.log('Just got stat message: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }

  // -----------------------------------------------

  try {
    console.log(chalk.yellow('\nTracking a parcel...'))
    result = await getTracking({
      Enseigne: 'BDTEST',
      Expedition: '99134297',
      Langue: 'FR',
      PrivateKey: 'PrivateK',
    })
    console.log('Just got tracking: ', result)
  } catch (e) {
    console.error(chalk.red(e))
  }
}

runExamples()
