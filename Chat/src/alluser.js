import React,{useStage,useEffect,useContext} from "react";
import {UserCard} from "../component/index"
import { ChatAppContext } from "../context/ChatAppContext";
import {Style} from "./alluset.module.css"

const alluser=()=>{
    const {userList,addFriends} = useContext(ChatAppContext)
    return(
        <div>
        <div className={Style.userall_info}>
            <h1>Find your name</h1>
        </div>
        <div className ={Style.alluser}>
            {userList.map((el,i) => (
                <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
            ))}

        </div>
        </div>
    );
};
export default alluser