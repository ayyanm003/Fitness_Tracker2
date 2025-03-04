import axios from 'axios';
import React, { useState } from 'react'

const Usercontect = () => {


  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

    const handel = ()=>{
      const adddata = axios.post("http://localhost:3005/usercontect/contact",
        {name, email, message} ,{
          header:{
            "Content-Type":"application/json"
          }
        });
        alert("Successful")
    }

  return (
    <>
      <section className="contact-form section">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <div className="section-title">
          <div className="divider mb-3"></div>
          <h2>Contact Us</h2>
          <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In error reprehenderit
            quam enim obcaecati, repudiandae officia a cumque nemo provident!</p>
        </div>
      </div>
    </div>

    <div className="row justify-content-center pb-5">
      <div className="col-lg-9 text-center">
        <form id="contact-form" onSubmit={handel} >
          <div className="form-row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <input name="user_name" type="text" className="form-control" placeholder="Your Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <input name="user_email" type="text" className="form-control" placeholder="Email Address" value={email} onChange={(e)=>{setemail(e.target.value)}}  />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-group-2">
                <textarea name="user_message" className="form-control" rows="8" placeholder="Your Message" value={message} onChange={(e)=>{setmessage(e.target.value)}} ></textarea>
              </div>

              <div className="text-center">
                <button className="btn btn-main mt-3 " type="submit">Send Message</button>
              </div>
            </div>
          </div>
          <div className="error" id="error">Sorry Msg dose not sent</div>
          <div className="success" id="success">Message Sent</div>
        </form>
      </div>
    </div>
  </div>

  <div className="google-map position-relative mt-5">
    <div className="map" id="map_canvas" data-latitude="51.507351" data-longitude="-0.127758"
      data-marker="images/marker.png"></div>
  </div>

  <div className="container mt--170">
    <div className="row">
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <div className="card rounded-0 border-0 shadow-sm text-center py-5 px-4 contact-info">
          <i className="ti-mobile mb-3 text-lg text-color"></i>
          <span>Call us</span>
          <p className="lead text-black mb-0 mt-3">+23 45 67890</p>
          <p className="lead">9:00 am - 17:00 pm</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <div className="card rounded-0 border-0 shadow-sm text-center py-5 px-4 contact-info">
          <i className="ti-email mb-3 text-lg text-color"></i>
          <span>Email at</span>
          <p className="lead text-black mt-3 mb-0">support@themefisher.com</p>
          <p className="lead text-black ">support@gymfit.com</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <div className="card rounded-0 border-0 shadow-sm text-center py-5 px-4 contact-info">
          <i className="ti-home mb-3 text-lg text-color"></i>
          <span>Location</span>
          <p className="lead text-black mt-3">Fitness Center Bedford Heights,North London, USA</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Usercontect
