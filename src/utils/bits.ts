export const bits = [
    {
        id: '1',
        slug: 'scaling-with-alts',
        type: 'tech',
        date: '28 nov 2025',
        title: 'scaling solana via lookup tables',
        content: "normally, a solana transaction can only fit about 30-40 accounts before hitting the packet size limit. address lookup tables (alts) solve this by storing full 32-byte public keys on-chain in a table, allowing you to reference them in a transaction using simple 1-byte indices.\n\nto the smart contract, these accounts look exactly like normal ones. the magic happens client-side: you create a table, extend it with pubkeys, and then compile a v0 message that references the table. it is a massive scaling win for complex compositions that need to touch hundreds of state accounts at once.",
        tags: ['solana', 'scaling', 'optimization']
    },
    {
        id: '2',
        slug: 'delegates-vs-multisigs',
        type: 'tech',
        date: '03 nov 2025',
        title: 'solana delegates are not multisigs',
        content: "there is often confusion between delegates and multisigs, but they solve different problems. a delegate is a permission model: you use the 'approve' instruction to give another wallet temporary access to spend your tokens. you remain the owner, and you can revoke this access at any time.\n\na multisig wallet is a shared ownership model. the authority of the token account is the multisig vault itself, not any single signer. transactions only execute when a threshold of members approve. essentially: a delegate is a temporary keycard; a multisig is a vault with multiple keys.",
        tags: ['solana', 'security', 'patterns']
    },
    {
        id: '3',
        slug: 'rust-threadpool-drop-safety',
        type: 'tech',
        date: '02 nov 2025',
        title: 'rust threadpool shutdown safety',
        content: "when implementing the drop trait for a threadpool, iterating with `vec::drain(..)` is tempting but dangerous. it destructively empties the vector immediately. if a thread panics mid-loop, you lose track of the remaining workers in the vector, making a graceful shutdown impossible.\n\nthe safer approach is iterating mutably and using `option::take()`. this allows you to extract the thread handle while leaving `none` in its place, keeping the vector structure intact. this prevents double joins and ensures that even if one thread panics, the others remain accessible for cleanup.",
        tags: ['rust', 'concurrency', 'systems']
    },
    {
        id: '4',
        slug: 'litesvm-testing',
        type: 'tech',
        date: '30 oct 2025',
        title: 'testing solana programs via litesvm',
        content: "traditional `anchor test` runs are slow because they spin up a local validator and communicate via rpc. litesvm changes this by providing a lightweight, in-memory solana vm that runs directly in rust. it simulates account loading, cpi calls, and pda derivations in milliseconds without any network overhead.\n\nthe catch is that it simulates logic, not economics. it won't enforce rent, fees, or consensus rules. however, you can manually spawn accounts with specific lamports to test edge cases. use litesvm for rapid unit testing of logic, and save the heavy validator tests for final integration checks.",
        tags: ['solana', 'anchor', 'testing', 'rust']
    },
    {
        id: '5',
        slug: 'spl-mints-vs-accounts',
        type: 'tech',
        date: '19 oct 2025',
        title: 'spl mints vs token accounts', 
        content: "on solana, a mint only defines the token metadata; it doesn't hold value. tokens live in token accounts (tas) which link an owner to a mint. most users rely on associated token accounts (atas)—deterministic pdas derived from the wallet and mint—ensuring every user has exactly one standard account per token.\n\nminting requires the mint authority, while transfers need the owner's signature on the source ta. unlike ethereum's contract-mapped balances, solana accounts are distinct storage slots. closing a ta returns rent to the destination, but this operation fails unless the token balance is strictly zero.",
        tags: ['solana', 'spl-tokens', 'rust']
    },
    {
        id: '6', // New Life Bit
        slug: 'crossroads-and-chai',
        type: 'life',
        date: '11 dec 2025',
        title: 'crossroads and chai', // 3 words
        content: "we often stand at crossroads, paralyzed by the weight of decision. we ask if these tangled problems are life's essence, or if living is simply the courage to set worries aside. these questions spiral endlessly, each answer only breeding more confusion.\n\nperhaps the solution isn't to drown in heavy choices, but to enjoy the tea at hand. that simple cup of 'chai' that fuels you for another hour is a valid choice in itself—and honestly, a pretty good one. maybe life was never about making the right choice, but about living every day fully.",
        tags: ['philosophy', 'chai', 'life']
    }
   
];