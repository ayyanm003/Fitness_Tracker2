import React from 'react'

const Gallery = () => {
    return (
        <>
            <section className="gallery">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="section-title">
                                <div className="divider mb-3"></div>
                                <h2>Our gallery</h2>
                                <p>We offer more than 35 group exercis, aerobic classes each week.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <div className="row no-gutters portfolio-gallery">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-01.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-01.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-02.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-02.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-03.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-03.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-04.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-04.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-05.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-05.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-06.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-06.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-07.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-07.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <a href="images/gallery/gallery-08.jpg" className="popup-gallery">
                                <img src="assets/images/gallery/gallery-08.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery
