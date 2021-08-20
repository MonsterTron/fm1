var userAccounts;
var userBalance;
var userDividends;
var userReferrals;
var contractBalance;
var cubeTotalSupply;

var polyContractBalance;
var polyUserBalance;
var polyUserDividends;
var polyUserReferrals;
var polyTotalSupply;

var cubeBlockie;
var polyBlockie;

var buyPriceInWei;
var sellPriceInWei;
var polyBuyPriceInWei;

var paused = false;
var submit = false;
var refresh;

var FomoCubeAddress = "0xF5a01f0cc73A83b59e0C833405E243DF7014C75d";
var PolyFomoAddress = "0x2fcf3debff7febf4b3e7348bc4d8ceb943771717";
var FomoCubeUsernameAddress = "0x006f58215dadb1ed27446aa132b622ebdf5b4cca";
var MultiCallAddress = "0x46bE228deE902147f31936f6c497b9D6CCE1A834";

var baseUrl = "https://fomocube.io/#/";
var setName = false;

if (localStorage.getItem('referrer') == null) {
  window.localStorage.setItem('referrer', JSON.stringify('0x544e0406E62B6f5AEE65F57223A386b472C97F2f'));
}

var nameAvailable = false;
var nameChecked = false;
var options_cube = false;
var options_poly = false;

var fomoRoundEnd = 0;

var lastCubeTx;
var lastPolyTx;

var FomoCube;
var ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "dividendsOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ethereumToSpend",
				"type": "uint256"
			}
		],
		"name": "calculateTokensReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "timerSet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokensToSell",
				"type": "uint256"
			}
		],
		"name": "calculateEthereumReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "earlyLimiterValve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newDistributor",
				"type": "address"
			}
		],
		"name": "approveDistributor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_includeReferralBonus",
				"type": "bool"
			}
		],
		"name": "myDividends",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalEthereumBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_toAddress",
				"type": "address"
			},
			{
				"name": "_amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "sell",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "distribute",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "exit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_referredBy",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "start",
				"type": "uint256"
			}
		],
		"name": "setStart",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reinvest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "usernameAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "customerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "incomingEthereum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokensMinted",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "referredBy",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "isReinvest",
				"type": "bool"
			}
		],
		"name": "onTokenPurchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "customerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "tokensBurned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ethereumEarned",
				"type": "uint256"
			}
		],
		"name": "onTokenSell",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "customerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ethereumWithdrawn",
				"type": "uint256"
			}
		],
		"name": "onWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];

