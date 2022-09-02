import React from 'react'
// import "flowbite" 
// import {Card} from "flowbite"
import { useState } from 'react'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import Bg from '../assets/bg.jpg'
import { Link } from "react-router-dom";
import App from '../App'

const ChoiceToContinue = () => {

    const mystyle = {
        margin: "auto",
        textalign: "center",
        position: "absolute",
        top: "40%",
        left: "40%",
    }

  const [afterClick, setClick] = useState(false)
  const [choice,setChoice]=useState(true)
  return (
    
    <>
    {
        !choice && <MainPage/>
    }
    {
        choice && 
        <div className="extraStyle p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" style={mystyle}>
            <form className="space-y-6">
                <Link to={"/customer"}>
                <div>
                    <button type="button" onClick={(e) =>{ setClick(true)
                    setChoice(false)}} className="transParent w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue as a buyer</button>
                </div>
                </Link>
                <Link to={"/seller"}>
                <div>
                    <button type="button" onClick={(e) => {setClick(true) 
                setChoice(false)}} className="transParent w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue as a seller</button>
                </div>
                </Link>
            </form>
        </div>
    }
    </>
  )
}

export default ChoiceToContinue