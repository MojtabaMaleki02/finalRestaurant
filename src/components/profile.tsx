import React from 'react'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let JSONDATA: any[] = []

const axios = require('axios')
axios.get('http://localhost:4000/restaurants').then(function (response: any) {
    JSONDATA = response.data
})

console.log(JSONDATA) 


const User: React.FunctionComponent = () => {
  const username =  localStorage.getItem('name_key')
  const fullName = localStorage.getItem('name_key')
  const email = localStorage.getItem('email_key')

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-white to-gray-500"
    style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/1611276.jpg)' }}
  >
    <div className="relative w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden my-4" style={{ height: '500px'}}>
      <div className="flex items-center h-20 lg:h-24 px-6 py-3 bg-yellow-400">
        <h1 className="mx-3 text-black font-black text-3xl lg:text-4xl cursor-default">Profile</h1>
      </div>
      <div className="pt-16 px-6">
        <h1 className="px-2 text-3xl text-gray-900 cursor-default">{sessionStorage.getItem('name')}</h1>
        
        <div className="flex items-center pl-4 mt-4">
          <FontAwesomeIcon icon={faEnvelope} />
          <h1 className="px-2 text-xl text-gray-900 cursor-default">Email:</h1>
          <h1 className="px-2 text-xl text-gray-700 cursor-default">{sessionStorage.getItem('email')}</h1>
        </div>
        <div className="absolute bottom-0 left-0 flex items-center mt-4 text-gray-700 pl-4 pb-4">
          <a
            className="bg-yellow-200 border border-gray-700 text-lg text-blac hover:bg-yellow-400 font-medium py-2 px-4 rounded focus:outline-none"
            href="/home"
          >
            Back
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default User