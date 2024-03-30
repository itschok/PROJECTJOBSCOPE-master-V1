import React from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import Pmiddle from "../component/Pmiddle";
import InfoOne from "../component/Infoone";
import CTA from "../component/CTA";
import Search from "../component/Search";
function Home(){
    return(
    <>
    <Nav/>
    <Pmiddle/>
    <Search/>
    <InfoOne/>
    <CTA/>
    <Footer/>
    </>
)}
export default Home