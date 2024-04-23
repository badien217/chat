import { ethers, toNumber } from "ethers";
import Web3Model from "web3modal";
import { ChatAppAddress,ChatAppABI } from "../context/constant";
export const CheckIfwallerConnect = async ()  => {
    try {
        if(!window.ethreum) return console.log("Install MetaMask");
        const account = await window.ethereum.request({
            method : "eth_account",
        });
        const firstAccount = account[0];
    }catch(error){
        console.log(error)
    }
};
export const connecWallet  = async () =>{
    try {
        if(!window.ethreum) return console.log("Install MetaMask");
        const account = await window.ethereum.request({
            method : "eth_account",
        });
        const firstAccount = account[0];
        return firstAccount;
    }catch(error){
        console.log(error)
    }
}
const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppABI,ChatAppAddress,signerOrProvider);
export const connectingwithContract = async () => {
try{
    const web3modal = new Web3Model();
    const connect = await web3modal.connect();
    const provide = new ethers.BrowserProvider(connect);
    const signer = provide.getSigner();
    const contract = fetchContract(signer);
    return contract;
}catch(error){
    console.log(error)
}
}
export const converTime = (times) =>{
    const newTime = new Date(toNumber(times));
    const realTime = newTime.getHours() + "/" + newTime.getMinutes() +"/" + "  Date:" + newTime.getDate() +
    "/"+ (newTime.getMonth + 1) + "/" + newTime.getFullYear();
    return realTime;
}