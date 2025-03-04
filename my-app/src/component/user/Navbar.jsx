import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navigation fixed-top" id="navbar">
	<div className="container-fluid">
		<a className="navbar-brand" href="index.html">
			<h2 className="text-white text-capitalize"><i/>Gym<span className="text-color">Fit</span></h2>
		</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsid"
			aria-controls="navbarsid" aria-expanded="false" aria-label="Toggle navigation">
			<span className="ti-view-list"></span>
		</button>
		<div className="collapse text-center navbar-collapse" id="navbarsid">
			<ul className="navbar-nav mx-auto">
				<li className="nav-item active">
					<a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
				</li>
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">Pages.</a>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="about.html">About</a></li>
						<li><a className="dropdown-item" href="trainer.html">Trainer</a></li>
						<li><a className="dropdown-item" href="course.html">Courses</a></li>
					</ul>
				</li>
				<li className="nav-item"><a className="nav-link" href="service.html">Services</a></li>
				<li className="nav-item"><a className="nav-link" href="pricing.html">Memebership</a></li>
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">Blog.</a>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="blog.html">Blog Grid</a></li>
						<li><a className="dropdown-item" href="blog-sidebar.html">Blog Sidebar</a></li>
						<li><a className="dropdown-item" href="blog-single.html">Blog Details</a></li>
					</ul>
				</li>
				<li className="nav-item"><a className="nav-link" href="/usercontect">Contact</a></li>
			</ul>
			<div className="my-md-0 ml-lg-4 mt-4 mt-lg-0 ml-auto text-lg-right mb-3 mb-lg-0">
				<a href="tel:+23-345-67890">
					<h3 className="text-color mb-0"><i className="ti-mobile mr-2"></i>+23-563-5688</h3>
				</a>
			</div>
		</div>
	</div>
</nav> 
    </>
  )
}

export default Navbar
