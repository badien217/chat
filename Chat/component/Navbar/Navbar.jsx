import React from 'react'
import Style from "./Navbar.module.css";
import { ChatAppContext } from '../../context/ChatAppContext';
import {Model ,Error} from  "../index"

const Navbar = () => {
    const menuItems = [
        {
            menu : "All Users",
            link : "alluser"
        },
        {
            menu : "Chat",
            link :"/"
        },
        {
            menu : "Contract",
            link : "/"
        },
        {
            menu : "Setting",
            link : "/"
        },
        {
            menu : "faqs",
            link : "/"
        },
    ]
    return
     <div className={Style.Navbar}>
        <div className = {Style.Navbar_box}></div>
    </div>
}
export default Navbar