import React,{useState,useEffect, Children} from "react";
import { useRouter } from "next/router";

import { CheckIfwallerConnect,connecWallet,connectingwithContract } from "../utils/apiFeature";
export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({children}) => {
    const title = " welcome";
    return (
        <ChatAppContext.Provider value={ {title}}>
            {children}
        </ChatAppContext.Provider>
    )
}