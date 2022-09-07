import { Box, Slider } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import React, {Suspense} from 'react';
import { Modal } from '@material-ui/core'
import { SubmitHandler, useForm } from 'react-hook-form'

const username = sessionStorage.getItem('name')

interface InputForm2 {
  menu: string
}


let DATA: any[] = []
const axios = require('axios')
axios.get('http://localhost:4000/restaurants').then(function (response: any) {
  DATA = response.data
})

var maximum = 0;
let str = '';

function LikeBtn() {
  const [likes, setLikes] = useState(0);
  return(
    <button className="text-3xl bg-yellow-200 rounded-xl ml-11 mt-20" onClick={() => setLikes(likes + 1)}>{likes} ❤️</button>
  ); 

}



function Listing(input: string, range: number, sortNameAsc: boolean, sortDistanceAsc: boolean, nameClicked: boolean) {

  function HeaderComponent()
  {
    const [t, i18n] = useTranslation('common');
      return  <div>
                <h1>{t('welcome.title', {framework:'React'})}</h1>
                <button onClick={() => i18n.changeLanguage('de')}>🇮🇷</button>
                <button onClick={() => i18n.changeLanguage('en')}>🇺🇸</button>
              </div>
  }
  const [t, i18n] = useTranslation('common');

  const [imageClicked, setImageClicked] = useState('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(0)
  const [name, setName] = useState('')

  const handleClick = (name:string, image: any, id: number) => {
    setOpen(true)
    setImageClicked(image)
    setId(id)
    setName(name)
  }
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm<InputForm2>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<InputForm2> = (data) => {
    axios
      .put(`http://localhost:4000/restaurants/${id}`, {
        menu: data.menu
      })
      .then(function (response: any) {
        console.log(response)
        reset()
      })
      .catch(function (error: any) {
        console.log(error)
        alert(error.response.data.response)
      })
      window.location.reload();
  }
  
  const maxDis = DATA.filter((item: { distance: number }) => {
    if(item.distance > maximum){
      maximum=item.distance;
    }
    return maximum;
  })


  const filtered1 = DATA.filter((item: { name: string }) => {
    return item.name.toLowerCase().includes(input)
  })


  const filtered2 = filtered1.filter((item: { distance: number }) => {
    return item.distance <= range
  })


  let filtered3: any[] = []
  let filtered4: any[] = []

  if (nameClicked) {

    if (sortNameAsc) filtered3 = filtered2.sort((a: { name: number }, b: { name: number }) => (a.name > b.name ? 1 : -1))
    if (!sortNameAsc) filtered3 = filtered2.sort((a: { name: number }, b: { name: number }) => (a.name < b.name ? 1 : -1))
    filtered4 = filtered3
  } else {


    if (sortDistanceAsc) filtered4 = filtered2.sort((a: { distance: number }, b: { distance: number }) => (a.distance > b.distance ? 1 : -1))
    if (!sortDistanceAsc) filtered4 = filtered2.sort((a: { distance: number }, b: { distance: number }) => (a.distance < b.distance ? 1 : -1))
  }

  const handleClick2 = () => {
    axios.post('http://localhost:4000/voting', {
      restaurantName: name,
      restaurantId: id,
      userName:username
    })
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });

  }

  console.log('Name: ',name)
  console.log('ID: ',id)
  console.log('userName: ',username)

  return filtered4.map((val: any) => (
    <li className='user inline-flex m-4' key={val.id}>

    <button onClick={() => handleClick(val.name, val.menu, val.id)} className='rounded-md h-55 w-65  flex flex-col space-y-12 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-100'
    style={{  
      backgroundImage: "url(" + val.image + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '310px',
      width: '310px'
    }}
    >

        
      <div className="text-3xl bg-yellow-200 rounded-t-md text-center">{val.name}</div>


        <div className="absolute bottom-1 flex space-x-20 content-center ml-17">



          <div onClick={() => handleClick2()} className="text-3xl bg-yellow-200 rounded-xl ml-11 mt-20">{val.distance} KM</div>
            <div onClick={() => handleClick2()} className="text-3xl bg-yellow-200 rounded-xl">like {}</div>
          </div>       
    </button>

      <Modal open={open} onClose={() => setOpen(false)} className="flex items-center justify-center">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="content-center"> 
            <div className='flex items-center'>
              <input {...register('menu', { minLength: 2 })} type="text" placeholder={t('welcome.NewMenu')} className="w-full p-3 text-primary border rounded-l-md outline-none text-sm transition duration-150 ease-in-out" />
              <button type="submit" className="text-center border border-gray-700 bg-transparent hover:bg-gray-700 text-lg text-black bg-yellow-300 hover:bg-yellow-400 font-medium py-2 px-4 rounded-r-md focus:outline-none flex items-center">{t('welcome.submit')}</button>
            </div>
          </form>
          <img src={imageClicked} className="h-96" />
        </div>
      </Modal>
  </li>
  ))
}

