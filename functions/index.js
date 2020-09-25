/****************************************
 * 
 * Code: Returns Error.
 * Me: Runs code again without changing anything.
 * Code: Returns error again.
 * Me:
⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣀⣀⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿

**********************************************************************************************************
███████╗████████╗██╗  ██╗    ██╗    ██╗ █████╗ ██╗     ██╗     ███████╗████████╗     █████╗ ██████╗ ██╗  *
██╔════╝╚══██╔══╝██║  ██║    ██║    ██║██╔══██╗██║     ██║     ██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗██║  *
█████╗     ██║   ███████║    ██║ █╗ ██║███████║██║     ██║     █████╗     ██║       ███████║██████╔╝██║  *
██╔══╝     ██║   ██╔══██║    ██║███╗██║██╔══██║██║     ██║     ██╔══╝     ██║       ██╔══██║██╔═══╝ ██║  *
███████╗   ██║   ██║  ██║    ╚███╔███╔╝██║  ██║███████╗███████╗███████╗   ██║       ██║  ██║██║     ██║  *
╚══════╝   ╚═╝   ╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝  *
**********************************************************************************************************/

const functions = require("firebase-functions");
const express = require("express");
var http = require("https");
const cors = require("cors");
var $ = require("jquery");
const fetch = require("node-fetch");

////////////////////////////////
//////////eth imports///////////
///////////////////////////////
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
///////////////////////////////

const admin = require("firebase-admin");
admin.initializeApp();
const app = express();
const authMiddleware = require("./authMiddleware");
const { firestore } = require("firebase-admin");
app.use(authMiddleware);

//////////////////////////////////////////////
////////// Performing Transactions ///////////
/////////////////////////////////////////////

app.post("/:userID/send/", async (req, res) => {
  var userID = req.params.userID;
  var transactionData = await performTransaction(req);

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(transactionData.sendingAddress)
    .collection("transactions")
    .doc(transactionData.hash)
    .set({ transactionData });

  const newBalance = await transactionData.newBalance;

  res.status(201).send(JSON.stringify(newBalance));
});

performTransaction = async (req) => {
  const userID = req.params.userID;
  const providedMnemonic = req.body.mnemonic;
  const sendingWalletNumber = req.body.walletNumber;
  const recipient = req.body.recipient;
  const amountInEth = req.body.amount;

  const provider = new HDWalletProvider(
    providedMnemonic,
    "https://rinkeby.infura.io/v3/941246d7df7947e58393691a1be5455e",
    0,
    sendingWalletNumber + 1
  );
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  const note = req.body.note;
  const amountInWei = web3.utils.toWei(amountInEth, "ether");

  var transactionHash = "null";

  await web3.eth.sendTransaction(
    {
      from: accounts[sendingWalletNumber],
      to: recipient,
      value: amountInWei,
    },
    function (err, hash) {
      if (!err) transactionHash = hash;
    }
  );

  const newBalance = await getBalance(
    providedMnemonic,
    userID,
    sendingWalletNumber
  );

  return (docData = {
    receivingAddress: recipient,
    sendingAddress: accounts[sendingWalletNumber],
    amount: amountInEth,
    hash: transactionHash,
    note: note,
    time: Date.now(),
    newBalance: newBalance,
  });
};

getBalance = async (mnemonic, userID, walletNumber) => {
  const provider = new HDWalletProvider(
    mnemonic,
    "https://rinkeby.infura.io/v3/941246d7df7947e58393691a1be5455e",
    0,
    walletNumber + 1
  );
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[walletNumber], function (
    error,
    result
  ) {
    if (error) {
      console.log(error);
    } else {
      return result;
    }
  });
  const balanceInEth = web3.utils.fromWei(balance, "ether");
  saveBalance(balanceInEth, userID, accounts[walletNumber]);
  return balanceInEth;
};

saveBalance = async (balance, userID, sendingAddress) => {
  balanceData = {
    balance: balance,
    time: Date.now(),
  };

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(sendingAddress)
    .collection("balances")
    .doc("ethereum")
    .set({ balanceData });
};

///////////////////////////////////////////////////////
//////// Get All Wallets Of User With Names ///////////
//////////////////////////////////////////////////////
app.get("/wallets/:userID", async (req, res) => {
  const userID = req.params.userID;
  const snapshot = await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .get();

  let wallets = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    wallets.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(wallets));
});

//////////////////////////////////////////////
/////// Change Name Of Wallet ////////////////
/////////////////////////////////////////////
app.put("/:userID/wallets/changeName/:walletAddress", async (req, res) => {
  const userID = req.params.userID;
  const walletAddress = req.params.walletAddress;
  const newName = req.body.newName;

  const nameData = {
    name: newName,
  };

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(walletAddress)
    .update({ nameData });

  res.status(200).send();
});

