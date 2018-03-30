// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import contract artifacts and turn them into usable abstractions.
import CityContract_artifacts from '../../build/contracts/CityContract.json'
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// Usable abstractions, which be used through the code below.
var CityContract = contract(CityContract_artifacts);
var MetaCoin = contract(metacoin_artifacts);

// For application bootstrapping, check out window.addEventListener below.
var sellrate =1;
var buyrate =1;
var city =1;
var wprice =1;
var bprice =1;

var accounts;
var account;
var Coursetro;
var CityContractContract;


window.App = {
  start: function() {
    var self = this;
    // Bootstrap the CityContract abstraction for Use.
    CityContract.setProvider(web3.currentProvider);

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account  and set defaultAccount
    web3.eth.getAccounts(function(err, accs) {

      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      web3.eth.defaultAccount = account;
      self.clearAll();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("insTrans");
    status.innerHTML = message;
    console.log(message);
  },


  receiveContract: function() {
    var self = this;
    $("#loader").show();
    var cert;
    CityContract.deployed().then(function(instance) {
      cert = instance;
      return cert.getlastWonderStruct({from: account});
    }).then(function(result){
        if(result)
            {
              $("#titleName").html("Resident Home");
              $("#instructor").html("You have a notice from urban planning. ");
              sellrate = web3.toAscii(result[2]);
              $("#field_1").val(sellrate);
              buyrate = web3.toAscii(result[3]);
              $("#field_2").val(buyrate);
              city = web3.toAscii(result[4]);
              $("#field_3").val(city );
              wprice = web3.toAscii(result[5]);
              $("#impact_to").html("Impact to your city:");
              $("#field_4").val(wprice );
              bprice = web3.toAscii(result[6]);
              $("#field_5").val(bprice);
              console.log('field_4: ' + sellrate + ' buy price rate: ' + buyrate );
            }
        else{
              $("#loader").hide();
            }
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getPrices; see log.");
    });


    var outtext;
    CityContract.deployed().then(function(instance) {
      cert = instance;
      return cert.getlastWonderStruct({from: account});
    }).then(function(result){
        var text = 'test';
        if(result)
          {
            $("#loader").hide();
            $("#insTrans").html('MetaMask User Account: ' + web3.eth.defaultAccount);

            console.log("refresh get last nameid: " + result[3] + ' description id' + String(text)  + " Price: " + result[2]/sellrate);
          }
        else{
            $("#loader").show();
          }
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error result getlastWonderStruct; see log.");
    });

    var count ;
    var output ;
    var cityContract;
    var cert;

    CityContract.deployed().then(function(instance) {
      cert = instance;
      cityContract = web3.eth.contract(cert.abi);
      Coursetro = cityContract.at(cert.address);
      return cert.countWonderStructs();
    }).then(function(result ){
      if (result) {
        count = result.c;
        output = 'Below is your latest profile<hr>';
        for (var i = 0; i < count; i++) {
           Coursetro.getWonderStructByAddress(i, web3.eth.defaultAccount, function(error, result){
            var text = '';
            if(result)
                {
                    var icase = result[4]%6+1;
                    if (result[1]==0) {
                        console.log("refresh get last nameid no id found under user account: "+web3.eth.defaultAccount);
                    }
                    else{
                    console.log("refresh get last nameid: " + outtext);
                    }
                }
            else{
                $("#loader").hide();
                console.error(error);
            }
          });
         }
      }
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error countWonderStructs; see log.");
    });

  },

  setCED: function() {
    var self = this;
    var cert;
    CityContract.deployed().then(function(instance) {
      cert = instance;
      return cert.setWonderStruct(web3.eth.defaultAccount, $("#field_1").val(), $("#field_2").val(), $("#field_3").val(), $("#field_4").val(), $("#field_5").val(),{from: account});

    }).then(function(result ){
                if(result)
                    {
                        console.log("set contract value: " + $("#field_1").val() + " " + $("#field_2").val() + " Price: " +$("#field_3").val() + " for "+web3.eth.defaultAccount);
                        $("#loader").hide();
                    }
                else{
                        console.log("Please check error: etheruem user is not authorize to setWonderStruct");
                        console.error(error);
                        $("#loader").hide();
                }
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error setWonderStruct; see log.");
    });

  },

  eventwonderInfo: function() {
    var self = this;
    var cert;
    CityContract.deployed().then(function(instance) {
      cert = instance;
      return cert.wonderInfo({}, 'latest',{from: account});
    }).then(function(result ){
        var text = 'test';
        if(result)
            {
                $("#loader").show();
                console.log("Event watch change Instructor: " + result.args.field_1 + ' ' + String(text)   + result.args.age/sellrate);
             }
        else{
             $("#loader").show();
            }
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting wonderInfo; see log.");
    });
  },

  clearAll: function() {
      $("#instructor").html("");
      $("#field_1").val("");
      $("#field_2").val("");
      $("#field_3").val("");
      $("#field_4").val("");
      $("#field_5").val("");
      $("#titleName").html("City of Bogota");
  },

  refreshMetaCoin: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/certMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using certMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-certmask")
    // Use Mist/certMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to certmask for development. More info here: http://truffleframework.com/tutorials/truffle-and-certmask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();

});
