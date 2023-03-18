// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Complaints {
  
  address payable public user; 
  address public owner;

  mapping(address=>string[]) complaints;
  mapping(string=>string[]) receivedComplaints;

  event ComplaintCreated(address _user, string url);
  event RewardUser(address payable _user, uint256 amount);
  
  constructor() {
        owner = msg.sender;
  }

  modifier onlyOwner  {
        require (msg.sender == owner);
        _;
    }

  function createComplaint(address _user,string memory url) external {
      complaints[_user].push(url);
      emit ComplaintCreated(_user , url);
  }

function receivedComplaint(string memory _name , string memory url) external {
      receivedComplaints[_name].push(url);
   
  }
 
  function displayComplaint(address _user) external view returns(string[] memory) {
      return complaints[_user];
  }

//   function createReplies(string memory url) external onlyOwner{
//       complaints[owner].push(url);
//       emit ComplaintCreated(owner , url);
//   }
 
//   function displayReplies() external view returns(string[] memory) {
//       return complaints[owner];
//   }


  function Reward(address payable _user) public payable onlyOwner {
        require(msg.value > 0, "Please pay greater than 0 ether");
        (bool success, ) = payable(_user).call{value: msg.value}(""); //transfer ether to seller
        require(success);
        emit RewardUser( _user, msg.value);
  }

  receive() external payable {}

  //Function to check the account balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}