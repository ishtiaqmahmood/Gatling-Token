App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 750000,

    init: async function() {
        console.log("App initialized...");
        return await App.initWeb3();
    },

    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        return await App.initContracts();
    },

    initContracts: async function() {
        const dappTokenSale = await $.getJSON("DappTokenSale.json");
        App.contracts.DappTokenSale = TruffleContract(dappTokenSale);
        App.contracts.DappTokenSale.setProvider(App.web3Provider);

        const dappToken = await $.getJSON("DappToken.json");
        App.contracts.DappToken = TruffleContract(dappToken);
        App.contracts.DappToken.setProvider(App.web3Provider);

        App.listenForEvents();
        return await App.render();
    },

    // Listen for events emitted from the contract
    listenForEvents: async function() {
        const instance = await App.contracts.DappTokenSale.deployed();
        instance.Sell({}, {
            fromBlock: 0,
            toBlock: 'latest',
        }).watch(function(error, event) {
            console.log("event triggered", event);
            App.render();
        });
    },

    render: async function() {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // Load account data
        const accounts = await web3.eth.accounts;
        App.account = accounts[0];
        $('#accountAddress').html("Your Account: " + App.account);

        // Load token sale contract
        const dappTokenSaleInstance = await App.contracts.DappTokenSale.deployed();
        const tokenPrice = await dappTokenSaleInstance.tokenPrice();
        App.tokenPrice = tokenPrice;
        $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toString());

        const tokensSold = await dappTokenSaleInstance.tokensSold();
        App.tokensSold = tokensSold.toNumber();
        $('.tokens-sold').html(App.tokensSold);
        $('.tokens-available').html(App.tokensAvailable);

        var progressPercent = (App.tokensSold / App.tokensAvailable) * 100;
        $('#progress').css('width', progressPercent + '%');

        // Load token contract
        const dappTokenInstance = await App.contracts.DappToken.deployed();
        const balance = await dappTokenInstance.balanceOf(App.account);
        $('.dapp-balance').html(balance.toNumber());

        App.loading = false;
        loader.hide();
        content.show();
    },

    buyTokens: async function() {
        $('#content').hide();
        $('#loader').show();
        const numberOfTokens = $('#numberOfTokens').val();
        
        try {
            const instance = await App.contracts.DappTokenSale.deployed();
            await instance.buyTokens(numberOfTokens, {
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000 // Gas limit
            });
            console.log("Tokens bought...");
            $('form').trigger('reset'); // reset number of tokens in form
            // The event listener will trigger App.render()
        } catch (error) {
            console.error(error);
            App.loading = false;
            $('#loader').hide();
            $('#content').show();
        }
    }
}

$(function() {
    $(window).load(function() {
        App.init();
    })
});
