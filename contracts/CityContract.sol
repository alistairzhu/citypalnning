pragma solidity ^0.4.18;

import "./WonderToken.sol";
import "./ConvertLib.sol"; //Zhu

contract CityContract is WonderToken{

  struct WonderStruct {
    address addr;
    uint256 id;
    bytes32 field_1;
    bytes32 field_2;
    bytes32 field_3;
    bytes32 field_4;
    bytes32 field_5;
  }

    WonderStruct[] public WonderStructArray;
    WonderStruct public wonder;

    mapping (address => WonderStruct) wonders;
    mapping (address => uint) balances; // Zhu

    address[] public wonderAddressArray;

    uint256 public wonderID =0 ;

    event wonderInfo(
      address addr,
      uint256 id,
      bytes32 field_1,
      bytes32 field_2,
      bytes32 field_3,
      bytes32 field_4,
      bytes32 field_5
    ) ;

    event Transfer(address indexed _from, address indexed _to, uint256 _value); // Zhu

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {  //Zhu
      if (balances[msg.sender] < amount) return false;
      balances[msg.sender] -= amount;
      balances[receiver] += amount;
      Transfer(msg.sender, receiver, amount);
      return true;
    }

    function CityContract() WonderToken(21000000,"WonderCoin","WDR") payable public {
        owner = msg.sender;
    }

    function setWonderStruct(address _address, bytes32 _field_1, bytes32 _field_2, bytes32 _field_3, bytes32 _field_4, bytes32 _field_5) public {

        wonder = wonders[_address];
        wonderID += 1;
        wonder.addr = _address;
        wonder.id = wonderID;

        wonder.field_1 = _field_1;
        wonder.field_2 = _field_2;
        wonder.field_3 = _field_3;
        wonder.field_4 = _field_4;
        wonder.field_5 = _field_5;

        wonderAddressArray.push(_address) -1;

        WonderStructArray.push(wonder) -1;
        wonderInfo(_address,wonderID, _field_1, _field_2, _field_3, _field_4, _field_5) ;

    }

    function getWonderStructs() view public returns (address[]) {
            return (wonderAddressArray);
    }

    function getWonderStructByID(uint256 i) view public returns (address, uint256 , bytes32 , bytes32 , bytes32) {
      return (WonderStructArray[i].addr,WonderStructArray[i].id, WonderStructArray[i].field_4, WonderStructArray[i].field_1, WonderStructArray[i].field_2);
    }

    function getWonderStructByAddress(uint256 i, address ins) view public returns (address, uint256 , bytes32 , bytes32 , bytes32) {

        if (ins == WonderStructArray[i].addr){
            return (WonderStructArray[i].addr,WonderStructArray[i].id, WonderStructArray[i].field_4, WonderStructArray[i].field_1, WonderStructArray[i].field_2);
        }

    }


    function getlastWonderStruct() view public returns (address, uint256 , bytes32 , bytes32 , bytes32, bytes32, bytes32) {
            return (wonder.addr,wonder.id,wonder.field_1,wonder.field_2,wonder.field_3,wonder.field_4,wonder.field_5  );
    }

    function countWonderStructs() view public returns (uint256) {
        return wonderAddressArray.length;
    }

}
