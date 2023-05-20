import React, { Component } from "react";
import About from "../About/about";
import Footer from "../Footer/footer";
import Header from "../Header1/header";
import Hero from "../Hero1/hero";




export default class Home extends Component{
    render(){

        return(<>
        
        <Header/>
        <br></br>
        <br></br>
        <Hero/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <About/>
        <br></br>
        <Footer/>
        </>)
    }
}