export const MainSite = () => {
  
  const [searchTerm,setSearchTerm]=useState('');
  const username = sessionStorage.getItem('name')

  const [value, setValue] = useState<string>('')
  const [valueSlider, setValueSlider] = useState(5)
  const navigate = useNavigate()

  const getText = (valu: any) => `${valueSlider}`
  const changeValue = (event: any, value: any) => {
    setValueSlider(value)
  }

  const [sortNameAsc, setSortNameAsc] = useState(false)
  const [sortDistanceAsc, setSortDistanceAsc] = useState(false)
  const [nameClicked, setNameClicked] = useState(true)

  function handleSortByName() {
    setNameClicked(true)
    setSortNameAsc(!sortNameAsc)
  }
  function handleSortByDistance() {
    setNameClicked(false)
    setSortDistanceAsc(!sortDistanceAsc)
  }


  useEffect(() => {
    if (sessionStorage.getItem('email') === null) {
      navigate('/')
      alert("You're not logged in")
    }
  })

  function HeaderComponent()
  {
    const [t, i18n] = useTranslation('common');
      return  <div>
                <h1>{t('welcome.title', {framework:'React'})}</h1>
                <button onClick={() => i18n.changeLanguage('de')}>🇮🇷</button>
                <button onClick={() => i18n.changeLanguage('en')}>🇺🇸</button>
              </div>
  }
  const [t, i18n] = useTranslation('common');


  return (
    <Suspense fallback="loading">
    <HeaderComponent/>
    <div className="min-h-screen" style={{ backgroundImage: 'url(https://wallpaperset.com/w/full/b/0/0/487576.jpg)', }}>

      <nav className="sticky top-0 bg-yellow-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 h-13">
        <div className="flex items-center justify-between">




          <div className="flex items-center justify-end w-full">
            <a
              className="transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-110 pr-4 text-gray-600 hover:text-gray-900 hover:underline"
              href="/profile"
            >
              {username}
            </a>
            <a
              
              href="/"
              className="transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-100 text-gray-600 hover:text-gray-900 focus:outline-none mx-4 sm:mx-0 container flex flex-wrap justify-between items-center mx-auto"
            >
              <FontAwesomeIcon size="lg" icon={faSignInAlt} />
            </a>
          </div>

          <select>
            <option onClick={handleSortByName}>{t('welcome.text3')} {sortNameAsc ? 'Z-A' : 'A-Z'}</option>
            <option onClick={handleSortByDistance}>{t('welcome.text5')} {sortDistanceAsc ? '▼' : '▲'}</option>
          </select>
          

          <div className="container flex flex-wrap justify-between items-center mx-auto mt-1">

            <div className="flex  md:order-2">
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Search</span>
                </button>
                <div className="hidden relative md:block">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Search icon</span>
                </div>
                <input onChange={(e) => setValue(e.target.value)} type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-yellow-400 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-400 dark:focus:border-yellow-400" placeholder="Search..."/>
                </div>
                <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
              <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
              <div className="relative mt-3 md:hidden">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input onChange={(e) => setValue(e.target.value)} type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-yellow-400 focus:border-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-400 dark:focus:border-yellow-400" placeholder="Search..."/>
              </div>

            </div>
        </div>

        </div>
            
      </nav>



      <div>
        <div>


        <div className="m-5 mt-2">
          <h1 className="text-lg">{t('welcome.Distance')}</h1>
          <Box display="flex" flexDirection="column" m={10} className="w-1/4 mt-10 ">
            <Slider value={valueSlider} onChange={changeValue} valueLabelDisplay="on" getAriaValueText={getText} max={maximum} color="secondary"/>
          </Box>

          <Link to="/addRes">
            <button className="text-center mt-4 border border-gray-700 bg-transparent hover:bg-gray-700 text-sm text-black bg-yellow-300 hover:bg-yellow-400 font-medium py-2 px-4 rounded focus:outline-none">
              Add your res
            </button>
          </Link>

        </div>

        </div>

        <div className="flex flex-row flex-wrap gap-x-7 mx-7">{Listing(value, valueSlider, sortNameAsc, sortDistanceAsc, nameClicked)}</div>

      </div>

    </div>
    </Suspense>
  )
}

export default MainSite;
