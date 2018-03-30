function checkAllBalances() {
  web3.eth.getAccounts(function(err, accounts) {
   accounts.forEach(function(from) {
    web3.eth.getBalance(from, function(err, balance) {
     console.log("" + from + ":\tbalance: " + web3.fromWei(balance, "ether") + " ether");
   });
  });
 });
};


function gasprice(from) {
  var gas = '21000';

  var gasPrice = eth.gasPrice ;
  var gasTotal = gasPrice.mul(gas);
  var ethergasTotal = web3.fromWei(gasTotal, "ether");
  var currentValue = eth.getBalance(from);
  var ethercurrentValue = web3.fromWei(currentValue, "ether");
  var transderValue = currentValue.sub(gasTotal);
  var ethertransderValue = web3.fromWei(transderValue, "ether");
          console.log("From Account:\033[32m"+ from + "\033[37m Balance:");
          console.log("  \033[32m"+ ethercurrentValue + "\033[37m  ether, Gas Price:\033[32m" + ethergasTotal + "\033[37m transfer Value: \033[32m"+ ethertransderValue + "\033[37m");
};

function sweep(from, to, speed, remain) {
//  var speed = 5;
  if (speed == null) {speed = 1};
  if (remain == null) {remain = 2};
  var gas = '21000';
  var gasPrice = eth.gasPrice.mul(speed);  ;
  var gasTotal = gasPrice.mul(gas);
  var ethergasTotal = web3.fromWei(gasTotal, "ether");
  var currentValue = eth.getBalance(from);
  var ethercurrentValue = web3.fromWei(currentValue, "ether");
  var transderValue = currentValue.sub(gasTotal);
  var ethertransderValue = web3.fromWei(transderValue, "ether");
  var ether1 = web3.toWei(remain);
  var transderValue1 = transderValue.sub(ether1);
  var ethertransderValue1 = web3.fromWei(transderValue1, "ether");
  if (ethertransderValue > remain) {
          //gasprice(from);
          console.log("From Account:\033[32m"+ from + "\033[37m Balance:");
//          console.log("From Account:"+ from + " Balance:");
          console.log("  \033[32m"+ ethercurrentValue + "\033[37m  ether, Gas Price:\033[32m" + ethergasTotal + "\033[37m transfer Value: \033[32m"+ ethertransderValue1 + "\033[37m");
  //        console.log("  "+ ethercurrentValue + "  ether, Gas Price:" + ethergasTotal + " transfer Value: "+ ethertransderValue1 );
          personal.unlockAccount(from);
          var result = eth.sendTransaction({
          from: from,
          to: to,
          gas: gas,
          gasPrice: gasPrice,
          value: transderValue1
        });
  }

};

function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    if (i % 1000 == 0) {
      console.log("Searching block " + i);
    }
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
          console.log("  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n"
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);
        }
      })
    }
  }
}
