pragma solidity >= 0.0.7 < 0.9.0 ;

contract ChatApp{
    struct user{
        string name;
        friend[] friendList;

    }
    struct friend{
        address publicKey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
    mapping(address => user)userList;
    mapping(bytes32 => message[]) allMessages;
    function checkUserExits(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }
    function createAccount(string calldata name)external{
        require(checkUserExits(msg.sender) == false ,'user exist');
    }

}