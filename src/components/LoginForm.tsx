import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {useTranslation} from "react-i18next";
import React, {Suspense} from 'react';

interface InputForm {
  username: string
  password: string
}

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<InputForm>({ mode: 'onTouched' })
  const navigate = useNavigate()
  const axios = require('axios')

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    axios
      .post('http://localhost:4000/auth/login', { username: data.username, password: data.password })
      .then(function (response: any) {
        console.log(response)
        sessionStorage.setItem('name', response.data.fullName)
        sessionStorage.setItem('email', response.data.email)
        navigate('/home')
      })
      .catch(function (error: any) {
        console.log(error)
        alert('Username or password is wrong!')
      })
  }

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = (event: any) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

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
    <div className="bg-cover h-screen w-screen" style={{ backgroundImage: 'url(https://wallpaperset.com/w/full/b/0/0/487576.jpg)' }}>
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="bg-yellow-50 rounded w-1/2">
        <h1 className="text-4xl text-center font-thin">{t('welcome.title', {framework:'React'})}</h1>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
        {t('welcome.Username')}
        </label>
          <input {...register('username', { required: 'Username is required!' })} type="text" placeholder="Username" className="flex-grow h-10 px-2 border rounded border-grey-400 focus:border-gray-700 focus:outline-none" />
          <div className="text-red-700">{errors.username?.message}</div>
            <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
            {t('welcome.Password')}
            </label>
          <div className="relative">
            <div className="w-full">
              <input
                {...register('password', { required: 'Password is required!' })}
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                className="flex-grow h-10 px-2 rounded border border-grey-400 focus:border-gray-700
                    focus:outline-none"
              ></input>
            </div>
            <div className="absolute-top-0 ">
              <button onClick={togglePassword} className="ml-40">
                    <i onClick={togglePassword} className="absolute inset-y-0 right-45 mb-5 pr-5 flex items-center text-sm leading-5 text-gray-600">
                        <FontAwesomeIcon onClick={togglePassword} icon={passwordShown  ? faEyeSlash : faEye} />
                    </i>
              </button>
            </div>
          </div>
          <div className="text-red-700">{errors.password?.message}</div>
          <div className="grid grid-rows-2 place-content-center">
            <span className="mt-5">
            
              <button type="submit" className="text-center mt-4 border border-gray-700 bg-transparent hover:bg-gray-700 text-lg text-black bg-yellow-300 hover:bg-yellow-400 font-medium py-2 px-4 rounded focus:outline-none">
              {t('welcome.logIn')} 
                
              </button>
              
            </span>
            <span className="my-2">
            <span>{t('welcome.text2')} </span>
            <a
              className="no-underline border-b border-blue-500
                            hover:border-blue-700 text-blue-500 hover:text-blue-700 ml-2"
              href="/sign-up"
            >
              {t('welcome.signUp')}
            </a>
            </span>
          </div>
        </form>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

export default Login;