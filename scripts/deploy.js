const hre = require("hardhat")

async function main(){
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApps = await ChatApp.deploy();
    console.log(`Address count: ${chatApps.address}`)

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
} )
