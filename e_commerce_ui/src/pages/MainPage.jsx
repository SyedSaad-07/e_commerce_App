import React from 'react'
import { useState } from 'react'
import LoginPage from './SignUp'
import SignUp from './LoginPage'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const MainPage = (props) => {

  const [IsSignUp, setChange] = useState(false)
  const [IsLogin, setLogin] = useState(false)
  return (
    <>
    {
      IsSignUp && <SignUp/>
    }
    {
    ((!IsSignUp || IsLogin) || (!IsLogin || IsSignUp) && (props.success)) &&
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
            <a href="https://flowbite.com" className="flex items-center">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Let's Shop</span>
            </a>
            <div className="flex items-center">
              <Link to={"/customer/signup"}>
                <a type='button' href="#" onClick={(e) => { setLogin(!IsLogin)
                setChange(false)}} class="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Sign up</a>
                </Link>
                <Link to={"/customer/login"}>
                <a type='button' onClick={(e) => { setChange(!IsSignUp)
                setLogin(false)}} href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                </Link>
            </div>
        </div>
    </nav>
    }
    {
    IsLogin && <LoginPage/>
    }
  </>
  )
}

export default MainPage