//////////////////////////////////////////////
/////// Create New Wallet For User ///////////
//////////////////////////////////////////////
app.post("/wallets/createWallet/:userID", async (req, res) => {
  const userID = req.params.userID;
  const walletName = req.body.walletName;
  const providedMnemonic = req.body.mnemonic;

  const snapshot = await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .get();

  const walletCount = snapshot.size;

  const provider = new HDWalletProvider(
    providedMnemonic,
    "https://rinkeby.infura.io/v3/941246d7df7947e58393691a1be5455e",
    0,
    walletCount + 1
  );
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  const walletAddress = accounts[walletCount];

  let nameData = {
    name: walletName,
  };

  let numberData = {
    number: walletCount,
  };

  let mnemonicData = {
    mnemonic: providedMnemonic,
  };

  let returnData = {
    name: walletName,
    number: walletCount,
    address: walletAddress,
    mnemonic: providedMnemonic,
  };

  getBalance(providedMnemonic, userID, walletCount);

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(walletAddress)
    .set({ nameData, numberData, mnemonicData });

  getBalance(providedMnemonic, userID, walletCount);

  res.status(200).send(JSON.stringify(returnData));
});

///////////////////////////////////////////////////////
/////// Get Transactions from Specific Wallet /////////
///////////////////////////////////////////////////////
app.get("/:userID/transactions/:walletNumber/:mnemonic", async (req, res) => {
  let userID = req.params.userID;
  let walletNumber = req.params.walletNumber;
  let mnemonic = req.params.mnemonic;
  walletNumber = parseInt(walletNumber);

  getTransactionsFromEtherScan(mnemonic, userID, walletNumber);
  getBalance(mnemonic, userID, walletNumber);

  const provider = new HDWalletProvider(
    mnemonic,
    "https://rinkeby.infura.io/v3/941246d7df7947e58393691a1be5455e",
    0,
    walletNumber + 1
  );
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[walletNumber];

  const snapshot = await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(account)
    .collection("transactions")
    .get();

  let transactions = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    transactions.push({ id, ...data });
  });
  if (transactions.size === 0) {
    res.status(204).send();
  } else {
    res.status(200).send(JSON.stringify(transactions));
  }
});

getTransactionsFromEtherScan = async (mnemonic, userID, walletNumber) => {
  let body = "";
  const provider = new HDWalletProvider(
    mnemonic,
    "https://rinkeby.infura.io/v3/941246d7df7947e58393691a1be5455e",
    0,
    walletNumber + 1
  );
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const account = accounts[walletNumber];

  const etherscanURL = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;

  await http.get(etherscanURL, (res) => {
    res.setEncoding("utf8");

    res.on("data", (data) => {
      body += data;
    });
    res.on("end", () => {
      const jsObject = JSON.parse(body);

      let status = parseInt(jsObject.status);
      if (status === 1) {
        const transactions = jsObject.result;

        transactions.forEach(async (transaction) => {
          let receiver = transaction.to.toString();

          if (receiver.toLowerCase() === account.toLowerCase()) {
            const amountInEth = web3.utils.fromWei(transaction.value, "ether");

            let transactionData = {
              receivingAddress: transaction.to,
              sendingAddress: transaction.from,
              amount: amountInEth,
              hash: transaction.hash,
              note: "null",
              time: parseInt(transaction.timeStamp) * 1000,
            };

            await admin
              .firestore()
              .collection("users")
              .doc(userID)
              .collection("wallets")
              .doc(account)
              .collection("transactions")
              .doc(transactionData.hash)
              .set({ transactionData });
          }
        });
      }
    });
  });
  return body;
};

/////////////////////////////////////////////////////
/////////// Get Balance Of Specific Wallet //////////
////////////////////////////////////////////////////
app.get("/:userID/balance/:walletAddress", async (req, res) => {
  const userID = req.params.userID;
  const walletAddress = req.params.walletAddress;
  const doc = await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(walletAddress)
    .collection("balances")
    .doc("ethereum")
    .get();

  const data = doc.data();

  res.status(200).send(JSON.stringify(data));
});

//////////////////////////////////////////////////////////
////////////Delete a Wallet//////////////////////////////
////////////////////////////////////////////////////////
app.delete("/:userID/wallets/:walletAddress", async (req, res) => {
  const userID = req.params.userID;
  const walletAddress = req.params.walletAddress;

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(walletAddress)
    .delete();

  res.status(200).send();
});

//////////////////////////////////////////////////////////
/////////// Update Note of Specific Transaction //////////
/////////////////////////////////////////////////////////
app.put("/:userID/updateNote", async (req, res) => {
  const userID = req.params.userID;
  const address = req.body.address;
  const hash = req.body.hash;
  const note = req.body.note;

  await admin
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("wallets")
    .doc(address)
    .collection("transactions")
    .doc(hash)
    .update({
      "transactionData.note": note,
    });

  res.status(200).send();
});

///////////////////////////////
////////// Not used ///////////
//////////////////////////////
app.get("/:id", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("users")
    .doc(req.params.id)
    .get();

  const userId = snapshot.id;
  const userData = snapshot.data();

  res.status(200).send(JSON.stringify({ id: userId, ...userData }));
});

app.get("/:userID/getTransactions/:walletNumber/:mnemonic", async (req, res) => {
  let userID = req.params.userID;
  let walletNumber = req.params.walletNumber;
  let mnemonic = req.params.mnemonic;
  walletNumber = parseInt(walletNumber);

  await getBalance(mnemonic, userID, walletNumber);
  let body = await getTransactionsFromEtherScan(mnemonic, walletNumber);

  res.status(200).send(JSON.stringify(body));
});

app.put("/:id", async (req, res) => {
  const body = req.body;

  await admin.firestore().collection("users").doc(req.params.id).update(body);

  res.status(200).send();
});

exports.user = functions.https.onRequest(app);
