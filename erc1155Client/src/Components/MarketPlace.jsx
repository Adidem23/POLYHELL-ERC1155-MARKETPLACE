import '../CSS/Marketplace.css';
import { useContract, useAccounts } from '@thirdweb-dev/react';
import { useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import GoToTop from './GoToTop';

const MarketPlace = () => {

    const { contract } = useContract("0xe9fb18725384c0437705955edb5259D377CB7499");
    const [ListedNFT, setListedNFT] = useState([]);
    const [Account, setAccount] = useState('');

    const ReturnAllListingsOfMarketplace = async () => {
        const AllListedNFTS = await contract.directListings.getAll();
        console.log(AllListedNFTS);
        setListedNFT(await contract.directListings.getAllValid());
    }

    ReturnAllListingsOfMarketplace();

    const SetAccountMethod = async () => {
        const { ethereum } = window;

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccount(account[0]);

        ethereum.on('accountsChanged', async (accountnew) => {
            setAccount(accountnew[0]);
        })

    }

    SetAccountMethod();

    return (
        <>
            <section style={{ display: "block", width: "fit-content", margin: "auto", marginTop: "20px" }}>
                <h2 className="heading-style-h1">ERC1155 MarketPlace</h2>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                    <Jazzicon diameter={60} seed={jsNumberForAddress(`${Account}`)} />
                    <h4 className="heading-style-h6">{Account}</h4>
                </div>
                <hr />
            </section>

            <div id='ZanduBaam2'>

                {ListedNFT.map((val, key) => {
                    return (
                        <>
                            <div className="cardop1" style={{ marginLeft: "20px", marginTop: "10px" }}>
                                <div className="cardop1-imgop1"><div className="imgop1"><img src={ListedNFT[key].asset.image} alt='Image is Not Loaded..' /></div></div>
                                <div className="cardop1-titleop1">{ListedNFT[key].asset.name}</div>
                                <div className="cardop1-titleop1">{ListedNFT[key].asset.description}</div>

                                <div className="cardop1-titleop1"><Jazzicon diameter={20} seed={jsNumberForAddress(`${ListedNFT[key].creatorAddress}`)} />{(ListedNFT[key].creatorAddress).substring(0, 10)}
                                </div>

                                <hr className="cardop1-dividerop1" />
                                <div className="cardop1-footerop1">
                                    <div className="cardop1-priceop1"><span>{ListedNFT[key].currencyValuePerToken.displayValue} MATIC</span></div>
                                    <button className="cardop1-btnop1" onClick={async () => {
                                        const ListingIdTobuy = val.id;
                                        const quantityToBuy = val.quantity;
                                    
                                        const BuyedNFT = await contract.directListings.buyFromListing(ListingIdTobuy, quantityToBuy, Account);

                                        alert(BuyedNFT)

                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path><path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path><path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })}
                <GoToTop />
            </div>

        </>
    )
}

export default MarketPlace