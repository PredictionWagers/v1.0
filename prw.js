var gsGoodMetamaskNetwork, gnGoodNetworkID, gsContractAddress, gnGasPrice, gnTimerCountdown, gsLastTxHash, gcsContractAddress_MakeCoin, gobjContract, gobjMakeCoinContract, gsaQuestions = [], gnaExpirationDates = [], gcnNetworkMultiplier = 1, gsNetwork_prefix = "", cnUsingKovan = 1, cnUsingRopsten = 0; cnUsingKovan ? (gsGoodMetamaskNetwork = "kovan", gnGoodNetworkID = 42, gsContractAddress = "0x68c7249426c9CDFc6507842C99adE7819c789912", gcsContractAddress_MakeCoin = "0xbd44C4C9FaE76bB412D6181EEf14006447CFf14F", gcnNetworkMultiplier = .001, gsNetwork_prefix = "kovan.", gsNetwork_Name = "Kovan") : cnUsingRopsten ? (gsGoodMetamaskNetwork = "ropsten", gnGoodNetworkID = 3, gsContractAddress = "0x5f47a85c706392fe61657cb2b3d4659b96d46b01", gcnNetworkMultiplier = 10, gsNetwork_prefix = "ropsten.", gsNetwork_Name = "Ropsten") : (gsGoodMetamaskNetwork = "private", gnGoodNetworkID = 100, gsContractAddress = "0xf5f979d340e877f2762137eede61154b6f3a0eca", gsNetwork_Name = "xDai"); var da, gobjFromContract_Proposals, gobjFromContract_Acceptances, gobjFromContract_Questions, gnCurrentDateTime, gnMetaMaskOK = 0, gsMetaMaskNetwork = "", gcnLatestResolutionDate = 1577577600, gsDaiContractAddress_Kovan = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa", gsDaiContractAddress_Mainnet = "0x6B175474E89094C44Da98b954EedeAC495271d0F", gcsContract_Predictor_Kovan = "0x1649242853E60C4265d74414c12Da7e2ce47DA3b", gcsContract_Predictor_Mainnet = "0xc07291bbf52e8269552c0d53f14d915e1c1c945c", gcsContract_Predictor_live = gcsContract_Predictor_Kovan, gsDaiContractAddress_live = gsDaiContractAddress_Kovan, gsNetwork_name = "", gnTransactionFee_Multiplier = 1.015; async function DoLoad() { da = document.all, await DoHardMetamaskRefresh() } async function DoHardMetamaskRefresh() { await DoRefreshMetamask(), 1 == gnMetaMaskOK && (DoDisplayWorkingSplash(), await DoShowDataFromContract(), da.idDivAllDivs.style.display = "inline", da.divOverlay_Working.style.display = "none") } async function DoRefreshMetamask() { DoDisplayWorkingSplash(), gnMetaMaskOK = 0, gnUserETHBalance = 0; try { if (window.ethereum) { window.web3 = new Web3(ethereum); var e = await window.ethereum.request({ method: "eth_requestAccounts" }); gsUserETHAccount = e[0], gsCurrentNetwork = await web3.eth.net.getNetworkType(); var t = await web3.eth.net.getId(); if (gsCurrentNetwork == gsGoodMetamaskNetwork && t == gnGoodNetworkID) { gobjContract = new web3.eth.Contract(gobjABI, gsContractAddress), gobjMakeCoinContract = new web3.eth.Contract(gobjAbi_WAGER_MakeCoin, gcsContractAddress_MakeCoin), gnUserETHBalance = parseFloat(await gobjMakeCoinContract.methods.balanceOf(gsUserETHAccount).call()) * gcnNetworkMultiplier, gsFormattedUserETHBalance = "$" + parseFloat(gnUserETHBalance.toFixed(2)).toLocaleString("en", { minimumFractionDigits: 2 }); var o = await gobjMakeCoinContract.methods.allowance(gsUserETHAccount, gsContractAddress).call(); if (console.log("nApprovedTokens: " + o), gnUserETHBalance > 0 && o > 1e14 && (gnMetaMaskOK = 1, gnGasPrice = web3.utils.toWei(String(1), "gwei"), da.idSpanMetaMaskStatus.innerHTML = "Your <b>" + gsNetwork_Name + "</b> Account (<a target=_ex href='https://" + gsNetwork_prefix + "etherscan.io/address/" + gsUserETHAccount + "' class=bluelink>" + gsUserETHAccount.substring(0, 5) + "..</a></b>) has <font color=maroon><b>" + gsFormattedUserETHBalance + "</b></font> in <b>WAGER</b> tokens.", da.idSpanCurrentTime.innerHTML = await DoGetCurrentDateTime(), gobjFromContract_Questions = await gobjContract.methods.getQuestions().call(), gobjFromContract_Proposals = await gobjContract.methods.getProposals().call(), gobjFromContract_Acceptances = await gobjContract.methods.getAcceptances().call(), 1 != (gnTransactionFee_Multiplier = gobjFromContract_Questions.nTransactionFee_Divisor / 1e3))) { var a = ((1e3 * gnTransactionFee_Multiplier - 1e3) / 10).toFixed(1); da.idSpan_TransactionFee.innerHTML = "A " + a + "% transaction fee is added to each deposit or wager." } } } } catch (e) { console.log("Metamask ERROR:" + e) } 0 == gnMetaMaskOK && (da.idDivAllDivs.style.display = "none", gnUserETHBalance > 0 ? da.idSpanMetaMaskStatus.innerHTML = "Your <b>" + gsNetwork_Name + "</b> Account is: <a target=_ex href='https://" + gsNetwork_prefix + "etherscan.io/address/" + gsUserETHAccount + "' class=bluelink>" + gsUserETHAccount.substring(0, 5) + "..</a></b> <input type=button value='Unlock " + gsFormattedUserETHBalance + " in WAGER Tokens' onClick=DoUnlockTokens() style='background:navy;color:white;font-size:12px;font-weight:bold'>" : da.idSpanMetaMaskStatus.innerHTML = "<i>Use <b>MetaMask</b> to select a <b>" + gsNetwork_Name + '</b> account with <b>WAGER</b> tokens, then</i> <a class=bluelink href="javascript: DoHardMetamaskRefresh()"><b>Refresh Metamask</b>.'), da.divOverlay_Working.style.display = "none" } async function DoShowDataFromContract() { var e, t, o, a, r, n, i, s, l, c, d, b, g, u, f, p, w, y, h, m; for (gsaQuestions = [""], gnaExpirationDates = [0], e = 1; e < gobjFromContract_Questions.asDescriptions.length; e++)gsaQuestions.push(web3.utils.hexToUtf8(gobjFromContract_Questions.asDescriptions[e][0]) + web3.utils.hexToUtf8(gobjFromContract_Questions.asDescriptions[e][1]) + web3.utils.hexToUtf8(gobjFromContract_Questions.asDescriptions[e][2]) + web3.utils.hexToUtf8(gobjFromContract_Questions.asDescriptions[e][3])), gnaExpirationDates.push(gobjFromContract_Questions.anData[e][0]); for (D = "", e = gsaQuestions.length - 1; e >= 1; e--)gnaExpirationDates[e] <= gnCurrentDateTime || 0 != gobjFromContract_Questions.anData[e][1] || ("" != D && (D += "<font style='font-size:2px'><br></font>"), m = (m = new Date(1e3 * (gnaExpirationDates[e] - 18e3)).toISOString()).substr(0, 10) + " " + m.substr(11, 5), D += "<table width=99.5% bgcolor=white border=1 cellspacing=0 cellpadding=5 align=center><tr><td>", D += "<table width=100% cellspacing=0 cellpadding=0><tr>", D += "<td><span style='background:black;color:white'>" + gsaQuestions[e] + "</span> <font color=navy><b> Expires " + m + "</b></font></td>", D += "<td align=right><font color=navy><span id=idSpanProfitCalculation_" + e + "><i>Enter a <b>Deposit</b> to see <b>Maximum Wager</b>.</i></span></font></td></tr></table>", D += "\t\t\t\t\n<font color=maroon><b>Your prediction:</b></font> <select id=idCmbPredictionYesNo_" + e + "><option>Yes<option>No</select>\n<b>Your Deposit</b>\n<input type=text id=idTxtCreate_WagerDeposit_" + e + " style='width:40px' onKeyPress='return CheckWagerDepositForEnter(event," + e + ")' onBlur=DoProfitCalculation(" + e + ")>\n<b>Minimum Wager</b>\n<input type=text id=idTxtCreate_MinimumWager_" + e + " style='width:40px' onKeyPress='return NumericOnly(event)'>\n<b>Profit % offered</b>:\n<select id=idCmbCreate_Profit_" + e + " onChange=DoProfitCalculation(" + e + ")>\n<option value=10>(-1000) If you lose, you pay 10% of Acceptor's wager. If you win, you receive 1,000% of your wager.</option>\n<option value=20>(-500) If you lose, you pay 20% of Acceptor's wager. If you win, you receive 500% of your wager.</option>\n<option value=33>(-300) If you lose, you pay 33% of Acceptor's wager. If you win, you receive 303% of your wager.</option>\n<option value=40>(-250) If you lose, you pay 40% of Acceptor's wager. If you win, you receive 250% of your wager.</option>\n<option value=50>(-200) If you lose, you pay 50% of Acceptor's wager. If you win, you receive 200% of your wager.</option>\n<option value=57>(-175) If you lose, you pay 57% of Acceptor's wager. If you win, you receive 175% of your wager.</option>\n<option value=66>(-151) If you lose, you pay 66% of Acceptor's wager. If you win, you receive 151% of your wager.</option>\n<option value=75>(-133) If you lose, you pay 75% of Acceptor's wager. If you win, you receive 133% of your wager.</option>\n<option value=80>(-125) If you lose, you pay 80% of Acceptor's wager. If you win, you receive 125% of your wager.</option>\n<option value=90>(-111) If you lose, you pay 90% of Acceptor's wager. If you win, you receive 111% of your wager.</option>\n<option value=95>(-105) If you lose, you pay 95% of Acceptor's wager. If you win, you receive 105% of your wager.</option>\n<option value=100 selected>(+100) If you lose, you pay 100% of Acceptor's wager. If you win, you receive 100% of your wager.</option>\n<option value=105>(+105) If you lose, you pay 105% of Acceptor's wager. If you win, you receive 95% of your wager.</option>\n<option value=111>(+111) If you lose, you pay 111% of Acceptor's wager. If you win, you receive 90% of your wager.</option>\n<option value=125>(+125) If you lose, you pay 125% of Acceptor's wager. If you win, you receive 80% of your wager.</option>\n<option value=133>(+133) If you lose, you pay 133% of Acceptor's wager. If you win, you receive 75% of your wager.</option>\n<option value=150>(+151) If you lose, you pay 151% of Acceptor's wager. If you win, you receive 66% of your wager.</option>\n<option value=175>(+175) If you lose, you pay 175% of Acceptor's wager. If you win, you receive 57% of your wager.</option>\n<option value=200>(+200) If you lose, you pay 200% of Acceptor's wager. If you win, you receive 50% of your wager.</option>\n<option value=250>(+250) If you lose, you pay 250% of Acceptor's wager. If you win, you receive 40% of your wager.</option>\n<option value=300>(+303) If you lose, you pay 303% of Acceptor's wager. If you win, you receive 33% of your wager.</option>\n<option value=500>(+500) If you lose, you pay 500% of Acceptor's wager. If you win, you receive 20% of your wager.</option>\n<option value=1000>(+1000) If you lose, you pay 1,000% of Acceptor's wager. If you win, you receive 10% of your wager.</option>\n</select>\n&nbsp;&nbsp;&nbsp;&nbsp;<input type=button value='Submit' onClick=DoCreate_Submit(" + e + ") style='background:navy;color:white;font-size:15px;font-weight:bold'>\n", D += "</td></tr></table>"); "" == D && (da.idSpanCreateWagerProposalCaption.innerHTML = "There are no current Questions to create Wager Proposals"), da.idSpanQuestions.innerHTML = D; var v = gobjFromContract_Proposals.anData; D = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center style='height:150px'><tr><td valign=top><center><b><font color=maroon>Open Wager Proposals</font></b></center><font style='font-size:4px'><br></font>", D += "<table width=99.5% bgcolor=#ffffff border=1 cellspacing=0 cellpadding=4 align=center>"; var C = 1; for (e = v.length - 1; e >= 1; e--) { if (o = gobjFromContract_Proposals.aadrProposerAddress[e], gsUserETHAccount.toLowerCase() == o.toLowerCase() || !(gnaExpirationDates[v[e][6]] <= gnCurrentDateTime || 0 != v[e][9])) if (a = (Math.floor(100 * v[e][7]) / 100).toFixed(2), 0 == (r = (Math.floor(100 * v[e][2]) / 100).toFixed(2)) && (r = .1), n = (Math.floor(100 * CleanFloat(a * (100 / v[e][5]))) / 100).toFixed(2), !(parseFloat(r) > parseFloat(n) || 0 == a || gsUserETHAccount.toLowerCase() != o.toLowerCase() && parseInt(v[e][4]) <= gnCurrentDateTime)) C = 0, t = "https://" + gsNetwork_prefix + "etherscan.io/address/" + o, s = (Math.floor(100 * CleanFloat(n * (v[e][5] / 100))) / 100).toFixed(2), i = (Math.floor(100 * CleanFloat(parseFloat(n) + parseFloat(s))) / 100).toFixed(2), a = (a * gcnNetworkMultiplier).toFixed(2), r = (r * gcnNetworkMultiplier).toFixed(2), n = (n * gcnNetworkMultiplier).toFixed(2), s = (s * gcnNetworkMultiplier).toFixed(2), i = (i * gcnNetworkMultiplier).toFixed(2), (w = Math.round(1e4 / v[e][5])) >= 100 ? (y = "+" + w, h = "-" + w, 100 == w && (h = "+" + w)) : (y = "-" + v[e][5], h = "+" + v[e][5], 100 == v[e][5] && (y = "+" + v[e][5])), 1 == v[e][3] ? (_ = "<font color=green><b>YES</b></font>", A = "<font color=red><b>NO</b></font>") : (_ = "<font color=red><b>NO</b></font>", A = "<font color=green><b>YES</b></font>"), gsUserETHAccount.toLowerCase() == o.toLowerCase() ? sHTML_OKToBet = "<input type=button value='Cancel Wager Proposal' onClick=DoCancelProposal(" + e + ") style='background:green;color:white;font-size:15px;font-weight:bold'>" : (sHTML_OKToBet = "To bet on " + A + ", enter <font color=maroon><b>Your Wager:</b></font> <input type=text id=idTxtAcceptor_WagerDeposit" + e + " style='width:40px' onKeyPress='return NumericOnly(event)'>", sHTML_OKToBet += "<input type=button value='Submit' onClick=DoAcceptor_Submit(" + e + "," + r + "," + n + ") style='background:maroon;color:white;font-size:15px;font-weight:bold'>"), m = (m = new Date(1e3 * (v[e][4] - 18e3)).toISOString()).substr(0, 10) + " " + m.substr(11, 5), D += "<tr><td>", D += "<table width=100% cellspacing=0 cellpadding=0><tr>", gsUserETHAccount.toLowerCase() == o.toLowerCase() ? (D += "<td>On " + DoGetFormattedDateTime(v[e][0]) + ", you created a wager proposal (which has <b>" + a + "</b> remaining), that the answer to the following question is " + _ + ":</td>", D += "<td align=right><b>Minimum wager:</b> " + r + "&nbsp;&nbsp; <b>Maximum wager:</b> " + n + "</td></tr></table>", D += "<span style='background:black'><font color=white>" + gsaQuestions[v[e][6]] + "</font></span>", D += "<font color=navy><b> Expires " + m + "</b></font>", D += "<table width=100% cellspacing=0 cellpadding=0><tr>", D += "<td>You offered <b>" + v[e][5] + "% <i>profit</i></b> (" + h + "). If someone bets <b>" + n + "</b>, you risk losing <b>" + s + "</b>. If you win, you receive a <i><b>profit</b></i> that is <b>" + w + "%</b> of your risk (" + y + ").</td>") : (D += "<td>On " + DoGetFormattedDateTime(v[e][0]) + ", <a target=_ex class=bluelink href='" + t + "'>this Proposer (" + o.substr(0, 6) + "..)</a> deposited <b>" + a + "</b> to wager that the answer to the following question is " + _ + ":</td>", D += "<td align=right><b>Minimum wager:</b> " + r + "&nbsp;&nbsp; <b>Maximum wager:</b> " + n + "</td></tr></table>", D += "<span style='background:black'><font color=white>" + gsaQuestions[v[e][6]] + "</font></span>", D += "<font color=navy><b> Expires " + m + "</b></font>", D += "<table width=100% cellspacing=0 cellpadding=0><tr>", D += "<td><b>" + v[e][5] + "% <i>profit</i></b> is offered (" + h + "). If you wager <b>" + n + "</b> and win, you will receive <b>" + i + "</b>, for a <i><b>profit</b></i> of <b>" + s + "</b>.</td>"), D += "<td align=right>", D += sHTML_OKToBet, D += "</td>", D += "</tr></table>", D += "</td></tr>" } if (D += "</table>", D += "</td></tr></table>", C) { var D = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center><tr><td><center><b><font color=maroon>There are no Open Wager Proposals</font></b></center><font style='font-size:4px'><br></font></td></tr></table>"; da.idDivOpenProposals.style.height = "50px", da.idDivOpenProposals.innerHTML = D } else da.idDivOpenProposals.innerHTML = D; v = gobjFromContract_Acceptances.anData, anAddresses = gobjFromContract_Acceptances.aadrAcceptorAddress; var k = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center style='height:150px'><tr><td valign=top><center><b><font color=maroon>Your Unresolved Wagers</font></b></center><font style='font-size:4px'><br></font>"; k += "<table width=99.5% bgcolor=#ffffff border=1 cellspacing=0 cellpadding=4 align=center>"; var T = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center style='height:150px'><tr><td valign=top><center><b><font color=maroon>Your Resolved Wagers</font></b></center><font style='font-size:4px'><br></font>"; T += "<table width=99.5% bgcolor=#ffffff border=1 cellspacing=0 cellpadding=4 align=center>"; var M = 1, x = 1; for (e = v.length - 1; e > 0; e--)if (anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() || anAddresses[e][2].toLowerCase() == gsUserETHAccount.toLowerCase()) { var _, A; if (a = (Math.floor(100 * v[e][10].toString()) / 100).toFixed(2), 0 == (b = (Math.floor(100 * v[e][5]) / 100).toFixed(2)) ? (b = "0", g = "") : g = " (remaining balance)", d = anAddresses[e][1].toLowerCase() == gsUserETHAccount.toLowerCase() ? "You" : anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() ? "The Proposer" : "The Acceptor", c = (Math.floor(100 * v[e][2]) / 100).toFixed(2), o = anAddresses[e][2], l = anAddresses[e][0], t = "https://" + gsNetwork_prefix + "etherscan.io/address/" + o, u = "https://" + gsNetwork_prefix + "etherscan.io/address/" + l, s = (Math.floor(100 * CleanFloat(c * (v[e][7] / 100))) / 100).toFixed(2), i = (Math.floor(100 * CleanFloat(parseFloat(c) + parseFloat(s))) / 100).toFixed(2), (w = Math.round(1e4 / v[e][7])) >= 100 ? (y = "+" + w, h = "-" + w, 100 == w && (h = "+" + w)) : (y = "-" + v[e][7], h = "+" + v[e][7], 100 == v[e][7] && (y = "+" + v[e][7])), f = CleanFloat(parseFloat(b) - (parseFloat(s) + parseFloat(c))).toFixed(2), a = (a * gcnNetworkMultiplier).toFixed(2), b = (b * gcnNetworkMultiplier).toFixed(2), c = (c * gcnNetworkMultiplier).toFixed(2), s = (s * gcnNetworkMultiplier).toFixed(2), i = (i * gcnNetworkMultiplier).toFixed(2), p = "", 0 != (f = (f * gcnNetworkMultiplier).toFixed(2)) && (p = " + " + f + " remaining balance"), 1 == v[e][6] ? (_ = "<font color=green><b>YES</b></font>", A = "<font color=red><b>NO</b></font>") : (_ = "<font color=red><b>NO</b></font>", A = "<font color=green><b>YES</b></font>"), "0" != v[e][3]) x = 0, T += "<tr><td>", 3 == v[e][9] ? anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() ? (T += "<b><font color=purple>You Tied</font></b> for <b>" + c + "</b>.&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, you made a <b>" + c + "</b> wager with <a target=_ex class=bluelink href='" + t + "'>this Proposer (" + o.substr(0, 6) + "..)</a>. You bet that the answer to the following question is " + A + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: " + c + "</b>, <b>Proposer: " + c + "</b> + <b>" + a + "</b> (remaining balance)</td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>") : (T += "<b><font color=purple> You Tied</font></b> for <b>" + c + "</b>.&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, <a target=_ex class=bluelink href='" + u + "'>this Acceptor (" + l.substr(0, 6) + "..)</a> made a <b>" + c + "</b> wager with you. You bet that the answer to the following question is " + _ + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: " + c + "</b> + <b>" + a + "</b> (remaining balance), <b>Acceptor: " + c + "</b ></td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>") : (anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() && "0" == v[e][4] && (T += "<b><font color=green>You won " + s + "</font></b>, for a " + v[e][7] + "% profit (" + h + ").&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, you made a <b>" + c + "</b> wager with <a target=_ex class=bluelink href='" + t + "'>this Proposer (" + o.substr(0, 6) + "..)</a>. You bet that the answer to the following question is " + A + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: " + i + "</b> (" + c + " bet + " + s + " profit), <b>Proposer: " + b + "</b>" + g + "</td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>"), anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() && "0" != v[e][4] && (T += "<b><font color=red>You lost " + c + ".</font></b>&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, you made a <b>" + c + "</b> wager with <a target=_ex class=bluelink href='" + t + "'>this Proposer (" + o.substr(0, 6) + "..)</a>. You bet that the answer to the following question is " + A + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: 0</b>, <b>Proposer: " + b + " </b>(" + s + " bet + " + c + " profit" + p + ")</td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>"), anAddresses[e][0].toLowerCase() != gsUserETHAccount.toLowerCase() && "0" != v[e][4] && (T += "<b><font color=green>You won " + c + "</font></b>, for a " + w + "% profit (" + y + ").&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, <a target=_ex class=bluelink href='" + u + "'>this Acceptor (" + l.substr(0, 6) + "..)</a> made a <b>" + c + "</b> wager with you. You bet that the answer to the following question is " + _ + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: " + b + " </b>(" + s + " bet + " + c + " profit" + p + "), <b>Acceptor: 0</b></td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>"), anAddresses[e][0].toLowerCase() != gsUserETHAccount.toLowerCase() && "0" == v[e][4] && (T += "<b><font color=red>You lost " + s + "</font></b>, for a " + v[e][7] + "% loss (" + h + ").&nbsp;&nbsp;", T += "On <b>" + DoGetFormattedDateTime(v[e][1]) + "</b>, <a target=_ex class=bluelink href='" + u + "'>this Acceptor (" + l.substr(0, 6) + "..)</a> made a <b>" + c + "</b> wager with you. You bet that the answer to the following question is " + _ + ":", T += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", T += "<table width=100% cellspacing=0 cellpadding=0><tr>", T += "<td><b><font color=maroon>[Payout]</font></b> <b>You: " + b + "</b>" + g + ", <b>Acceptor: " + i + "</b> (" + c + " bet + " + s + " profit)</td>", T += "<td align=right>" + d + " resolved the bet at <b>" + DoGetFormattedDateTime(v[e][3]) + "</b>.</td>")), T += "</tr></table>", T += "</td></tr>"; else { M = 0; var F = "", I = 0; k += "<tr><td>", anAddresses[e][0].toLowerCase() == gsUserETHAccount.toLowerCase() ? (3 == v[e][9] ? F = "<font color=purple><b>YOU TIED.</b></font> To receive a <b>" + c + "</b> refund for your wager, click <b>[Resolve Wager]</b>." : v[e][9] == v[e][6] ? (F = "<font color=red><b>YOU LOST.</b></font>", I = 1) : F = 0 != v[e][9] ? "<font color=green><b>YOU WON!</b></font> To receive <b>" + i + "</b> (for a <b>" + v[e][7] + "% <i>profit</i></b> (" + h + ") of <b>" + s + "</b>),  click <b>[Resolve Wager]</b>." : "If you win, you will receive <b>" + i + "</b>, for a <b>" + v[e][7] + "% <i>profit</i></b> (" + h + ") of <b>" + s + "</b>.", k += "On " + DoGetFormattedDateTime(v[e][1]) + ", you made a <b>" + c + "</b> wager with <a target=_ex class=bluelink href='" + t + "'>this Proposer (" + o.substr(0, 6) + "..)</a>.", k += "&nbsp;&nbsp;You bet that the answer to the following question is " + A + ":<br>", k += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", k += "<table width=100% cellspacing=0 cellpadding=0><tr>", k += "<td>" + F + "</td>") : (3 == v[e][9] ? F = "<font color=purple><b>YOU TIED.</b></font> To receive a <b>" + c + "</b> refund for your wager, (plus your remaining deposit of <b>" + a + "</b>), click <b>[Resolve Wager]</b>." : v[e][9] == v[e][6] ? F = "<font color=green><b>YOU WON!</b></font> To receive <b>" + i + "</b>, for a <b>" + w + "% <i>profit</i></b> (" + y + ") of <b>" + c + "</b> (plus your remaining deposit of <b>" + a + "</b>), click <b>[Resolve Wager]</b>." : 0 != v[e][9] ? (F = "<font color=red><b>YOU LOST.</b></font>", "0.00" != a && (F += " To receive your remaining deposit of <b>" + a + "</b>, click <b>[Resolve Wager]</b>.")) : F = "If you win, you will receive <b>" + i + "</b>, for a <b>" + w + "% <i>profit</i></b> (" + y + ") of <b>" + c + "</b>, plus your remaining deposit of <b>" + a + "</b>.", k += "On " + DoGetFormattedDateTime(v[e][1]) + ", <a target=_ex class=bluelink href='" + u + "'>this Acceptor (" + l.substr(0, 6) + "..)</a> made a <b>" + c + "</b> wager with you.", k += "&nbsp;&nbsp;You bet <b>" + s + "</b> that the answer to the following question is " + _ + ":<br>", k += "<table cellspacing=0 cellpadding=0 bgcolor=black><tr><td><font color=white>" + gsaQuestions[v[e][8]] + "</td></tr></table>", k += "<table width=100% cellspacing=0 cellpadding=0><tr>", k += "<td>" + F + "</td>"), k += "<td align=right>", 0 == v[e][9] ? k += "The <font color=maroon><b>[Resolve Wager]</b></font> button will be displayed after the event has completed.</font>" : 0 == I && (k += "<input type=button value='Resolve Wager' onClick=DoResolveWager(" + e + ") style='background:black;color:white;font-size:13px;font-weight:bold'>"), k += "</td></tr></table>", k += "</td></tr>" } k += "</td></tr>" } if (k += "</table>", k += "</td></tr></table>", T += "</table>", T += "</td></tr></table>", M) { k = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center><tr><td><center><b><font color=maroon>You have no Unresolved Wagers</font></b></center><font style='font-size:4px'><br></font></td></tr></table>"; da.idDivUnresolvedWagers.style.height = "50px", da.idDivUnresolvedWagers.innerHTML = k } else da.idDivUnresolvedWagers.innerHTML = k; if (x) { T = "<table width=99.5% bgcolor=#f0ffff border=1 cellspacing=0 cellpadding=5 align=center><tr><td><center><b><font color=maroon>You have no Resolved Wagers</font></b></center><font style='font-size:4px'><br></font></td></tr></table>"; da.idDivResolvedWagers.style.height = "50px", da.idDivResolvedWagers.innerHTML = T } else da.idDivResolvedWagers.innerHTML = T } function NumericOnly(e) { var t = window.event ? e.keyCode : e.which; if (!(t >= 48 && t <= 57 || 46 == t || 0 == t || 8 == t)) return !1 } function NoQuotes(e) { if (34 == (window.event ? e.keyCode : e.which)) return !1 } function CheckWagerDepositForEnter(e, t) { var o = window.event ? e.keyCode : e.which; return 13 == o || 10 == o ? (DoProfitCalculation(t), !1) : (o >= 48 && o <= 57 || 46 == o || 0 == o || 8 == o) && void 0 } function DoProfitCalculation(e) { var t = "<i>Enter a <b>Deposit</b> to see <b>Maximum Wager</b>.</i>"; if (!isNaN(document.getElementById("idTxtCreate_WagerDeposit_" + e).value) && document.getElementById("idTxtCreate_WagerDeposit_" + e).value > 0) { var o = Math.floor(100 * document.getElementById("idTxtCreate_WagerDeposit_" + e).value) / 100; document.getElementById("idTxtCreate_WagerDeposit_" + e).value = o; var a = 100 / document.getElementById("idCmbCreate_Profit_" + e).options[document.getElementById("idCmbCreate_Profit_" + e).selectedIndex].value, r = Math.floor(o * a * 100) / 100; t = "Acceptor's <b>Maximum Wager</b> is <b>" + (r = parseFloat(r.toFixed(2)).toLocaleString("en-US", { minimumFractionDigits: 2 })) + "</b>." } document.getElementById("idSpanProfitCalculation_" + e).innerHTML = t } async function DoCreate_Submit(e) { await DoRefreshMetamask(), 0 != gnMetaMaskOK && setTimeout(function () { DoCreate_Submit2(e) }, 200) } async function DoCreate_Submit2(e) { var t = document.getElementById("idTxtCreate_WagerDeposit_" + e).value, o = 0; if (isNaN(t) ? o = 1 : (t = CleanFloat((t = Math.floor(100 * t) / 100) * gnTransactionFee_Multiplier), (isNaN(t) || t < .1 || t >= gnUserETHBalance) && (o = 1)), o) alert("The Deposit must be at least .1, and less than your Balance (after the transaction fee)."); else { "" == document.getElementById("idTxtCreate_MinimumWager_" + e).value && (document.getElementById("idTxtCreate_MinimumWager_" + e).value = ".1"); var a = document.getElementById("idTxtCreate_MinimumWager_" + e).value; if (isNaN(a)) alert("Minimum Wager must be at least .1."); else if (a = parseFloat(a), isNaN(a)) alert("Minimum Wager must be at least .1."); else { a < .1 && (a = .1), a = Math.floor(100 * a) / 100; var r = document.getElementById("idCmbCreate_Profit_" + e).options[document.getElementById("idCmbCreate_Profit_" + e).selectedIndex].value, n = Math.floor(100 * CleanFloat(document.getElementById("idTxtCreate_WagerDeposit_" + e).value * (100 / r))) / 100; if (parseFloat(a) > parseFloat(n)) alert("Minimum Wager cannot be greater than the Acceptor's Maximum Wager."); else if (CleanFloat(a * (r / 100)) < .1) alert("[Minimum Wager] times [Profit %] must be at least .1."); else if (confirm("The next Metamask Confirmation popup will cause $" + t.toFixed(2) + " to be transferred from your account.\n You may cancel your Wager Proposal before it is accepted.")) try { var i = document.getElementById("idCmbPredictionYesNo_" + e).selectedIndex, s = gnaExpirationDates[e]; i = 0 == i ? 1 : 2; var l = (t / gcnNetworkMultiplier).toFixed(), c = (a / gcnNetworkMultiplier).toFixed(), d = gobjContract.methods.zCreateProposal(l, c, i, s, r, e).encodeABI(); await DoSendSignedTransaction(d, 0, gsContractAddress) } catch (e) { alert("Error: " + e) } } } } function DoTimerCountdown() { --gnTimerCountdown <= 0 && location.reload(), DoDisplayWorkingTimer() } function DoDisplayWorkingTimer() { da.idSpanWorking.innerHTML = "<center><br><br><font style='font-size:15px'><b><font color=green>Your transaction is being stored on the blockchain.</font> To see a record of this transaction, click here: <a target=_ex href='https://" + gsNetwork_prefix + "etherscan.io/tx/" + gsLastTxHash + "' class=bluelink>" + gsLastTxHash.substr(0, 10) + "..</a><br><br>When completed, this page will refresh. It will take less than <font color=green>" + gnTimerCountdown + "</font> more seconds.</b></font><br><br><br></center>" } function DoDisplayWorkingSplash() { da.idSpanWorking.innerHTML = "<center><br><br><br><font color=green style='font-size:15px'><b>Loading data from blockchain, please wait ..</b></font><br><br><br><br></center>", da.divOverlay_Working.style.display = "block" } async function DoSendSignedTransaction(e, t, o) { try { var a = await web3.eth.estimateGas({ from: gsUserETHAccount, to: o, gasPrice: web3.utils.toHex(gnGasPrice), data: e, value: t }); a = (1.1 * a).toFixed(), console.log("nGasEstimate: " + a), sTransactionID = await web3.eth.sendTransaction({ from: gsUserETHAccount, to: o, data: e, gasLimit: web3.utils.toHex(a), gasPrice: web3.utils.toHex(gnGasPrice), value: t }).on("transactionHash", function (e) { gsLastTxHash = e, console.log("hash: " + e), gnTimerCountdown = 30, DoDisplayWorkingTimer(), da.divOverlay_Working.style.display = "block", setInterval(DoTimerCountdown, 1e3) }), location.reload() } catch (e) { alert("An error was encountered. Your transaction was not processed.") } } function DoGetFormattedDateTime(e) { var t = new Date(1e3 * (e - 18e3)).toISOString(); return t.substr(0, 10) + " " + t.substr(11, 5) } async function DoGetCurrentDateTime() { var e, t = await web3.eth.getBlock("latest"); gnCurrentDateTime = t.timestamp; var o = t.timestamp - 18e3; return (e = new Date(1e3 * o).toISOString()).substr(0, 10) + " " + e.substr(11, 5) } async function DoAcceptor_Submit(e, t, o) { await DoRefreshMetamask(), 0 != gnMetaMaskOK && setTimeout(function () { DoAcceptor_Submit2(e, t, o) }, 200) } async function DoAcceptor_Submit2(e, t, o) { var a = parseFloat(document.getElementById("idTxtAcceptor_WagerDeposit" + e).value); if (isNaN(a) || a < parseFloat(t) || a > parseFloat(o)) alert("Please enter a Wager that is between the Minimum and Maximum wager shown."); else if ((a = CleanFloat((a = Math.floor(100 * a) / 100) * gnTransactionFee_Multiplier)) >= gnUserETHBalance) alert("Your Wager must be less than your Balance."); else try { nWeiDeposit = (a / gcnNetworkMultiplier).toFixed(); var r = gobjContract.methods.zCreateAcceptance(nWeiDeposit, e).encodeABI(); await DoSendSignedTransaction(r, 0, gsContractAddress) } catch (e) { alert("Error: " + e) } } async function DoCancelProposal(e) { await DoRefreshMetamask(), 0 != gnMetaMaskOK && setTimeout(function () { DoCancelProposal2(e) }, 200) } async function DoCancelProposal2(e) { try { var t = gobjContract.methods.zCancelProposal(e).encodeABI(); await DoSendSignedTransaction(t, 0, gsContractAddress) } catch (e) { alert("Error: " + e) } } async function DoResolveWager(e) { await DoRefreshMetamask(), 0 != gnMetaMaskOK && setTimeout(function () { DoResolveWager2(e) }, 200) } async function DoResolveWager2(e) { try { var t = gobjContract.methods.zResolveWager(e).encodeABI(); await DoSendSignedTransaction(t, 0, gsContractAddress) } catch (e) { alert("Error: " + e) } } function CleanFloat(e) { return parseFloat(e.toFixed(9)) } function DoUnlockTokens() { DoSendSignedTransaction(gobjMakeCoinContract.methods.approve(gsContractAddress, -1).encodeABI(), 0, gcsContractAddress_MakeCoin) } function DoHardMetamaskRefresh_test() { DoSendSignedTransaction(gobjMakeCoinContract.methods.approve(gsContractAddress, -1).encodeABI(), 0, gcsContractAddress_MakeCoin) }