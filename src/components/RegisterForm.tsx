import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {useTranslation} from "react-i18next";
import React, {Suspense} from 'react';

interface InputForm2 {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  passwordAgain: string
}

const axios = require('axios')

export const Registration = () => {

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

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm<InputForm2>({ mode: 'onChange' })

  const [passwordShownP, setPasswordShownP] = useState(false)
  const togglePasswordP = () => {
    setPasswordShownP(!passwordShownP)
  }

  const [passwordShownConfP, setPasswordShownConfP] = useState(false)
  const togglePasswordConfP = () => {
    setPasswordShownConfP(!passwordShownConfP)
  }
  const onSubmit: SubmitHandler<InputForm2> = (data) => {
    axios
      .post('http://localhost:4000/auth/register', {
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        username: data.username,
        password: data.password
      })
      .then(function (response: any) {
        console.log(response)
        reset()
      })
      .catch(function (error: any) {
        console.log(error)
        alert(error.response.data.response)
      })
  }

  return (
    <Suspense fallback="loading">
      <HeaderComponent/>
    <div className="bg-cover h-screen w-screen flex flex-col"
        style={{ backgroundImage: 'url(https://wallpaperset.com/w/full/b/0/0/487576.jpg)' }}>
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-yellow-50 rounded w-11/12">
      <h1 className="mb-8 text-3xl text-center text-gray-900">{t('welcome.signUp')}</h1>
        <form className="w-full max-w-lg ml-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-row-2">
            <div className="mr-6">
            <label htmlFor="fullName" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
            {t('welcome.FName')}
            </label>
              <input {...register('firstName', { minLength: 3 })} type="text" placeholder="First name" className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4" />
              <div className="text-red-700 text-xs">{errors.firstName && 'First name is too short!'}</div>
            </div>
            <div>
                <label htmlFor="fullName" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
                {t('welcome.LName')}
                </label>
              <input {...register('lastName', { minLength: 2 })} type="text" placeholder="Last name" className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4" />
              <div className="text-red-700 text-xs">{errors.lastName && 'Last name is too short!'}</div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="mr-6">
            <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
             {t('welcome.Username')}
            </label>
              <input {...register('username', { required: true, minLength: 3 })} type="text" placeholder="Username" className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4" />
              <div className="text-red-700 text-xs">{errors.username && 'The username is too short!'}</div>
            </div>
            <div>
            <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
             {t('welcome.Email')}
            </label>
              <input
                {...register('email', { required: true, pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/ })}
                type="text"
                placeholder="Email"
                className="p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              />
              <div className="text-red-700 text-xs">{errors.email && 'email format is wrong'}</div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="mr-6">
            <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
             {t('welcome.Password')}
            </label>
              <div className="relative">
                <div className="w-full">
                  <input
                    {...register('password', {
                      minLength: {
                        value: 5,
                        message: 'Minimum length is 5!'
                      },
                      
                    })}
                    type={passwordShownP ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  />
                </div>
                <div className="absolute -top-0 right-2">
                  <button onClick={togglePasswordP} className="mt-8">
                    <i onClick={togglePasswordP} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-600">
                        <FontAwesomeIcon onClick={togglePasswordP} icon={passwordShownP  ? faEyeSlash : faEye} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="text-red-700">{errors.password && errors.password.message}</div>
            </div>
            <div>
            <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-sm font-medium mb-2">
            {t('welcome.Password')}
            </label>
              <div className="relative">
                <div className="w-full">
                  <input 
                    {...register('passwordAgain', {
                      validate: (value: string) => {
                        return value === watch('password') || 'The passwords do not match!'
                      }
                    })}
                    type={passwordShownConfP ? 'text' : 'password'}
                    placeholder="Password again"
                    className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  />
                </div>
                <div className="absolute -top-0 right-2">
                  <button onClick={togglePasswordConfP} className="mt-8">
                    <i onClick={togglePasswordP} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-600">
                        <FontAwesomeIcon onClick={togglePasswordP} icon={passwordShownP  ? faEyeSlash : faEye} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="text-red-700">{errors.passwordAgain && errors.passwordAgain.message}</div>
            </div>
          </div>
          <div className="grid grid-rows-2 place-content-center mt-5">
            <span>

              <button type="submit" className="w-full text-center py-3 rounded bg-yellow-400 border border-gray-700 text-black bg-yellow-300 hover:bg-yellow-500 focus:outline-none">
              {t('welcome.Register')}
              </button>

            </span>
            <div className="text-gray-700 mt-6 text-center">
              {t('welcome.text1')}
            <a
              className="no-underline border-b border-blue-500
                            hover:border-blue-700 text-blue-500 hover:text-blue-700 ml-2"
              href="/"
            >
              {t('welcome.logIn')}
            </a>
          </div>
          <div className="text-gray-700 mt-6 text-center">
              {t('welcome.text6')}
            <a
              className="no-underline border-b border-blue-500
                            hover:border-blue-700 text-blue-500 hover:text-blue-700 ml-2"
              href="/addRes"
            >
              {t('welcome.add')}
            </a>
          </div>
          </div>
        </form>
        </div>
      </div>
    </div>
    </Suspense>
  )
}
