pragma solidity ^0.4.4;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    function mul(uint256 a, uint256 b) internal constant returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal constant returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal constant returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal constant returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Doneth {
    using SafeMath for uint256;  

    address founder;
    string name;
    uint256 totalShares;
    bool incrementShares;
    uint256 incrementInterval;

    mapping(address => Member) members;
    address[] public memberKeys;

    struct Member {
        bool exists;
        bool active;
        bool admin;
        uint256 shares;
        uint256 withdrawn;
    }

    function Doneth(string _name) {
        name = _name;
        founder = msg.sender;
        addMember(msg.sender, 1, true);
    }

    event Deposit(address from, uint value);
    event Withdraw(address from, uint value);
    event AddShare(address who, uint256 shares);
    event RemoveShare(address who, uint256 shares);

    // Default to deposit?
    function () public payable {
        Deposit(msg.sender, msg.value);
    }

    modifier onlyAdmin() { 
        if (msg.sender != founder && !members[msg.sender].admin) revert();   
        _;
    }

    modifier onlyExisting(address who) { 
        if (!members[who].exists) revert(); 
        _;
    }

    function addMember(address who, uint256 shares, bool admin) public onlyAdmin() {
        Member memory newMember;
        newMember.exists = true;
        newMember.admin = admin;
        newMember.active = true;
        members[who] = newMember;
        addShare(who, shares);
    }


    function addShare(address who, uint256 amount) public onlyAdmin() onlyExisting(who) {
        totalShares.add(amount);
        members[who].shares.add(amount);
        AddShare(who, amount);
    }

    function removeShare(address who, uint256 amount) public onlyAdmin() onlyExisting(who) {
        totalShares.sub(amount);
        members[who].shares.sub(amount);
        RemoveShare(who, amount);
    }

    function withdraw(uint256 amount) public onlyExisting(msg.sender) {
        uint256 owed = amountOwed(msg.sender);
        if (amount > owed.sub(members[msg.sender].withdrawn)) revert();
        members[msg.sender].withdrawn.add(amount);
        msg.sender.transfer(amount);
        Withdraw(msg.sender, amount);
    }

    // Converting from shares to Eth
    // 100 shares, 1000 total shares 
    // 100 Eth / 1000 total shares = 1/10 eth per share * 100 shares = 10 Eth to cash out
    function amountOwed(address who) public onlyExisting(who) returns (uint256) {
        uint256 ethPerShare = this.balance.div(totalShares); 
        return ethPerShare.mul(members[who].shares);
    }
}
