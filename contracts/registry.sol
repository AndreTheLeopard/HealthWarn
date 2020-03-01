/*

Copyright Daniel Iwo, 2020
*/


pragma solidity ^0.5.8;

contract Owned{
	address public owner;
	address public newOwner;
	
	event OwnershipTransferred(address indexed _from, address indexed _to);
	
	constructor() public{
		owner=msg.sender;	
	}
	modifier onlyOwner{
		require(msg.sender==owner);
		_;	
	}
	function transferOwnership(address _newOwner) public onlyOwner
	{
		newOwner=_newOwner;	
	}
	function acceptOwnership() public{
		require(msg.sender==newOwner);
		emit OwnershipTransferred(owner,newOwner);
		owner=newOwner;
		newOwner=address(0);	
	}

}

contract GroupOwned is Owned{
    
    event GroupTransferred(address indexed from,address indexed to);
    
    //0 for not in , integers count the increasing priority in the group 
    mapping(bytes => mapping(address => int8)) public groups;
    
    modifier onlySuperior(bytes memory gname,address subject){
        require((groups[gname][msg.sender]>groups[gname][subject])||(msg.sender==owner));
        _;
    }
    
    modifier onlyGroup(bytes memory gname,int8 level)
    {
        require(groups[gname][msg.sender]>=level);
        _;
    }
   
    function groupmod(bytes memory gname,address user,int8 priority) internal returns(bool)
    {
        groups[gname][user]=priority;
        return true;
    }

    function CGroupMod(bytes memory gname, address user,int8 priority) public onlySuperior(gname,user) returns(bool)
    {		  
		  require((groups[gname][msg.sender]>priority)||(msg.sender==owner));
        if(groupmod(gname,user,priority))
        {
            return true;
        }
        return false;
    }  
 }
 
contract Child is Owned,GroupOwned
{
	address public root;
	
	function setRoot(address newroot) public onlyGroup('child_manage',2) returns(bool)
	{
		root=newroot;
		return true;	
	}
} 

//owned groupowned
contract Registry is Owned,GroupOwned,Child
{
	string public locale;
	string public focus;
	
	uint public severity_level;
	
	//mapping(uint=>)
	uint public casecount;	
	
	mapping(uint=>address) public entities;
	
	event NewCase(uint indexed longitude,uint indexed latitude,uint indexed time,bytes data,address et);
	event RequestSupport(uint indexed longitude,uint indexed latitude,string  indexed asset,uint amount,address et);
	event SeverityLevel(uint indexed level,address indexed et);
	event Message(string indexed message,address indexed et);
	event EntitySet(uint indexed ind,address indexed et);

	constructor() public
	{
		owner=msg.sender;
		groupmod('manage',owner,1);
		groupmod('sentinel',owner,1);
	}

	//only new
	function newCase(uint long,uint lat,uint time,bytes memory data) public onlyGroup('sentinel',1) returns(bool)
	{
		emit NewCase(long,lat,time,data,msg.sender);
		return true;
	}

	function requestSupport(uint longitude,uint latitude,string memory asset,uint amount) public onlyGroup('sentinel',1) returns(bool)
	{
		emit RequestSupport(longitude,latitude,asset,amount,msg.sender);
		return true;
	}

	function severityLevel(uint level) public onlyGroup('sentinel',1) returns(bool)
	{
		severity_level=level;
		emit SeverityLevel(level,msg.sender);
		return true;
	}

	function message(string memory _msg) public onlyGroup('sentinel',1) returns(bool)
	{
		emit Message(_msg,msg.sender);
		return true;
	}

	function setLocale(string memory _locale) public onlyGroup('manage',1) returns(bool)
	{
		locale=_locale;
		return true;
	}

	function setFocus(string memory _focus) public onlyGroup('manage',1) returns(bool)
	{
		focus=_focus;
		return true;
	}

	function setEntity(uint ind,address et) public onlyGroup('manage',1) returns(bool)
	{
		entities[ind]=et;
		emit EntitySet(ind,et);
		return true;
	}


}

