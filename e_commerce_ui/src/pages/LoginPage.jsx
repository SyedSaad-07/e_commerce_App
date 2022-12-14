import React from 'react'
import { useRef, useEffect, useState, useContext } from "react";
import Header from './Header';
import MainPage from './MainPage';
import AuthContext from '../context/AuthProvider';
// import { useStateValue } from '../context/StateProvider';
// import { actionType } from '../context/reducer';

// import axios from '../api/axios';
import Axios from 'axios';
const LOGIN_URL = 'http://127.0.0.1:3333/customer/login';

const LoginPage = () => {

    const mystyle = {
        margin: "auto",
        textalign: "center",
        position: "absolute",
        top: "10%",
        left: "40%"
    }

    // const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // if(!user){
                const response = await Axios.post(LOGIN_URL,
                    JSON.stringify({email:email, password: pass}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
            // dispatch({
            //     type: actionType.SET_USER,
            //     user: JSON.stringify(response?.data)
            // })
            // localStorage.setItem("user", JSON.stringify(response?.data))
        // }else{
            // console.log("Hello World");
        // }
       
        // console.log(JSON.stringify(response?.data?.email))
        // console.log(JSON.stringify(response?.data?.password))
        // console.log(JSON.stringify(response?.data?.token?.token))
        // console.log(JSON.stringify(response?.data?.token))
        // console.log("Hello World");
        // console.log(JSON.stringify(response?.data))
        const accessToken = response?.data?.token?.token;

        setAuth({email, pass, accessToken});
        setEmail('');
        setPass('');
        setSuccess(true);
        }catch(e){
            if(!e?.response) {
                setErrMsg("Can't login");
            }else if(e.response?.status === 500){
                setErrMsg('Login Failed'); 
            }
        }
        console.log(email, pass);
        // errRef.current.focus();
    }

  return (

    <>
    {
        success ? (
            <MainPage success={success}/>,
            <Header/>            
        ) : 
    (
<div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" style={mystyle}>
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login to our platform</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required/>
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
            <input type="password" name="password" id="password" placeholder="????????????????????????" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            onChange = {(e) => setPass(e.target.value)}
            value={pass}
            required/>
        </div>
        {/* <div>
            <label for="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm your password</label>
            <input type="confirmpassword" name="confirmpassword" id="confirmpassword" placeholder="????????????????????????" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required=""/>
        </div>
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Upload file</label>
        <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
        </div> */}
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div> */}
    </form>
</div>
    )}
</>
    )
}

export default LoginPage