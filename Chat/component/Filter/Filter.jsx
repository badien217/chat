import React,{ useContext, useState } from 'react'
import Image from 'next/image'
import Style from './Filter.module.css'
import images from "../../assets"
import { ChatAppContext } from '../../context/ChatAppContext'
import {Model} from "../index"
const Filter = () => {
    const {account,addFriend} = useContext(ChatAppContext)
    const [addFriends,setAddFriend] = useState(false);
    
    return(
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image src={images.search} alt="image" width={20} height={20}/>
                        <input type="text" placeholder="search.." />
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button onClick={()=> setAddFriend(true)}>
                        <Image src={images.user} alt="clear" width={20} height={20}/> 
                        Add Friend
                    </button>
                </div>

            </div>
            {addFriend && (
                <div className ={Style.Filter_model}>
                    <Model
                    openBox={setAddFriend}
                    title="Welcome to"
                    head="Chat"
                    info="hello"
                    smallInfo="Select your friend name && address"
                    image={images.hero}
                    functionName={addFriend}
                    ></Model>

                </div>
            )}
        </div>
    )

    
}
export default Filter