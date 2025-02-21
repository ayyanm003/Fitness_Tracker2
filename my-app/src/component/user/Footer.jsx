import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer bg-black-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <h2 className="text-white mb-4">GymFit</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus illo ad quo sunt maiores, sint nostrum omnis eaque cumque dolorum.</p>

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>


                        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                            <div className="footer-widget recent-blog">
                                <h4 className="mb-4 text-white letter-spacing text-uppercase">Recents Posts</h4>
                                <div>
                                    <a href="blog-single.html" className="text-white">Claritas est etiam processus dynamicus</a>
                                    <p className="text-sm mt-2 text-white-50">30 february 2019</p>
                                </div>
                                <div className="mt-4">
                                    <a href="blog-single.html" className="text-white">Claritas est etiam processus dynamicus</a>
                                    <p className="text-sm mt-2 text-white-50">30 february 2019</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-2 col-md-5 mb-5 mb-lg-0">
                            <div className="footer-widget">
                                <h4 className="mb-4 text-white letter-spacing text-uppercase">Quick Links</h4>
                                <ul className="list-unstyled footer-menu lh-40 mb-0">
                                    <li><a href="about.html"><i className="ti-angle-double-right mr-2"></i>About Us</a></li>
                                    <li><a href="service.html"><i className="ti-angle-double-right mr-2"></i>Services</a></li>
                                    <li><a href="pricing.html"><i className="ti-angle-double-right mr-2"></i>Membership</a></li>
                                    <li><a href="course.html"><i className="ti-angle-double-right mr-2"></i>Courses</a></li>
                                    <li><a href="contact.html"><i className="ti-angle-double-right mr-2"></i>Contact us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-5">
                            <div className="footer-widget">
                                <h4 className="mb-4 text-white letter-spacing text-uppercase">Home location</h4>
                                <p>Washington 6036 Richmond
                                    hwy., Alexandria, VA USA 22303 </p>
                                <span className="text-white">+1 (409) 987–5874</span>
                                <span className="text-white">info@demolink.org</span>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mt-5 px-3 bg-black mx-1">
                        <div className="col-lg-4">
                            <p className="text-white mt-3">Gymfit © 2019 , Theme By <a href="https://themefisher.com/" className="text-color">Themefisher.com</a></p>
                        </div>
                        <div className="col-lg-6 ml-auto text-right">
                            <ul className="list-inline mb-0 footer-socials">
                                <li className="list-inline-item"><a href="https://www.facebook.com/themefisher"><i className="ti-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="https://twitter.com/themefisher"><i className="ti-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="https://github.com/themefisher/"><i className="ti-github"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
