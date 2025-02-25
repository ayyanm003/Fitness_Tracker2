import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/user/Navbar';
import Slider from './component/user/Slider';
import Introduction from './component/user/Introduction';
import About from './component/user/About';
import Services from './component/user/Services';
import Gallery from './component/user/Gallery';
import Footer from './component/user/Footer';
import User from './component/outlet/User';
import Signup from './component/Signup';
import Signin from './component/Signin';



function App() {
  return (
    <div className="App">

    {/* <User/> */}
    {/* <Signup/> */}
    <Signin/>
    </div>
  )
}

export default App;