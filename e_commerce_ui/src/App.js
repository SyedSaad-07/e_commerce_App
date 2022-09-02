// import logo from './logo.svg';
import './App.css';
import ChoiceToContinue from './pages/ChoiceToContinue';
import MainPage from './pages/MainPage';
// import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
// import {Switch, Route} from "react-router";
import LoginPage from './pages/LoginPage';
import {Header, MainContainer, CreateContainer} from './pages';
// import Header from './pages/Header';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

function App() {
    
  return (
    <div className="App">
      {/* <LoginPage/> */}
      <ChoiceToContinue />    
    </div>
  );

  // return (
  //   <AnimatePresence exitBeforeEnter>
  //     <div className="w-screen h-auto flex flex-col bg-primary">
  //       {/* <ChoiceToContinue/> */}
  //       <Header />

  //       <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
  //         <Routes>
  //           <Route path="/*" element={<MainContainer />} />
  //           <Route path="/createItem" element={<CreateContainer />} />
  //         </Routes>
  //       </main>
  //     </div>
  //   </AnimatePresence>
  // );
}

export default App;