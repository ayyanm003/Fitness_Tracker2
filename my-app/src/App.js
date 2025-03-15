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
import Userpanel from './component/outlet/Userpanel';
import Updeshboard from './component/userpanel/Updeshboard';
import Upprofile from './component/userpanel/Upprofile';
import Upaddworkout from './component/userpanel/Upaddworkout';
import Upshowworkout from './component/userpanel/Upshowworkout';
import Upnutrition from './component/userpanel/Upnutrition';
import Upnutritionshow from './component/userpanel/Upnutritionshow';
import Upadded from './component/userpanel/Upadded';




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

          {/* User panel  */}
          <Route path="/userpanel" element={<Userpanel/>}> 
            <Route path='updeshboard' element={<Updeshboard/>} />
            <Route path='upprofile' element={<Upprofile />} />
            <Route path='upaddworkout' element={<Upaddworkout />} />
            <Route path='upshowworkout' element={<Upshowworkout />} />
            <Route path='Upnutrition' element={<Upnutrition/>} />
            <Route path='Upnutritionshow' element={<Upnutritionshow/>} />
            <Route path='upadded' element={<Upadded/>} />

          </Route>
          {/* <Route path='/userpanel' element={<Userpanel/>} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;