const {Connection,clusterApiUrl,
    PublicKey
} = require('@solana/web3.js');

// Replace with your actual program ID (the Transfer Hook program)
const programId = new PublicKey("8tfsdLgqEHc5BM7qY8A7UCSiLAutFyHHJ6UNXYtoD1Jd");

// Replace with your actual mint address
const mintAddress = new PublicKey("2mEQ3Ywf1Q4dn3Q1XLTNg5Rrdb1xSNXpBpi9qpvqsqGQ");

(async () => {
    // Deriving the extra_account_meta_list address using the mint and seed
    const [extraAccountMetaList] = await PublicKey.findProgramAddress(
        [Buffer.from("extra-account-metas"), mintAddress.toBuffer()],
        programId
    );

    console.log("Derived Extra Account Meta List Address:", extraAccountMetaList.toBase58());
})();


(async () => {
    // Deriving the counter account address using the seed
    const [counterAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("counter")],
        programId
    );

    console.log("Derived Counter Account Address:", counterAccount.toBase58());
})();



(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    
    // Fetch Extra Account Meta List data
    const extraAccountMetaListInfo = await connection.getParsedAccountInfo(new PublicKey('J5uZPCrmseU49W11sEmPBPSYcGPvTXrx1aQiTx6sFATs'));
    console.log('Extra Account Meta List Info:', extraAccountMetaListInfo);

    // Fetch Counter Account data
    const counterAccountInfo = await connection.getParsedAccountInfo(new PublicKey('AiVQzrpRGDdue3TpkMFMTEF4vjDk2ZbHefgvb4HdfvMa'));
    console.log('Counter Account Info:', counterAccountInfo);
})();



/*
From the output you provided:

Extra Account Meta List Address: D8ZUg78skXM6mtCL6iLzAdjvcNgW1Civ1zRzR2fs7i1i
Info: value: null – This means that the Extra Account Meta List account does not exist or hasn't been initialized yet.
Counter Account Address: 9ZNDGK7ykXmYYDuS24uJvRezbDnja1j5LTTtVVwQ24mH
Info: The Counter Account exists, and the data returned is valid. It shows some initialized data (probably the transfer count), 
but the exact format of the data isn't human-readable without decoding.
What This Means:
Extra Account Meta List: Since the value: null indicates that the Extra Account Meta List is not initialized, 
this is likely causing the "invalid account data" error during the transfer. The Transfer Hook program expects this account to be initialized with the correct structure and data.

Counter Account: The Counter Account exists and seems to be correctly initialized.

Next Steps:
You need to initialize the Extra Account Meta List. This can be done by calling the initialize_extra_account_meta_list 
function in your Transfer Hook program. The initialization process will set up the required data and make the account ready for use in the transfer process.
*/