# Prediction Wagers

The <b>Prediction Wagers</b> dApp and User Interface let you propose or accept a DAI wager with user-defined odds, pertaining to Questions that are posted by the dApp creator.  
[<b>View the User Interface</b>](https://predictionwagers.github.io/v1.0/Predictor.htm)  
[<b>View the Source Code</b>](https://github.com/predictionwagers/v1.0)

The Proposer can post a wager by selecting the following parameters, pertaining to a particular Question:
* <b>Your Prediction:</b> Yes or No.
* <b>Your Deposit:</b> The maximum amount that you want to risk.
* <b>Minimum Wager:</b> You can prevent Acceptors from making tiny wagers that you would have to individually collect (if you win).
* <b>Profit Percentage Offered:</b> The "odds" you are offering, expressed in "American Odds" and Percentages.

***For example, here is a wager that someone could post:*** 
> I will bet a maximum of 10 DAI (minimum 2 DAI), that the Dow Jones Industrial Average will be higher than 19,000 on April 16 2020 4:00pm. I am offering a 125% profit (+125), so if you bet 2 DAI and you win, you will receive 4.5, for a profit of 2.5.

This dApp has the following advantages over other prediction-based dApps:
1. <b>Immediate payout:</b> You don't have to wait for dispute rounds, or for a consensus. When a wager resolves, your winnings are immediately transferred to your account.
2. <b>No risk of "Invalid market":</b> You don't have to worry that your winning wager is an "invalid market".
3. <b>Easy to Audit:</b> The entire client-side javascript User Interface is contained in just one HTML file. The solidity contract address is shown, so you can view the functions at [<b>Remix</b>](http://remix.ethereum.org/).
4. <b>Transportable:</b> There are no server-side calls. The User Interface can be run from any server.

To use the User Interface, you must use the Chrome or Firefox browser and be logged into MetaMask, with either the <b>Mainnet</b> or <b>Kovan Testnet</b> selected.
1. Click the <b>[Unlock DAI]</b> button, so the dApp can access DAI from the account that is selected in MetaMask.
2. The Proposer shall deposit DAI to cover their side of the wager. For example, if the Proposer offers a 125% profit on a 10 DAI wager, then they must deposit 12.5.
3. The Proposer may withdraw their deposit at any time before it is accepted.
4. If a Proposer wants to bet against their own Wager Proposal, the Proposer must use a different DAI account.
5. The Acceptor must unlock and deposit DAI, to accept at least the Minimum Proposed Wager.
6. The dApp creator will post the result for each Question within 30 minutes of its "Resolution Time".
7. The result ("YOU WON, or "YOU LOST") will then be shown under "Unresolved Wagers".
8. The winner may Resolve the wager at any time after the dApp creator has posted the result of the Question.
9. When a Wager is Resolved, the contract shall transfer the correct amount to each party, and the Proposer shall receive the balance of their deposit. 
For example, if the Proposer deposited 1.25 to offer a 125% profit on a 1 DAI wager, and the Acceptor wagered .5 and won, then the Acceptor would receive 1.15 (.5 + .625), and the Proposer would receive .625 (the balance of their 1.25 deposit).
10. The smallest allowable wager is .01, and all wagers and calculations are rounded down to two digits to the right of the decimal point. 
For example, if you enter a wager for .03 that pays 50% profit, then you will receive .01 profit (instead of .015).
11. The dApp creator shall receive a 1.5% transaction fee from each deposit. For example, a net deposit of 1 DAI shall require a gross deposit of 1.015.
12. A new version of this contract and User Interface will be released periodically. This help file shall contain links to all previous versions, so if you have a balance that has not yet been resolved, you may access the previous version to do so.

<b><i>Contracts for the Prediction Wagers dApp</i></b>:  
[Mainnet](https://etherscan.io/address/0x739194690d334f13104A78784F7FDAD48B4067c7)  
[Kovan](https://kovan.etherscan.io/address/0x739194690d334f13104A78784F7FDAD48B4067c7)  

The <b>Prediction Wagers</b> dApp and user interface were created by an anonymous author, and are publicly accessible. They can be run from any server, so this Github user is not responsible or liable for their usage. Please see the [Terms of Use](https://predictionwagers.github.io/v1.0/TermsOfUse.htm) for more information.
