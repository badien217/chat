import React from "react";
import { ChatAppProvider } from "../context/ChatAppContext";
import {NavBar} from "../component/index"
const Myapp = ({Component, pageProps}) => {
    <div>
        <ChatAppProvider>
            <NavBar></NavBar>
            <Component {...pageProps}/>
        </ChatAppProvider>
    </div>
}
export default Myapp