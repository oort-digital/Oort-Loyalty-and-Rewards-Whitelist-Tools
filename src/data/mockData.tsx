
// test data
import user1 from "../images/test-images/user1.png";
import user4 from "../images/test-images/avatar1.png";
import user3 from "../images/test-images/avatar.png";
import user2 from "../images/test-images/user2.png";

export const scores: any[] = [
    {
        dimension: "DeFi",
        details: [
            {
                score: 89,
                text: "Address age 3 years 76 days",
                done: true,
                images: [],
            },
            {
                score: 388,
                text: "Created 23134 TXs onchain",
                done: true,
                images: [],
            },
            {
                score: 400,
                text: "Participated in 4 DeFi projects",
                done: true,
                images: [user1, user4, user3],
            },
            {
                score: 7882,
                text: "$ 1,000 Trading volume on Uniswap",
                done: true,
                images: [user2],
            },
        ],
    },
    {
        dimension: "NFT",
        details: [
            {
                score: 89,
                text: "Address age 3 years 76 days",
                done: false,
                images: [],
            },
            {
                score: 1000,
                text: "BAYC #1672 Holder",
                done: false,
                images: [user1, user4, user3],
            },
            {
                score: 1800,
                text: "Minted 6 NFT projects",
                done: false,
                images: [user2, user1, user4, user3, user4, user2],
            },
        ],
    },
    {
        dimension: "GamFi",
        details: [
            {
                score: 89,
                text: "Address age 3 years 76 days",
                done: false,
                images: [],
            },
            {
                score: 1000,
                text: "$ 1,000 Trading volume on Uniswap",
                done: false,
                images: [user2],
            },
            {
                score: 1800,
                text: "Participated in 4 DeFi projects",
                done: false,
                images: [user1, user4, user3, user2],
            },
        ],
    },
    {
        dimension: "Activity",
        details: [
            {
                score: 89,
                text: "Address age 3 years 76 days",
                done: false,
                images: [],
            },
            {
                score: 1000,
                text: "$ 1,000 Trading volume on Uniswap",
                done: false,
                images: [user2],
            },
            {
                score: 1800,
                text: "Participated in 4 DeFi projects",
                done: false,
                images: [user1, user4, user3, user2],
            },
        ],
    },
    {
        dimension: "DeFi",
        details: [
            {
                score: 89,
                text: "Address age 3 years 76 days",
                done: false,
                images: [],
            },
            {
                score: 1000,
                text: "$ 1,000 Trading volume on Uniswap",
                done: false,
                images: [user2],
            },
            {
                score: 1800,
                text: "Participated in 4 DeFi projects",
                done: false,
                images: [user1, user4, user3, user2],
            },
        ],
    },
];
