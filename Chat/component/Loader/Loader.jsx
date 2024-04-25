import React from 'react'
import Image from "next/image"
import Style from "./loader.module.css"
import images from "../../assets"

const Loader = () => {
    return
    (
        <div classname={Style.Loader}>
            <div classname={Style.Loader_box}>
            <Image src ={images.Loader} alt ="loader" width={100} height={100}/>
            
            </div>
        </div>
    )
}
export default Loader