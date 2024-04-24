import React, { useContext, useState } from 'react'
import Style from "./Navbar.module.css";
import { ChatAppContext } from '../../context/ChatAppContext';
import {Model ,Error} from  "../index"
import Image from 'next/image';
import Link from 'next/link';
import images from "../../assets"




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
    const [active, setActive] = useState(2);
    const [open,setOpen] = useState(false);
    const [openModel,setOpenModel] = useState(false);
    const {account , userName,connectWallet} = useContext(ChatAppContext)

    return(
     <div className={Style.Navbar}>
        <div className = {Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt ="logo" width={50} height={50}/>
        </div>
        <div className={Style.Navbar_box_right}>
            {/*dektop*/}
          <div className={Style.Navbar_box_right_menu}>
            {menuItems.map((el,i) => (
              <div onClick={() => setActive(i+1) } key = {i+ 1} className={`${Style.Navbar_box_right_menu_items} ${active == i +1 ?
              Style.active_btn :"" }`}>
                <Link className={Style.Navbar_box_right_menu_items_link} href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
            {/* mobile*/}
            {!open && (
                <div className={Style.Mobile_box_right_menu}>
            {menuItems.map((el,i) => (
              <div onClick={() => setActive(i+1) } key = {i+ 1} className={`${Style.Mobile_box_right_menu_items} ${active == i +1 ?
              Style.active_btn :"" }`}>
                <Link className={Style.Mobile_box_right_menu_items_link} href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
            <P className = {Style.Moble_menu_btn}></P>
            <Image src = {images.close} alt="close" width = {50} height ={50} onClick={() => setOpen(false)}></Image>
          </div>
            ) }
            {/* connect wallet */}
            <div className = {Style.Navbar_box_right_connect}>
              {account == ""? (
                <button onClick ={() => connectWallet()}>
                    {" "}
                    <span>Connect Wallet</span>
                </button>
              ):(
                <button onClick = {() => setOpenModel(true)}>
                    {" "}
                    <Image src={userName ? images.accountName : images.creat2} alt="Account Image" width={20} height={20}/>
                    {" "}
                    <small>{userName || "create account"}</small>
                </button>
              )
              }   
            </div>
            <div className={Style.Navbar_box_right_open} onClick={() => setOpen(true)}>
                <Image src={images.open} alt="open" width={30} height={30} />

            </div>
        </div>
        </div>
    </div>
);
}
export default Navbar