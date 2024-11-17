import React, { HTMLInputElement, useEffect, useRef } from 'react'

import { ParcelShopID, ParcelShopSelected } from '../../types/parcel-shop'

interface Props {
  weight?: number
  nbResults?: number
  brandIdAPI: string
  defaultCountry?: string
  defaultPostcode?: string
  allowedCountries?: string
  deliveryMode?: 'LCC' | 'HOM' | '24R' | '24L' | 'XOH'
  onParcelShopSelected(data: ParcelShopSelected & ParcelShopID): void
}

export default function ParcelShopSelector({
  weight,
  nbResults,
  brandIdAPI,
  deliveryMode,
  defaultCountry,
  defaultPostcode,
  allowedCountries,
  onParcelShopSelected,
}: Props) {
  const targetDisplayRef = useRef<HTMLInputElement>(null)
  const jqueryScriptRef = useRef<HTMLScriptElement>(null)
  const MRScriptRef = useRef<HTMLScriptElement>(null)

  useEffect(() => {
    load()
    loadCSS()
  }, [])

  /**
   * We are in a Typescript library built without a bundler: it is not possible to load CSS files in the traditional way
   * with ‘import ./style.css’, the compilation interprets the CSS file as JS and this does not work. So, at runtime, you
   * have to load the desired style content for it to be applied.
   */
  function loadCSS() {
    const style = document.createElement('style')
    style.innerHTML = `
    .Zone_Widget > div {
      width: 100%;
    }

    .Target_Widget {
      visibility: hidden;
    }

    @media (max-width: 425px) {
      .MR-Widget .MRW-Results {
        height: unset !important;
      }
    }
  `
    document.head.appendChild(style)
  }

  function load() {
    // chargement de JQuery, puis du script de Mondial Relay
    const jqueryScript = document.createElement('script')
    jqueryScript.src = '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'
    jqueryScript.onload = () => {
      const mrScript = document.createElement('script')
      mrScript.src = '//widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js'

      mrScript.onload = () => {
        // Charge le widget dans la DIV d'id "Zone_Widget" avec les paramètres indiqués
        ;($('#Zone_Widget') as any).MR_ParcelShopPicker({
          //
          // Paramétrage de la liaison avec la page.
          //
          // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais (ex: input hidden)
          Target: '#Target_Widget',
          // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais pour affichage
          TargetDisplay: '#TargetDisplay_Widget',
          // Selecteur de l'élément dans lequel sont envoysé les coordonnées complètes du point relais
          TargetDisplayInfoPR: '#TargetDisplayInfoPR_Widget',
          //
          // Paramétrage du widget pour obtention des point relais.
          //
          // Le code client Mondial Relay, sur 8 caractères (si test, ajouter des espaces à droite, ex: "BDTEST  ")
          // BDTEST est utilisé pour les tests => un message d'avertissement apparaît
          Brand: brandIdAPI === 'BDTEST' ? 'BDTEST  ' : brandIdAPI,
          // Pays utilisé pour la recherche: code ISO 2 lettres.
          Country: defaultCountry || 'FR',
          // Code postal pour lancer une recherche par défaut
          PostCode: defaultPostcode || '59000',
          // Mode de livraison (Standard [24R], XL [24L], XXL [24X], Drive [DRI])
          ColLivMod: deliveryMode || '24R',
          // Nombre de Point Relais à afficher
          NbResults: nbResults ? '' + nbResults : '7',
          //
          // Paramétrage d'affichage du widget.
          //
          // Afficher les résultats sur une carte?
          ShowResultsOnMap: true,
          // Afficher les informations du point relais à la sélection sur la carte?
          DisplayMapInfo: true,
          // Fonction de callback déclenché lors de la selection d'un Point Relais
          OnParcelShopSelected: (data: ParcelShopSelected) => {
            onParcelShopSelected({ ...data, ParcelShopID: targetDisplayRef.current?.value })
          },
          //
          // Autres paramétrages.
          //
          // Filtrer les Points Relais selon le Poids (en grammes) du colis à livrer
          ...(weight && { Weight: weight }),
          // Spécifier le nombre de jours entre la recherche et la dépose du colis dans notre réseau
          // SearchDelay: "3",
          // Limiter la recherche des Points Relais à une distance maximum
          // SearchFar: "",
          // Liste des pays selectionnable par l'utilisateur pour la recherche: codes ISO 2 lettres
          AllowedCountries: allowedCountries || 'FR',
          // Force l'utilisation de Google Map si la librairie est présente?
          // EnableGmap: true,
          // Activer la recherche de la position lorsque le navigateur de l'utilisateur le supporte?
          // EnableGeolocalisatedSearch: "true",
          // Spécifier l'utilisation de votre feuille de style CSS lorsque vous lui donnez la valeur "0"
          CSS: '1',
          // Activer le zoom on scroll sur la carte des résultats?
          //,MapScrollWheel: "false",
          // Activer le mode Street View sur la carte des résultats (attention aux quotas imposés par Google)
          // MapStreetView: "false"
        })
      }

      jqueryScriptRef.current = document.body.appendChild(mrScript)
    }
    MRScriptRef.current = document.body.appendChild(jqueryScript)
  }

  return (
    <>
      <div id="Zone_Widget" className="Zone_Widget" />
      <input type="text" id="Target_Widget" ref={targetDisplayRef} className="Target_Widget" />
    </>
  )
}
