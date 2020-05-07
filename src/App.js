import React, { useState, useEffect } from 'react'
import logo from './Safe_Paths_Logo.png'
import './App.css'
import QRCode from 'qrcode.react'

function App () {
  const [view, setView] = useState('home')
  const [map, setMap] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const qrUrl = () => {
    if (!coordinates) {
      return null
    } else {
      return `safepaths://qr/${coordinates.latitude}/${coordinates.longitude}`
    }
  }

  useEffect(() => {
    if (view === 'map') {
      if (!map) {
        const myOptions = {
          zoom: 3,
          center: new window.google.maps.LatLng(37.09024, -95.712891),
          mapTypeControl: false,
          navigationControl: true,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        }
        const newMap = new window.google.maps.Map(document.getElementById('map-canvas'), myOptions)
        setMap(newMap)
      }
      if (map && !autocomplete) {
        const input = document.getElementById('search-text-field')
        const newAutocomplete = new window.google.maps.places.Autocomplete(input)
        setAutocomplete(newAutocomplete)
        window.google.maps.event.addListener(newAutocomplete, 'place_changed', function () {
          const place = newAutocomplete.getPlace()
          setCoordinates({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          })
          map.setCenter(place.geometry.location)
          map.setZoom(16)
        })
      }
    }
  }, [view, map, autocomplete])

  return (
    <div className='App'>
      {view === 'home' && (
        <div className='App-container'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Generate a SafePaths QR code for your location.
          </p>
          <span
            className='App-link'
            onClick={() => setView('map')}
            target='_blank'
            rel='noopener noreferrer'
          >
            Begin
          </span>
        </div>
      )}
      {view === 'map' && (
        <div className='App-container'>
          <p>
            Enter the address where this QR code will be displayed:
          </p>
          <input id='search-text-field' type='text' size='50' />
          <div id='map-canvas' />
          {coordinates && (
            <span
              className='App-link'
              onClick={() => setView('pre-qr')}
              target='_blank'
              rel='noopener noreferrer'
            >
              Use this address
            </span>
          )}
        </div>
      )}
      {view === 'pre-qr' && (
        <div className='App-container'>
          <p>
            Click the button below to generate your printable QR code. People may scan this as they enter your location.
          </p>
          {coordinates && (
            <span
              className='App-link'
              onClick={() => setView('qr')}
              target='_blank'
              rel='noopener noreferrer'
            >
              Show QR code
            </span>
          )}
        </div>
      )}
      {view === 'qr' && (
        <div className='App-container'>
          <img src={logo} className='App-logo-qr' alt='logo' />
          <p>
            Scan the QR code below to privately log your location with SafePaths:
          </p>
          <QRCode value={qrUrl()} size={256} />
        </div>
      )}
    </div>
  )
}

export default App
