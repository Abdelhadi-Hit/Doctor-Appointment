import React from "react";
import "./about.css"




const About = () => {
    return( <section id="about" class="about">
    <div class="container-fluid">

      <div class="row">
        <div class="col-xl-5 col-lg-6 image-box d-flex justify-content-center align-items-stretch position-relative">
          
        </div>

        <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
           <h3>Welcome to our Doctor Appointment App</h3>
           <p id="introduction">Our mission is to provide you with the best healthcare experience possible. With our user-friendly interface, scheduling appointments with your preferred healthcare provider has never been easier. Our team of experienced healthcare professionals is dedicated to ensuring your health and well-being. Whether you're looking for a routine check-up or seeking specialized care, we've got you covered. Book your appointment today and experience the convenience of our doctor appointment app!</p>

           <div class="icon-box">
             <div class="icon"><i class="bx bx-fingerprint"></i></div>
              <h4 class="title"><a href="">Book an Appointment</a></h4>
               <p className="description">Easily schedule appointments with your preferred healthcare provider.</p>
           </div>

           <div class="icon-box">
             <div class="icon"><i class="bx bx-gift"></i></div>
              <h4 class="title"><a href="/search">Healthcare Providers</a></h4>
               <p className="description">Choose from our team of experienced healthcare professionals.</p>
             </div>

            <div class="icon-box">
              <div class="icon"><i class="bx bx-atom"></i></div>
               <h4 class="title"><a href="">Specialized Care</a></h4>
                <p className="description">Find specialized care to meet your unique healthcare needs.</p>
            </div>

        </div>
      </div>

    </div>
  </section>)
}

export default About