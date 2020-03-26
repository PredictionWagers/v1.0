# Predictor

The <b>Predictor</b> dApp lets you propose or accept a wager with user-defined odds, pertaining to questions that are posted by the contract owner. 
[<b>View the User Interface</b>](https://predictionwagers.github.io/v1.0/Predictor.htm)  
[<b>View the Source Code</b>](https://github.com/predictionwagers/v1.0)

The Proposer will post a wager by selecting the following parameters:
* Total Wager Proposed (ETH)
* Minimum Wager Accepted
* Above or Below
* Target Price
* Resolution Date/Time
* Profit Percentage Offered
* Resolution Source: fiatcontract.com or MakerDAO Medianizer

***For example, here is a wager that someone could post:*** 
> I will bet a maximum 1 ETH (minimum .5 ETH), that the ETH/USD price will be above 146 immediately after 12/4/19 1:00 UTC. I am offering a 150% profit, so if you win, you will receive 2.5 ETH, for a profit of 1.5 ETH.

This dApp has the following advantages over other prediction-based dApps:
1. <b>Immediate payout:</b> You don't have to wait for dispute rounds, or for a consensus. When a wager resolves, your winnings are immediately transferred to your account.
2. <b>No risk of "Invalid market":</b> You don't have to worry that your winning wager is an "invalid market".
3. <b>Easy to Audit:</b> The entire client-side javascript User Interface is contained in just one HTML file. The solidity contracts are verified, so you can view their source code at Etherscan.
4. <b>100% De-centralized:</b> There are no server-side calls. The **Resolution Sources** are all called by the static contract, to other static contracts.

To use the User Interface, you must be logged into MetaMask, with either the Mainnet or Ropsten Testnet selected.
1. The Proposer shall deposit ETH to cover their side of the wager. For example, if the Proposer offers a 125% profit on a 1 ETH wager, then they must make a net deposit of 1.25 ETH.
2. The Proposer may withdraw their deposit at any time before it is accepted.
3. A Proposer must use a different Ether account to bet against their own Wager Proposal.
4. The Acceptor may deposit ETH before the Resolution Time, to accept at least the Minimum Proposed Wager.
5. Either party (Proposer or Acceptor) may Resolve the wager at any time after the Resolution Time.
6. When a Wager is Resolved, the contract shall transfer the correct amount to each party, and the Proposer shall receive the balance of their deposit. For example, if the Acceptor wagered .5 ETH and won, and the Proposer offered a 125% profit on a 1 ETH wager, then the Acceptor would receive 1.15 (.5 + .625), and the Proposer would receive .625 (the balance of their 1.25 ETH deposit).
7. The smallest allowable wager is .001, and all wagers and calculations are rounded down to three digits to the right of the decimal point. For example, if you enter a wager for .003 that pays 50% profit, then you will receive .001 profit (instead of .0015).
8. ETH/USD prices are rounded down to two digits to the right of the decimal point. For example, if you bet that the price will be above 157.54, and the resolved price was 157.549, then you would not win, since the rounded-down resolved price (157.54) is not above 157.54.
9. The Contract Creator shall receive a 1.5% transaction fee from each deposit. For example, a net deposit of 1 ETH shall require a gross deposit of 1.015.
10. A new version of this contract will be released on 2020-01-01, so all Resolution Times for this contract must be before 2019-12-29 00:00 (UTC).

<b><i>Contracts for the Predictor dApp</i></b>:  
[Mainnet](https://etherscan.io/address/0x739194690d334f13104A78784F7FDAD48B4067c7)  
[Kovan](https://ropsten.etherscan.io/address/0x739194690d334f13104A78784F7FDAD48B4067c7)  

<b><i>Event Log Explorer</i></b>:  
[Mainnet](https://www.etherlogs.com/?address=0x739194690d334f13104A78784F7FDAD48B4067c7&network=Main)  
[Kovan](https://www.etherlogs.com/?address=0x739194690d334f13104A78784F7FDAD48B4067c7&network=Ropsten)  

The Predictor dApp and user interface are decentralised, and therefore can be run from any server. This Github user is not responsible for the Predictor dApp or user interface. Please see the [Terms of Use](https://predictionwagers.github.io/v1.0/TermsOfUse.htm) for more information.
