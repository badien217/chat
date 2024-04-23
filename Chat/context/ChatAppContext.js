import React,{useState,useEffect, Children} from "react";
import { useRouter } from "next/router";

import { CheckIfwallerConnect,connecWallet,connectingwithContract } from "../utils/apiFeature";
export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({children}) => {
    const title = " welcome";
    const [account,setAccount] = useState("");
    const [userName,setUserName] = useState("");
    const [friendList,setFriendList] = useState("")
    const [friendMsg,setFriendMsg] = useState("")
    const [loading,setLoading] = useState("")
    const [userList,setUserList] = useState("")
    const [error,setError] = useState("")


    const [currentUserName,setCurrentUserName] = useState("")
    const [currentUserAddress,setCurrentUserAddress] = useState("")

    const router = useRouter();
    const fetchData = async() => {
        try{
            const contract = await connectingwithContract();
            const connectAccount = await connecWallet();
            setAccount(connectAccount);
            const userName = await contract.getUsername(connectAccount);
            setAccount(userName);
            const friendList = await contract._getMyFriendList();
            setFriendList(friendList);
            const userList = await contract.getAllAppUser();
            setUserList(userList);

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=> {
        fetchData();
    },[])
    const readMessage = async(friendAddress)=>{
        try{
            const contract = await connectingwithContract();
            const read = await contract.realMessage(friendAddress);
            setFriendMsg(read)
        }catch(error){
            setError("currently you have no message")
        }
    }
    const createAccount = async ({name,accountAddress})=> {
        try{
            if(name || accountAddress){
                return setError("name or address empty");
               
            } const contract = await connectingwithContract();
                const getCreateUser = await contract.createAccount(name);
                setLoading(true)
                await getCreateUser.wait();
                setLoading(false);
                window.loading.reload();


        }catch(error){
            setError("error while creating your account")
        }
    }
    const addFriends = async({name,accountAddress})=>{
        try{
            if(name || accountAddress) return setError("please provide name and accountAddress");
            const contract = await connectingwithContract();
            const addMyFriend = await contract._addFriend(accountAddress,name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        }catch(error){
            setError(error)
        }
    }
    const sendMessage = async({ msg,address})=>{
        try{
            if(msg || address) return setError("please checking message");
            const contract = await connectingwithContract();
            const addMessage = await contract.sendMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
            
        }catch(error){
            setError(error)
        }
    }   
    const readuser = async (userAddress)=>{
        const contract = await connectingwithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress)
    }
    return (
        <ChatAppContext.Provider value={ {readMessage,sendMessage,createAccount,addFriends,readuser,account,userName,friendList,friendMsg,loading,userList,error,currentUserName,currentUserAddress}}>
            {children}
        </ChatAppContext.Provider>
    )
}