var FomoCubeUsername;
var UsernameABI = [{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"getAddressByName","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getNameByAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"isAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"registerName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"administrator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var polyData = [];
var polyRoundInfo = [];
var PolyFomo;
var PolyABI = [{"constant":false,"inputs":[{"name":"_affCode","type":"address"}],"name":"buyXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"address"},{"name":"_eth","type":"uint256"}],"name":"reLoadXaddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"usernameAddress","type":"address"},{"name":"cubeAddress","type":"address"},{"name":"comAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"ethIn","type":"uint256"},{"indexed":false,"name":"polyBought","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"cubeAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"},{"indexed":false,"name":"potAmount","type":"uint256"}],"name":"onEndTx","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethOut","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethOut","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"}],"name":"onWithdrawAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"ethIn","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"}],"name":"onBuyAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"}],"name":"onReLoadAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":true,"name":"roundID","type":"uint256"},{"indexed":true,"name":"buyerID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onAffiliatePayout","type":"event"},{"constant":true,"inputs":[{"name":"_rID","type":"uint256"},{"name":"_eth","type":"uint256"}],"name":"calcPolyReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRoundInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getIncrementPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerInfoByAddress","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerVaults","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeLeft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_poly","type":"uint256"}],"name":"iWantXPoly","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"win","type":"uint256"},{"name":"gen","type":"uint256"},{"name":"aff","type":"uint256"},{"name":"lrnd","type":"uint256"},{"name":"laff","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrRnds_","outputs":[{"name":"eth","type":"uint256"},{"name":"poly","type":"uint256"},{"name":"mask","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rndEth_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"round_","outputs":[{"name":"plyr","type":"uint256"},{"name":"end","type":"uint256"},{"name":"ended","type":"bool"},{"name":"strt","type":"uint256"},{"name":"poly","type":"uint256"},{"name":"eth","type":"uint256"},{"name":"pot","type":"uint256"},{"name":"mask","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

var MultiCall;
var MultiABI = [{"inputs":[{"name":"_cubeAddress","type":"address"},{"name":"_polyAddress","type":"address"},{"name":"_usernameAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];

// Loading screen (make it cooler later?)
$(window).on('load', function() {$("#Loading").fadeOut(1000);});

// Connect web3
window.addEventListener('load', async () => {
    
    // First message
    $("#consoleContent").append("<p>Checking for Web3 support...</p>");
    scroll();
    
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request access
            $("#consoleContent").append("<p>Web3 found. Waiting for user input...</p>");
            scroll();
            
            await ethereum.enable();
            // Account is now exposed
            $("#consoleContent").append("<p>Access granted!</p>");
            scroll();
    
            if(false) {
                $("#consoleContent").append("<p style=\"color: red\">Error. Please connect to mainNet.</p>");
                scroll();
            } else {
                // Launch setup 
                await setup();
                await setReferrer();
                // Set refresh interval 
                // refresh = setInterval(initialize, 1000);
                timers = setInterval(updateTimers, 100);
                // Init 
                initialize();
            }
        } catch (error) {
            // User denied account access...
            $("#consoleContent").append("<p>User denied access. Script aborted...</p>");
            scroll();
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        initialize();
    }
    // Non-dapp browsers...
    else {
        // Web3 is not supported 
        $("#consoleContent").append("<p>Web3 support not found. Have you tried installing MetaMask?</p>");
        scroll();
    }
    
    // Direct link to faces 
    if (window.location.href.split('?')[1] == 'poly' || window.location.href.split('?')[1] == 'side=poly') {
        changeSide('bottom');
    } else if(window.location.href.split('?')[1] == 'cube' || window.location.href.split('?')[1] == 'side=cube') {
        changeSide("top");
    }
});


async function setup() {
    
    $("#consoleContent").append("<p>Connecting to smart contract at "+FomoCubeAddress+"</p>");
    scroll();
    
    try {
    
        // Initialize contracts
        FomoCube = new web3.eth.Contract(ABI, FomoCubeAddress);
        FomoCubeUsername = new web3.eth.Contract(UsernameABI, FomoCubeUsernameAddress);
        PolyFomo = new web3.eth.Contract(PolyABI, PolyFomoAddress);
        MultiCall = new web3.eth.Contract(MultiABI, MultiCallAddress);
        
        // Generate CUBE blockie
        cubeBlockie = blockies.create({seed:FomoCubeAddress.toLowerCase(),size:8,scale:4}).toDataURL();
        
        // Generate POLY blockie
        polyBlockie = blockies.create({seed:PolyFomoAddress.toLowerCase(),size:8,scale:4}).toDataURL();
    }
    
    catch(error) { console.error(error); }
    
    finally {

        $("#cubeCard").prepend('<div class="userBlockie" style="background-image: url('+ cubeBlockie +')"></div>');
        $("#polyCard").prepend('<div class="userBlockie" style="background-image: url('+ polyBlockie +')"></div>');
        
        // Move stats window on the scene
        $("#stats").animate({left: "+="+250+""}, 200);
        
        // Move refs console on the scene
        $("#editRefLink").animate({bottom: "+="+250+""}, 200);
        
        // Attach event listener
        attachEvents();
        
        $("#consoleContent").append("<p style=\"color: green\">System ready!</p>");
        scroll();
        
    }
    
}


async function setReferrer () {
    let path = window.location.href
    let match = path.match(/\/#\/(.+)\??/)

    if (match) {
        let ref = decodeURIComponent(match[1])
        if (web3.utils.isAddress(ref)) {
            window.localStorage.setItem('referrer', JSON.stringify(ref));
        } else {
            ref = await FomoCubeUsername.methods.getAddressByName(web3.utils.toHex(ref)).call();
            window.localStorage.setItem('referrer', JSON.stringify(ref));
        }
    }
}


async function initialize(submit) {
    
    // Checks if game is paused
    if(!paused) {
    
        if(submit) {
        
            let ethval = $("#eth").val();
            let cubeval = $("#cube").val();
            let usernameInputVal = $("#usernameInput").val();
            
            if(ethval !== "") {
                $("#eth").val("");
            }
            
            if(cubeval !== "") {
                $("#cube").val("");
            }
            
            if(usernameInputVal !== "") {
                $("#usernameInput").val("");
            }
        
        }
    
        try {
            
            userAccounts = await web3.eth.getAccounts();

            //0 = user CUBE
            //1 = user CUBE divs (not including refs)
            //2 = CUBE buy price
            //3 = CUBE sell price
            //4 = CUBE total supply
            //5 = CUBE contract balance
            //6 = POLY buy price
            //7 = POLY increment price
            //8 = POLY contract balance
            //9 = current username
            //10 = recent username
            MultiCall.methods.getData().call({from: userAccounts[0]}).then(function(result) {
                if(result[0] !== userBalance) {
                    $(".cube-tokens").fadeTo(100, 0);
                    userBalance = result[0];
                }
                $(".cube-tokens").text(addCommas(convertWeiToEth(userBalance).toFixed(3) + " CUBE"));
                $(".cube-tokens").fadeTo(100, 1);
                
                // result[1] is divs not including refs
                FomoCube.methods.myDividends(true).call({from: userAccounts[0]}).then(function(divs) {
                    if(result[1] !== userDividends) {
                        $(".cube-divs").fadeTo(100, 0);
                        userDividends = result[1];
                    }
                    $(".cube-divs").text(convertWeiToEth(userDividends).toFixed(3) + " ETH");
                    $(".cube-divs").fadeTo(100, 1);
                    
                    if(divs - result[1] !== userReferrals) {
                        $(".cube-refs").fadeTo(100, 0);
                        userReferrals = divs - result[1];
                    }
                    $(".cube-refs").text(convertWeiToEth(userReferrals).toFixed(3) + " ETH");
                    $(".cube-refs").fadeTo(100, 1);
                }).catch(function(error){console.log(error)});
                

                
                if(result[2] !== buyPriceInWei) {
                    $(".cube-buyprice").fadeTo(100, 0);
                    buyPriceInWei = result[2];
                }
                $(".cube-buyprice").text(convertWeiToEth(buyPriceInWei).toFixed(7) + " ETH");
                $(".cube-buyprice").fadeTo(100, 1);
                
                if(result[3] !== sellPriceInWei) {
                    $(".cube-sellprice").fadeTo(100, 0);
                    sellPriceInWei = result[3];
                }
                $(".cube-sellprice").text(convertWeiToEth(sellPriceInWei).toFixed(7) + " ETH");
                $(".cube-sellprice").fadeTo(100, 1);
                
                if(result[4] !== cubeTotalSupply) {
                    $("#totalCube").fadeTo(100, 0);
                    cubeTotalSupply = result[4];
                }
                let dec = convertWeiToEth(cubeTotalSupply).toFixed(2).split('.')[1];
                $("#totalCube").text(addCommas(convertWeiToEth(cubeTotalSupply).toFixed(0)) + '.' + dec);
                $("#totalCube").fadeTo(100, 1);
                
                if(result[5] !== contractBalance) {
                    $(".cube-balance").fadeTo(100, 0);
                    contractBalance = result[5];
                }
                $(".cube-balance").text(convertWeiToEth(contractBalance).toFixed(3) + " ETH");
                $(".cube-balance").fadeTo(100, 1);
                
                if(result[6] !== polyBuyPriceInWei) {
                    $(".poly-price").fadeTo(100, 0);
                    polyBuyPriceInWei = result[6];
                }
                $(".poly-price").text(convertWeiToEth(polyBuyPriceInWei).toFixed(7) + " ETH");
                $(".poly-price").fadeTo(100, 1);
                
                let polyIncrement = web3.utils.fromWei(result[7]);
                $("#incrementPrice").text(polyIncrement + ' POLY');
                if (polyIncrement == '0') {
                  $("#leaderCost").text('Next buyer becomes the leader');
                } else {
                  let leaderEthCost = web3.utils.fromWei(polyBuyPriceInWei) * polyIncrement;
                  $("#leaderCost").text('~' + parseFloat(leaderEthCost).toFixed(5) + ' ETH to be the leader');
                }
                
                if(result[8] !== polyContractBalance) {
                    $(".poly-balance").fadeTo(100, 0);
                    polyContractBalance = result[8];
                }
                $(".poly-balance").text(addCommas(convertWeiToEth(polyContractBalance).toFixed(3) + " ETH"));
                $(".poly-balance").fadeTo(100, 1);
                
                
                let username = web3.utils.toUtf8(result[9]);
                
                let _face = "";
                if(options_poly) {
                    _face = "?poly";
                } else if(options_cube) {
                    _face = "?cube";
                }
                
                if (username !== "" && username !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    $("#usernameDisplay").text(encodeURI(username + _face));
                    $("#setUsernameHint").text("Current name: "+username);
                } else {
                    $("#usernameDisplay").text(userAccounts[0] + _face);
                }
                
                $('.recentUser').text(web3.utils.toUtf8(result[10]));
                
            }).catch(function(error){console.log(error)});
            
            /* CUBE STUFF */

            // Update buy estimate
            let ethSent = $("#eth").val();
            if (parseFloat(ethSent) > 0) {
                let _ethSent = web3.utils.toWei(ethSent);
                FomoCube.methods.calculateTokensReceived(_ethSent).call().then(function(result) {
                    $(".howManyTokens").text(addCommas(parseFloat(web3.utils.fromWei(result)).toFixed(3) + " CUBE"));
                })
                .catch(function(error){console.log(error)});
            } else {
                $(".howManyTokens").text("N/A");
            }
            
            // Update sell estimate
            let tokensSent = $("#cube").val();
            let ethereumReceived = "0";
            if (parseFloat(tokensSent) > 0 && contractBalance >= 1000000000000000000) {
                let _tokensSent = web3.utils.toWei(tokensSent);
                FomoCube.methods.calculateEthereumReceived(_tokensSent).call().then(function(result) {
                    $("#sellEstimate").text(parseFloat(web3.utils.fromWei(result)).toFixed(3) + " ETH");
                }).catch(function(error){console.log(error)});
            } else {
                $("#sellEstimate").text("N/A");
            }

            /* POLY STUFF */

            // Get user POLY info
             // * @param _addr address of the player you want to lookup 
             // * @return player ID 
             // * @return player name
             // * @return poly owned (current round)
             // * @return winnings vault
             // * @return general vault 
             // * @return affiliate vault 
             // * @return player round eth
            PolyFomo.methods.getPlayerInfoByAddress(userAccounts[0]).call().then(function(result) {
                polyData = result;
            })
            .catch(function(error){console.log(error)});
            
            // Check for polyData 
            if(!polyData[0]) {
                // console.log("No polyData yet");
            } else {

                // Update balance 
                let _polyUserBalance = polyData[2];
                if(_polyUserBalance !== polyUserBalance) {
                    $(".poly-tokens").fadeTo(100, 0);
                    polyUserBalance = _polyUserBalance;
                }
                $(".poly-tokens").text(addCommas(convertWeiToEth(polyUserBalance).toFixed(3) + " POLY"));
                $(".poly-tokens").fadeTo(100, 1);
                
                // Update dividends 
                if(polyData[4] !== polyUserDividends) {
                    $(".poly-divs").fadeTo(100, 0);
                    polyUserDividends = polyData[4];
                }
                $(".poly-divs").text(convertWeiToEth(polyUserDividends).toFixed(3) + " ETH");
                $(".poly-divs").fadeTo(100, 1);
                
                // Update refs
                if(polyData[5] !== polyUserReferrals) {
                    $(".poly-refs").fadeTo(100, 0);
                    polyUserReferrals = polyData[5];
                }
                $(".poly-refs").text(convertWeiToEth(polyUserReferrals).toFixed(3) + " ETH");
                $(".poly-refs").fadeTo(100, 1);
                
                // Winnings
                $("#polyWinnings").text(convertWeiToEth(polyData[3]).toFixed(3) + " ETH");
            }
            
            // Get polyRoundInfo 
            PolyFomo.methods.getCurrentRoundInfo().call().then(function(result) {
                polyRoundInfo = result;
                // 0 = round id 
                // 1 = total poly for round 
                // 2 = time round ends
                // 3 = time round started
                // 4 = current pot 
                // 5 = current player in leads address 
                // 6 = current player in leads name
                // 7 = eth spent in current round
            })
            .catch(function(error){console.log(error)});
            
            // Check for polyRoundInfo
            if(!polyRoundInfo[0]) {
                // console.log("No polyRoundInfo yet");
            } else {
            
                // Round ID
                $("#currentRound").text(polyRoundInfo[0]);
    
                // buy estimate ...
                let _polyBuyEth = $("#polyEth").val();
                if(_polyBuyEth !== "") {
                    let polyBuyEth = web3.utils.toWei($("#polyEth").val());
                    if (typeof(parseInt(polyBuyEth)) == 'number') {
                        let polyBuyEstimate = await PolyFomo.methods.calcPolyReceived(polyRoundInfo[0], polyBuyEth).call();
                        $("#polyEstimate").text(addCommas(parseFloat(web3.utils.fromWei(polyBuyEstimate)).toFixed(3) + " POLY"));
                    }
                }
                
                // Right-hand side now
                let totalPot = polyRoundInfo[4];
                $("#pot").text(parseFloat(web3.utils.fromWei(totalPot)).toFixed(3) + ' ETH');
                
                // Last buyer
                let lastBuyer = web3.utils.toUtf8(polyRoundInfo[6]);
                if (lastBuyer == '') {
                    lastBuyer = formatAddress(polyRoundInfo[5]);
                }
                $("#lastBuyer").text(lastBuyer);
                
                // Round timer
                fomoRoundEnd = polyRoundInfo[2];

                // Whoops ...
                let _round = await PolyFomo.methods.round_(polyRoundInfo[0]).call()

                // Eth spent in round 
                $("#ethSpentInRound").text(convertWeiToEth(_round.eth).toFixed(2));
                
                // You can still spend...
                //  ¯\_(ツ)_/¯
                if (convertWeiToEth(_round.eth) < 30) {
                    let _customerLimit = ((1000000000000000000 - parseInt(polyData[6])) / 1000000000000000000);
                    $("#customerLimit").text(toFixed(_customerLimit, 4));
                } else {
                    $("#limitText").text("Buy limit deactivated");
                }
                
                // Update total supply on main face
                let _polyTotalSupply = polyRoundInfo[1];
                if(_polyTotalSupply !== polyTotalSupply) {
                    $("#totalPoly").fadeTo(100, 0);
                    polyTotalSupply = _polyTotalSupply;
                }
                let dec = convertWeiToEth(polyTotalSupply).toFixed(2).split('.')[1];
                $("#totalPoly").text(addCommas(convertWeiToEth(polyTotalSupply).toFixed(0)) + '.' + dec);
                $("#totalPoly").fadeTo(100, 1);
            
            }
            setTimeout(initialize, 2000)
            
        }
        
        catch(error) { 
            console.error(error); 
            setTimeout(initialize, 2000)
        }
        
        finally {
            
            // Enable or disable withdraw & reinvest buttons 
            if(userDividends > 0) {
                $("#reinvestButton, #withdrawButton").attr("disabled", false).css("opacity", "1");
            } else {
                $("#reinvestButton, #withdrawButton").attr("disabled", true).css("opacity", "0.35");
            }
    
        }
    
    } else {
        /*  Game is paused
            Don't initialize(), remove grid animation & title glow.
            Useful when playing a game etc.
        */
        $(".m-grid").removeClass("is-animating");
        $(".title").removeClass("glow");
        $("#Loading").html("<div id=\"PausedWrapper\">\
        <h2>Paused</h2>\
        <p>FomoCube & PolyFomo have been paused for a better gaming experience.</p>\
        <button id=\"ResumeButton\">Resume</button>\
        </div>");
        $("#Loading").fadeIn();
    }

}


async function executePolyBuyOrder(eth) {
    
    $("#consoleContent").append("<p>Execute POLY BUY</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {

        let ethInWei = convertEthToWei(eth);
        
        PolyFomo.methods.buyXaddr(JSON.parse(window.localStorage.getItem('referrer'))).send({from: userAccounts[0], value: ethInWei, gas: 400000},
            function(error, hash){
                if(!error){
                    $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                    scroll();
                    
                    $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                    scroll();
                    
                    waitForReceipt(hash, function (receipt) {
                        // Success!
                        $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                        scroll();
                        // Re-initialize 
                        initialize(true);
                        // Reset cube state 
                        // changeSide("front");
                    });
                } else {
                    $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                    scroll();
                }
        });
    }
    
    catch(error) { console.error(error); }
}


async function executeBuyOrder(eth) {
    
    $("#consoleContent").append("<p>Execute CUBE BUY</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {

        let ethInWei = convertEthToWei(eth);
        
        FomoCube.methods.buy(JSON.parse(window.localStorage.getItem('referrer'))).send({from: userAccounts[0], value: ethInWei, gas: 400000},
            function(error, hash){
                if(!error){
                    $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                    scroll();
                    
                    $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                    scroll();
                    
                    waitForReceipt(hash, function (receipt) {
                        // Success!
                        $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                        scroll();
                        // Re-initialize 
                        initialize(true);
                        // Reset cube state 
                        // changeSide("front");
                    });
                } else {
                    $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                    scroll();
                }
        });
    }
    
    catch(error) { console.error(error); }
}


async function executeSellOrder(cube) {
    
    $("#consoleContent").append("<p>Execute SELL order</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {

        let cubeInWei = web3.utils.toWei(cube.toString());
        
        let cubeToWithdraw;
        
        /* toFixed(4) is used to display token balance to the user, but toFixed()
        rounds up the value meaning if the user wants to sell the balace they 
        are being shown (and the balance is actually rounded up) then the tx will
        fail because there isn't enough tokens */
        if(parseInt(cubeInWei) > userBalance) {
            // Just sell the entire balance
            cubeToWithdraw = userBalance;
        } else {
            // Sell the user input  
            cubeToWithdraw = cubeInWei;
        }
        
        FomoCube.methods.sell(cubeToWithdraw).send({from: userAccounts[0], gas: 400000},
        function(error,hash){
            if(!error){
                
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();

                waitForReceipt(hash, function (receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                    scroll();
                    // Re-initialize 
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
    
    }
    
    catch(error) { console.error(error); }
}


async function executeReinvest() {
    
    $("#consoleContent").append("<p>Execute CUBE REINVEST</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        FomoCube.methods.reinvest().send({from: userAccounts[0], gas: 400000},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                    scroll();
                    // Re-init
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


async function executeWithdraw() {
    
    $("#consoleContent").append("<p>Execute CUBE WITHDRAW</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        FomoCube.methods.withdraw().send({from: userAccounts[0], gas: 400000},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                    scroll();
                    // Re-init
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


async function executePolyReinvest() {
    
    $("#consoleContent").append("<p>Execute POLY REINVEST</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        PolyFomo.methods.reLoadXaddr(JSON.parse(window.localStorage.getItem('referrer')),polyUserDividends.toString()).send({from: userAccounts[0], gas: 400000},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                    scroll();
                    // Re-init
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


async function executePolyWithdraw() {
    
    $("#consoleContent").append("<p>Execute POLY WITHDRAW</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        PolyFomo.methods.withdraw().send({from: userAccounts[0], gas: 400000},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Success!</p>");
                    scroll();
                    // Re-init
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


async function setUsername() {
    
    let userInput = $("#usernameInput").val();
    let currentName = web3.utils.stringToHex(userInput);
    
    nameAvailable = await FomoCubeUsername.methods.isAvailable(currentName).call();
    
    if (!nameAvailable) {
        // Disable button while checking 
        $("#usernameButton").text("Checking...").attr("disabled", true).css("opacity", "0.35");
        
        if (nameAvailable) {
            // Enable button & change text 
            $("#usernameButton").text("Set username").attr("disabled", false).css("opacity", "1");
        } else {
            $("#usernameButton").text("Name Unavailable");
        }

    } else { 
        if (nameChecked) {
            nameChecked = false;
            executeSetUsername(currentName); 
        } else {
            nameChecked = true;
            $("#usernameButton").text("Set Username");
        }
    }
    
}


function resetCheck() {
    $("#usernameButton").text("Check Availability").attr("disabled", false).css("opacity", "1");
    nameChecked = false;
}


// Execute set username 
async function executeSetUsername(currentName) {
    
    $("#consoleContent").append("<p>Execute SET USERNAME</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        FomoCubeUsername.methods.registerName(currentName).send({from: userAccounts[0], value: 0},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Username set!</p>");
                    scroll();
                    
                    // Re-init
                    initialize(true);

                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


// Execute exit();
async function executeExitScam() {
    
    $("#consoleContent").append("<p>Execute EXIT SCAM</p>");
    scroll();
    
    $("#consoleContent").append("<p>Waiting for user input...</p>");
    scroll();
    
    try {
        
        FomoCube.methods.exit().send({from: userAccounts[0]},
        function(error, hash) {
            if(!error) {
                $("#consoleContent").append("<p>Transaction hash: "+hash+"</p>");
                scroll();
                
                $('#consoleContent').append('<p>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</p>');
                scroll();
                waitForReceipt(hash, function(receipt) {
                    // Success!
                    $("#consoleContent").append("<p style=\"color: green\">Great success!</p>");
                    scroll();
                    // Re-init
                    initialize(true);
                    // Reset cube state 
                    // changeSide("front");
                });
            } else {
                $("#consoleContent").append("<p style=\"color: red\">Error... User rejected transaction?</p>");
                scroll();
            }
        });
        
    }
    
    catch(error) {console.error(error); }
    
}


// Scrolls the console contents to last entry 
function scroll(){
    $("#consoleContent").scrollTop($("#consoleContent")[0].scrollHeight);
}


// Scrolls the Event Listener to last entry 
function scrollEvents(){
    $("#EventsContent").scrollTop($("#EventsContent")[0].scrollHeight);
}


function dodgyToFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


function getEpochSeconds() {
  return Math.floor(new Date().getTime() / 1000)
}


Number.prototype.toHHMMSS = function() {
  let sec_num = parseInt(this, 10)
  let hours = Math.floor(sec_num / 3600)
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  let seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (hours < 10) {
    hours = "0" + hours
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  if (this < 0) {
    return '00:00:00'
  }
  return hours + ':' + minutes + ':' + seconds
}


function updateTimers() {
    $("#roundEndsIn").text((fomoRoundEnd - getEpochSeconds()).toHHMMSS());
}


function convertWeiToEth (e) {
  return e / 1e18
}


function convertEthToWei (e) {
  return 1e18 * e
}


// Shortens ETH addresses 
function formatAddress(address) {
    let firstSix = address.substring(0, 6);
    let lastFour = address.substr(address.length - 4);
    return firstSix + "..." + lastFour;
}


// Adds commas to large numbers
function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


// toFixed without rounding
// https://stackoverflow.com/a/11818658
// What do you think? 
function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}


// Copies copy text of element given 
var refText;

function copy(element) {
    var range, selection, worked;
    
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    try {
        refText = $(element).html();
        document.execCommand('copy');
        $(element).text("Copied!");
        setTimeout(function() {
            $(element).html(refText);
        }, 2000);
    }
    catch (err) {
        console.error(err);
    }
}


function waitForReceipt(hash, cb) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      error(err);
    }
    if (receipt !== null) {
      // Transaction went through
      if (cb) {
        cb(receipt);
      }
    } else {
      // Try again in 1 second
      window.setTimeout(function () {
        waitForReceipt(hash, cb);
      }, 1000);
    }
  });
}


// Event listener 
function attachEvents() {

	web3.eth.getBlockNumber(function(error, result) {
	    let currentBlockNumber = result;
	    
	    // Events from past 10 blocks 
	  	FomoCube.events.allEvents({ fromBlock: currentBlockNumber - 10 }, function(e, result) {
          // Return values
          let currentEvent = result.event;
          let customer = result.returnValues.customerAddress;
          let customerName = web3.utils.toUtf8(result.returnValues.customerName);

          // Is this the authed user's event?
          if(customer == userAccounts[0]) {
              customer = 'You';
          } else {
              customer = formatAddress(customer);
              if (customerName != '') {
                  customer = customerName;
              }
          }
          
          if (lastCubeTx != result.transactionHash) {
              switch(result.event) {
                  
                case 'onTokenPurchase':
                    let incomingEthereum = result.returnValues.incomingEthereum;
                    let tokensMinted = result.returnValues.tokensMinted;
                    let isReinvest = result.returnValues.isReinvest;
                    if (isReinvest) {
                        $("#EventsContent").append("<p>"+customer+" reinvested "+convertWeiToEth(incomingEthereum).toFixed(4)+" ETH and received "+convertWeiToEth(tokensMinted).toFixed(4)+" CUBE.</p>");
                    } else {
                        $("#EventsContent").append("<p>"+customer+" bought "+convertWeiToEth(tokensMinted).toFixed(4)+" CUBE for "+convertWeiToEth(incomingEthereum).toFixed(4)+" ETH.</p>"); 
                    }
                    scrollEvents();
                    break;
                  
                case 'onTokenSell':
                    let ethereumEarned = result.returnValues.ethereumEarned;
                    let tokensBurned = result.returnValues.tokensBurned;
                    $("#EventsContent").append("<p>"+customer+" sold "+convertWeiToEth(tokensBurned).toFixed(4)+" CUBE for "+convertWeiToEth(ethereumEarned).toFixed(4)+" ETH.</p>");
                    scrollEvents();
                    break;
                  
                case 'onWithdraw':
                    let ethereumWithdrawn = result.returnValues.ethereumWithdrawn;
                    $("#EventsContent").append("<p>"+customer+" withdrew "+convertWeiToEth(ethereumWithdrawn).toFixed(4)+" ETH in dividends from CUBE.</p>");
                    scrollEvents();
                    break;
                  
                case 'Transfer':
                    let from = result.returnValues.from;
                    let to = result.returnValues.to;
                    let tokens = result.returnValues.tokens;
                    $("#EventsContent").append("<p>"+formatAddress(from)+" transferred "+convertWeiToEth(tokens).toFixed(4)+" CUBE to "+formatAddress(to)+".</p>");
                    scrollEvents();
                    break;
              }
          }
          lastCubeTx = result.transactionHash;
		});
    // POLY now.. this is ugly
    PolyFomo.events.allEvents({ fromBlock: currentBlockNumber - 10 }, function(e, result) {
          let currentEvent = result.event;
          if (result.event != 'onAffiliatePayout') {
              let customer = result.returnValues.playerAddress;
              let customerName = web3.utils.toUtf8(result.returnValues.playerName);

              // Is this the authed user's event?
              if(customer == userAccounts[0]) {
                  customer = 'You';
              } else {
                  customer = formatAddress(customer);
                  if (customerName != '') {
                      customer = customerName;
                  }
              }

              if (lastPolyTx != result.transactionHash) {
                  switch(result.event) {
                      
                    case 'onEndTx': // fired at the end of a buy or reload
                        let incomingEthereum = result.returnValues.ethIn;
                        let polyMinted = result.returnValues.polyBought;
                        $("#EventsContent").append("<p class=\"polyFomoEvent\">"+customer+" bought "+convertWeiToEth(polyMinted).toFixed(4)+" POLY for "+convertWeiToEth(incomingEthereum).toFixed(4)+" ETH.</p>"); 
                        scrollEvents();
                        break;
                        
                    case 'onWithdraw':
                        let ethereumWithdrawn = result.returnValues.ethOut;
                        $("#EventsContent").append("<p class=\"polyFomoEvent\">"+customer+" withdrew "+convertWeiToEth(ethereumWithdrawn).toFixed(4)+" ETH in dividends from POLY.</p>");
                        scrollEvents();
                        break;
                  }
              }
              lastPolyTx = result.transactionHash;
          }
		});
	});
}


// Globals 
var changeSide;
var currentClass = '';
var prevSide = '';
var side = "front";

// After DOM has loaded... 
$(document).ready(function() {
    
// Click to copy referral link 
$('#refLink').on('click',function() {
    copy(this);
});

// Fomo Buy
$('#fomoBuyButton').on('click',function() {
    let eth = $("#polyEth").val();
    if(eth !== "" && eth > 0) {
        executePolyBuyOrder(eth);
    }
});

// Set username button 
$('#usernameButton').on('click', function() {
    setUsername();
});
    
// Buy button 
$('#buyButton').on('click',function() {
    let eth = $("#eth").val();
    if(eth !== "" && eth > 0) {
        executeBuyOrder(eth);
    }
});

// Sell button 
$('#sellButton').on('click',function() {
    let cube = $("#cube").val();
    if(cube !== "" && cube > 0) {
        executeSellOrder(cube);
    }
});

// Reinvest button 
$('#reinvestCube').on('click',function() {
    executeReinvest();
});

// Withdraw button 
$('#withdrawCube').on('click',function() {
    executeWithdraw();
});

// Reinvest button 
$('#reinvestPoly').on('click',function() {
    executePolyReinvest();
});

// Withdraw button 
$('#withdrawPoly').on('click',function() {
    executePolyWithdraw();
});

// Discord button
$('#discord').on('click',function() {
    window.open('https://discord.gg/T2wyPuP', '_blank');
});

// Options cube
$('#options_cube').on('click',function() {
    if(options_poly) {
        options_poly = false;
    }
    options_cube = true;
});

// Options poly
$('#options_poly').on('click',function() {
    if(options_cube) {
        options_cube = false;
    }
    options_poly = true;
});

// Options none
$('#options_none').on('click',function() {
    options_cube = false;
    options_poly = false;
});

// Resume button resumes from paused mode 
$("body").on('click', "#ResumeButton", function() {
    $(".m-grid").addClass("is-animating");
    $(".title").addClass("glow");
    $("#Loading").fadeOut();
    paused = false;
});

// Bind events for changeSide 
$(".menu-item, .action").bind('click', function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    side = $(event.target).attr('data');
    changeSide(side);
});

changeSide = function(to) {
    
    if(prevSide) {
        // Remove glowing from previous side 
        $('#'+prevSide+' .title').removeClass('glow');
    }
    // Set new previous side 
    prevSide = to;
    
    let showClass = 'show-' + to;
    if (currentClass) {
        $(".cube").removeClass(currentClass);
    }
    $(".cube").addClass(showClass);
    currentClass = showClass;
    
    // Start glowing 
    $('#'+to+' .title').addClass('glow');
}

// set initial side
changeSide("front");

// Scrollbar on #bottom if height less than 796
var bottomHeight = $("#bottom").outerHeight(true);
if(bottomHeight < 796) {
    $("#bottom").addClass("scrollbar");
    $("#bottom").css("overflow-y", "scroll");
}

// Console
var consoleHeaderHeight = $("#consoleHeader").outerHeight(true); // Does it work on all browsers?
var consoleFooterHeight = $("#consoleFooter").outerHeight(true); // Does it work on all browsers?
var totalHeight = consoleHeaderHeight + consoleFooterHeight;
$("#consoleContent").css({ 'height': "calc(100% - "+totalHeight+"px)" });
	
// Commands
var commands = [
    "help",
    "show",
    "exit",
    "hyper",
    "konami",
    "play"
];

$(document).on('keypress', function(e) {
    // Fetch command
    let command = $("#inputCommands").val();
    
    // Enter key
    if(e.which == 13) {
        var split = command.split(" "); // Split after space 
        if(command !== "" && commands.includes(split[0])) {
            switch(split[0]) {
                case "help":
                    $("#consoleContent").append("<p>Available commands: "+commands.join(', ')+"</p>");
                    scroll();
                    break;
                
                case "show":
                    var faces = ["front", "back", "left", "right", "top", "bottom"];
                    if(typeof split[1] !== "undefined" && split[1] !== "") {
                        // Trailing command found!
                        if(faces.includes(split[1])) {
                            changeSide(split[1]);
                            $("#consoleContent").append("<p>Showing side: "+split[1]+"</p>");
                        } else {
                            $("#consoleContent").append("<p style=\"color: red\">Invalid argument!</p>");
                            $("#consoleContent").append("<p>Usage: show ["+faces.join(', ')+"]</p>");
                        }
                    } else {
                        $("#consoleContent").append("<p>Usage: show ["+faces.join(', ')+"]</p>");
                    }
                    scroll();
                    break;
                    
                case "exit":
                    executeExitScam();
                    break;
                    
                case "hyper":
                    $(".scene").addClass("shake");
                    $(".cube__face").css("-webkit-box-shadow", "10px 10px 20px rgba(170, 9, 170, 1), inset 0 0 10px rgba(170, 9, 170, 1)");
                    $(".cube__face").css("-moz-box-shadow", "10px 10px 20px rgba(170, 9, 170, 1), inset 0 0 10px rgba(170, 9, 170, 1)");
                    $(".cube__face").css("box-shadow", "10px 10px 20px rgba(170, 9, 170, 1), inset 0 0 10px rgba(170, 9, 170, 1)");
                    $("#consoleContent").append("<p>Hyper mode activated!</p>");
                    scroll();
	            break;
			    
                case "konami":
                    $("body").css("background-image", "url(https://wallpapercave.com/wp/0BNluN0.jpg)");
                    $('<style>#menu:before,#menu:after{border-top: 70px solid rgba(255,255,255,0.9)}</style>').appendTo('head');
                    $(".items, #statsHeader, #editRefLinkHeader, #consoleHeader, .cube__face").css("background", "rgba(255,255,255,0.7)");
                    $("#stats, #editRefLink, #console, .overlay").css({"border-color":"white", "background":"rgba(0,0,0,0.3)"});
                    $("button, input, .inputWrapper").css({"background":"rgba(0,0,0,0.1)", "border-color":"white"});
                    $("#statsTitle, #editRefLinkTitle, #consoleTitle").css({"color":"grey"});
                    $("#consoleContent, .text-container").removeClass("scrollbar");
                    $("#consoleContent").css("overflow", "hidden");
                    $("#consoleFooter").css("background", "transparent");
                    break;
                    
                case "play":
                    var games = ["doom", "prince", "wolf"];
                    if(typeof split[1] !== "undefined" && split[1] !== "") {
                        // Trailing command found!
                        if(games.includes(split[1]) && split[1] == "doom") {
                            // Open DOOM 
                            paused = true;
                            PopupCenter("games/doom.html", "DOOM", 640, 400);
                            $("#consoleContent").append("<p>PLAY GAME: "+split[1]+"</p>");
                        } 
                        else if(split[1] == "prince") {
                            // Open PRINCE 
                            paused = true;
                            PopupCenter("games/prince.html", "PRINCE", 640, 400);
                            $("#consoleContent").append("<p>PLAY GAME: "+split[1]+"</p>");
                        }
                        else if(split[1] == "wolf") {
                            paused = true;
                            PopupCenter("games/wolf.html", "WOLF3D", 640, 400);
                            $("#consoleContent").append("<p>PLAY GAME: "+split[1]+"</p>");
                        }
                        else {
                            $("#consoleContent").append("<p style=\"color: red\">Invalid argument!</p>");
                            $("#consoleContent").append("<p>Usage: play ["+games.join(', ')+"]</p>");
                        }
                    } else {
                        $("#consoleContent").append("<p>Usage: play ["+games.join(', ')+"]</p>");
                    }
                    scroll();
                    break;
            }
            
        }
        // Reset input
        $("#inputCommands").val("");
    }
});

// https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var systemZoom = width / window.screen.availWidth;
var left = (width - w) / 2 / systemZoom + dualScreenLeft
var top = (height - h) / 2 / systemZoom + dualScreenTop
    var newWindow = window.open(url, title, 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,resizable=no,scrollbars=no, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
}

// Console in/out
var consoleIn = true;
var consoleHeight = $("#console").height();
var c_initialPosition = 210;
$("#consoleInOut").html('<i class="fa fa-caret-down" aria-hidden="true"></i>');

function consoleInOut() {
  if(!consoleIn) {
      $("#console").animate({bottom: "+="+r_initialPosition+""}, 200, function() {
      // Animation complete.
          $("#consoleInOut").html('<i class="fa fa-caret-down" aria-hidden="true"></i>');
      });
  
  consoleIn = !consoleIn;
  
  } else {
      $("#console").animate({bottom: "-="+r_initialPosition+""}, 200, function() {
      // Animation complete.
          $("#consoleInOut").html('<i class="fa fa-caret-up" aria-hidden="true"></i>');
      });
      
  consoleIn = !consoleIn;
  }
}

$("#consoleInOut").click(consoleInOut);


// Dashboard in/out  
var statsTitleHeight = $("#statsTitle").height();
$("#statsInOut").css({
    'height': statsTitleHeight+'px',
    'width': statsTitleHeight+'px'
});

// Get #stats width (no longer fixed value)
var statsWidth = parseInt($("#stats").css("width").replace("px",""));
// Get header height
var statsHeaderHeight = parseInt($("#statsHeader").css("height").replace("px",""));

var statsIn = true;

$("#statsInOut").html('<i class="fa fa-caret-left" aria-hidden="true"></i>');
var initialPosition = statsWidth - statsHeaderHeight;

function statsInOut() {
  if(!statsIn) {
      $("#stats").animate({left: "+="+initialPosition+""}, 200, function() {
      // Animation complete.
          $("#statsInOut").html('<i class="fa fa-caret-left" aria-hidden="true"></i>');
      });
  
  statsIn = !statsIn;
  
  } else {
      $("#stats").animate({left: "-="+initialPosition+""}, 200, function() {
      // Animation complete.
          $("#statsInOut").html('<i class="fa fa-caret-right" aria-hidden="true"></i>');
      });
      
  statsIn = !statsIn;
  }
}

$("#statsInOut").click(statsInOut);


// Referral console in/out 
var editRefLinkTitleHeight = $("#editRefLinkTitle").height();
$("#refsInOut").css({
    'height': editRefLinkTitleHeight+'px',
    'width': editRefLinkTitleHeight+'px'
});

var refsIn = true;

$("#refsInOut").html('<i class="fa fa-caret-down" aria-hidden="true"></i>');
var r_initialPosition = 210; // Check css, initially this is set to -250

function refsInOut() {
  if(!refsIn) {
      $("#editRefLink").animate({bottom: "+="+r_initialPosition+""}, 200, function() {
      // Animation complete.
          $("#refsInOut").html('<i class="fa fa-caret-down" aria-hidden="true"></i>');
      });
  
  refsIn = !refsIn;
  
  } else {
      $("#editRefLink").animate({bottom: "-="+r_initialPosition+""}, 200, function() {
      // Animation complete.
          $("#refsInOut").html('<i class="fa fa-caret-up" aria-hidden="true"></i>');
      });
      
  refsIn = !refsIn;
  }
}

$("#refsInOut").click(refsInOut);

});