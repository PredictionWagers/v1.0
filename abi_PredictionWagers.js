var gobjABI = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ProposalID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "Acceptor",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "AcceptedAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "RemainingWager",
                "type": "uint256"
            }
        ],
        "name": "AcceptanceCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ProposalID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "Proposer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ProposalAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "MinimumWager",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "PredictedYesNo",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nResolutionDate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ProfitPercentOffered",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nQuestionID",
                "type": "uint256"
            }
        ],
        "name": "ProposalCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "QuestionID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "sDescription1",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "sDescription2",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "sDescription3",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "sDescription4",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nExpirationDate",
                "type": "uint256"
            }
        ],
        "name": "QuestionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ProposalID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "Proposer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "AmountRefunded",
                "type": "uint256"
            }
        ],
        "name": "WagerCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ProposalID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "Resolver",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "AcceptanceID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "DidProposerWin",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "AmountSentToProposer",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "AmountSentToAcceptor",
                "type": "uint256"
            }
        ],
        "name": "WagerResolved",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAcceptances",
        "outputs": [
            {
                "internalType": "uint256[11][]",
                "name": "anData",
                "type": "uint256[11][]"
            },
            {
                "internalType": "address[3][]",
                "name": "aadrAcceptorAddress",
                "type": "address[3][]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwnerBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "nOwnerBalance",
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
        "name": "getProposals",
        "outputs": [
            {
                "internalType": "uint256[10][]",
                "name": "anData",
                "type": "uint256[10][]"
            },
            {
                "internalType": "address[]",
                "name": "aadrProposerAddress",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getQuestions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "nTransactionFee_Divisor",
                "type": "uint256"
            },
            {
                "internalType": "uint256[2][]",
                "name": "anData",
                "type": "uint256[2][]"
            },
            {
                "internalType": "bytes32[4][]",
                "name": "asDescriptions",
                "type": "bytes32[4][]"
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
                "internalType": "uint256",
                "name": "nProposalID",
                "type": "uint256"
            }
        ],
        "name": "zCancelProposal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nTokenQuantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nProposalID",
                "type": "uint256"
            }
        ],
        "name": "zCreateAcceptance",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nTokenQuantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nMinimumWager",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nPredictedYesNo",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nResolutionDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nProfitPercentOffered",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nQuestionID",
                "type": "uint256"
            }
        ],
        "name": "zCreateProposal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "sDescription1",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "sDescription2",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "sDescription3",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "sDescription4",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "nExpirationDate",
                "type": "uint256"
            }
        ],
        "name": "zCreateQuestion",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nQuestionID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nDidYesWin",
                "type": "uint256"
            }
        ],
        "name": "zFinalizeQuestion",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "zKill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "adrUser",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "nAmountToReceive",
                "type": "uint256"
            }
        ],
        "name": "zReceiveTokensFromUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nAcceptanceID",
                "type": "uint256"
            }
        ],
        "name": "zResolveWager",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "adrUser",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "nAmountToSend",
                "type": "uint256"
            }
        ],
        "name": "zSendTokensToUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nTransactionFee",
                "type": "uint256"
            }
        ],
        "name": "zSetTransactionFee",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "zWithdrawOwnerBalance",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]