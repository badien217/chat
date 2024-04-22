pragma solidity >= 0.0.7 < 0.9.0 ;

contract ChatApp{
    struct user{
        string name;
        friend[] friendList;

    }
    struct friend{
        address pubkey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }
    AllUserStruct[] GetAllUser;
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;
    function checkUserExits(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }
    function createAccount(string calldata name) external {
        require(checkUserExits(msg.sender) == false ,'user exist');
        require(bytes(name).length > 0, "User cannot empty");
        userList[msg.sender].name = name;
        GetAllUser.push(AllUserStruct(name,msg.sender));

    }
    function getUsername(address pubkey) external view returns (string memory){
        require(checkUserExits(pubkey), "user exist");
        return userList[pubkey].name;
    }
    function addMyFriend(address friendKey , string calldata name) external {
        require(checkUserExits(msg.sender), "Create account first ");
        require( checkUserExits(friendKey), "user is not register ");
        require(msg.sender != friendKey, "user cannot add themeselves as friend");
        require(checkAlreadyFriend(msg.sender, friendKey) == false , "these users are alreaddy friend");
        _addFriend(msg.sender, friendKey, name);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);

    }
    function checkAlreadyFriend(address pubkey1, address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length )
        {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }
        for(uint256 i = 0 ; i < userList[pubkey1].friendList.length; i ++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2)
              {
              return true ;
              }
              return false;
        }
    }
    function _addFriend(address me ,address friend_key ,string memory name ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);

    }
    function _getMyFriendList() external view returns(friend[] memory ){
        return userList[msg.sender].friendList;
    }
    function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));

        }else return keccak256(abi.encodePacked(pubkey1,pubkey2));
    }
    function sendMessage(address friendKey, string calldata _msg) external {
        require(checkUserExits(msg.sender), "create account first");
        require(checkUserExits(friendKey), "user is not register");
        require(checkAlreadyFriend(msg.sender, friendKey), "you are not friend with the given user");
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        message memory newMsg = message(msg.sender,block.timestamp, _msg);
        allMessages[chatCode].push(newMsg) ;
    }
    function readMessage(address friendKey ) external view returns (message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        return allMessages[chatCode];
    }
    function getAllAppUser() public view returns(AllUserStruct[] memory){
        return GetAllUser;
    }

}