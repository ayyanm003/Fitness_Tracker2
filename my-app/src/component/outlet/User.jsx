import React from 'react'
import Navbar from '../user/Navbar'
import Slider from '../user/Slider'
import Introduction from '../user/Introduction'
import About from '../user/About'
import Services from '../user/Services'
import Gallery from '../user/Gallery'
import Footer from '../user/Footer'

const User = () => {
    return (
        <>
            {/* <!-- Section Menu Start --> */}
            {/* <!-- Header Start --> */}

            <Navbar/>

            {/* <!-- Header Close --> */}

            <div class="main-wrapper ">
                {/* <!-- Section Menu End --> */}

                {/* <!-- Section Slider Start --> */}
                {/* <!-- Slider Start --> */}
                
                <Slider/>

                {/* <!-- Section Slider End --> */}
                {/* <!-- Section Intro Start --> */}
                
                <Introduction/>

                {/* <!-- Section Intro End --> */}

                {/* <!-- Section About start --> */}
                
                <About/>

                {/* <!-- Section About End --> */}

                {/* <!-- Section Services Start --> */}
                
                <Services/>

                {/* <!-- Section Services End --> */}

                {/* <!-- Section Gallery Start --> */}
                
                <Gallery/>

                {/* <!-- Section Gallery END --> */}

                {/* <!-- footer Start --> */}
                
                <Footer/>

                {/* <!-- Section Footer End --> */}
            </div>
        </>
    )
}

export default User
