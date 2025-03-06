import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/user/Navbar';
import Introduction from './component/user/Introduction';
import About from './component/user/About';
import Services from './component/user/Services';
import Gallery from './component/user/Gallery';
import Footer from './component/user/Footer';
import User from './component/outlet/User';
import Signup from './component/Signup';
import Signin from './component/Signin';
import Slider from './component/user/Slider';
import Sidebar from './admin/component/Sidebar';
import Deshboard from './admin/page/Deshboard';
import Usercontect from './component/user/Usercontect';
import Addworkout from './admin/component/Addworkout';
import Showcontect from './admin/component/Showcontect';
import Showuser from './admin/component/Showuser';
import Pagedeshboard from './admin/component/Pagedeshboard';




function App() {
  return (
    <div className="App">

      {/* <User/> */}
      {/* <Signup/> */}
      {/* <Signin/> */}


      {/* <Deshboard /> */}

      <BrowserRouter>
        <Routes>
          {/* ------------ user ------- */}
          <Route path='/' element={<User />} />
          <Route path='/usercontect' element={<Usercontect />} />
          {/* <Route path='/admindeshboard' element={<Deshboard/>} />  */}

          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          {/* admin outlet  */}
          <Route path='/admindeshboard' element={<Deshboard />}>
            <Route index element={<Pagedeshboard />} />
            <Route path='addworkout' element={<Addworkout />} />
            <Route path='showcontect' element={<Showcontect />} />
            <Route path='showuser' element={<Showuser />} />


          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;