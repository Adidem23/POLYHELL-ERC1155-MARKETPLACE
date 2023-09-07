import '../CSS/MintNFT.css'
import { useState } from 'react'
import {  ThirdwebSDK, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';
import GoToTop from './GoToTop';
import toast, { Toaster } from 'react-hot-toast';
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/react";


const MintNFT = () => {

    const [NFTName, setNFTName] = useState("Name");
    const [NFTDescription, setNFTDescription] = useState("Description")
    const [SupplyNumber, setSupplyNumber] = useState(0)
    const [Image, setImage] = useState(null)
    const [Image1, setImage1] = useState(null)
    const [ClickedForImage, setClickedForImage] = useState(false)
    const [GetAllNFTS, setGetAllNFTS] = useState([]);
    const [SuccessToastWork, setSuccessToastWork] = useState(false);
    const [BurntNft, setBurntNft,] = useState(false);
    const [Account, setAccount] = useState("")
    const { contract } = useContract("0xDC5A319945E0c84e7A559DC2FbCC99fB7f88c43a");

    const InputNameHandle = async (e) => {
        setNFTName(e.target.value);
    }

    const InputDescHandle = async (e) => {
        setNFTDescription(e.target.value);
    }

    const InputSupplyHandle = async (e) => {
        setSupplyNumber(e.target.value);
    }

    const HandleFile = async (event) => {

        setClickedForImage(true);

        const selectedImage = event.target.files[0];

        setImage1(selectedImage);

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target.result;
                console.log(fileContent);
            };

            setImage(URL.createObjectURL(selectedImage))
        }


    }

    const CreateSparkles = () => {
        var end = Date.now() + (15 * 1000);

        var colors = ['#bb0000', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    const ConnectToMetamask = async () => {
        const { ethereum } = window;

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(account[0]);

        ethereum.on('accountsChanged', async (accountnew) => {
            setAccount(accountnew[0]);
        })

    }
    ConnectToMetamask();


    const MintNftGiven = async (e) => {
        e.preventDefault();
        try {
            await ListNFT();
            CreateSparkles();
            SuccessToast();
        } catch (err) {
            console.log(err + "OOPS Error is Occured")
        }

    }

    const getAllNFtsofUsers = async () => {
        const AllNfts = await contract.erc1155.getOwned(Account);
        setGetAllNFTS(AllNfts);
    }

    getAllNFtsofUsers();


    const ListNFT = async () => {

        const providers = new ethers.providers.Web3Provider(window.ethereum);
        const Signers = new ethers.Wallet("5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef", providers);

        const sdk = ThirdwebSDK.fromSigner(Signers)
        sdk.wallet.connect(Signers);

        const ContractAsa = await sdk.getContract("0xDC5A319945E0c84e7A559DC2FbCC99fB7f88c43a");
        await ContractAsa.roles.grant("minter", Account);

        const MetadataWithSupply = {
            supply: Number(SupplyNumber),
            metadata: {
                name: NFTName,
                description: NFTDescription,
                image: Image1
            }
        }
        const signedPayload = await contract.erc1155.mintTo(Account, MetadataWithSupply);
        console.log(signedPayload);

    }

    const generateToast = () => {
        toast('Burnt NFT Sucessfully!',
            {
                icon: '🔥',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        setBurntNft(true);
    }

    const SuccessToast = () => {
        toast.success('NFT Minted Successfully', {
            icon: '🎇🥳',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
        setSuccessToastWork(true);
    }





    return (
        <>
            <div style={{ display: "block", margin: "auto", width: "fit-content", marginTop: "250px", }}>

                <div style={{ display: "flex", flexDirection: "row", border: "3px solid yellow" }}>

                    <div className="wrapper">
                        <div className="card-switch">
                            <label className="switch">
                                <input type="checkbox" className="toggle" />
                                <span className="slider"></span>
                                <span className="card-side"></span>

                                <div className="flip-card__inner">
                                    <div className="flip-card__front">
                                        <div className="title">Enter Metedata</div>
                                        <form className="flip-card__form" action="">

                                            <input className="flip-card__input" type="text" onChange={InputNameHandle} placeholder='Name of NFT' />

                                            <input className="flip-card__input" type="text" onChange={InputDescHandle} placeholder='Description of NFT' />

                                            <input className="flip-card__input" type="number" onChange={InputSupplyHandle} placeholder='SupplyNumber' />

                                        </form>
                                        <div>
                                            <button className='flip-card__btn' onClick={MintNftGiven}>Mint</button>
                                        </div>
                                    </div>

                                    <div className="flip-card__back" id='upload'>
                                        {!ClickedForImage ? <label className="custum-file-upload" htmlFor="file">
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" ></path> </g></svg>
                                            </div>
                                            <div className="text" id='ImageUpload'>
                                                <span>Click to upload image</span>
                                            </div>
                                            <input type="file" accept='image/*' id="file" onChange={HandleFile} value={Image} />
                                        </label> : <><img src={Image} style={{ background: "#000" }} id='imageuploaded' /></>}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            <section style={{ margin: "auto", display: "block", width: "fit-content" }}>

                <h2 className="heading-style-h1">Your Owned NFTs</h2>
                <hr />

                <h4>Account Connected:{Account}</h4>

                <br />
                <br />

                <div id='zanduBaam'>
                    {GetAllNFTS.map((val) => {
                        return (<>

                            <div className="cardop">
                                <div className="imageop">
                                    <img src={val.metadata.image} alt="😒😒" />
                                </div>
                                <div className="card-infoop">
                                    <span>{val.metadata.name}</span>
                                    <p>{val.metadata.description}</p>
                                    <a href={val.metadata.uri} style={{ color: "black", listStyle: "none", textDecoration: "none" }} >IPFS URI</a>

                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <button className="buttonop" onClick={async (e) => {
                                        e.preventDefault();
                                        const TokenIdToBurn = val.metadata.id;
                                        const SupplyNumberToBurn = val.quantityOwned;
                                        const result = await contract.erc1155.burnFrom(Account, TokenIdToBurn, SupplyNumberToBurn);
                                        console.log(result);
                                        generateToast();
                                    }}>Burn</button>

                                    <button className="buttonop" style={{ marginLeft: "15px" }}
                                        onClick={async () => {

                                            const providers = new ethers.providers.Web3Provider(window.ethereum);

                                            const Signers = providers.getSigner();

                                            const sdk = ThirdwebSDK.fromSigner(Signers)
                                            sdk.wallet.connect(Signers);

                                            const MarketPlaceContract = await sdk.getContract("0xe9fb18725384c0437705955edb5259D377CB7499");
                                            
                                            const listing = {
                                                assetContractAddress: "0xDC5A319945E0c84e7A559DC2FbCC99fB7f88c43a",
                                                tokenId:val.metadata.id,
                                                quantity: val.quantityOwned,
                                                currencyContractAddress: NATIVE_TOKEN_ADDRESS , 
                                                pricePerToken: 0.00001,
                                                startTimestamp: new Date(Date.now()),
                                                endTimestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                                                isReservedListing: false
                                              }
                                              
                                              const tx = await MarketPlaceContract.directListings.createListing(listing);
                                              console.log(tx);

                                        }}>MarketPlace</button>

                                </div>
                            </div>
                        </>)
                    })}
                </div>

            </section>

            <GoToTop />

            {(BurntNft && !SuccessToast) && <Toaster
                position="bottom-center"
                reverseOrder={false}
            />}

            {(SuccessToastWork && !BurntNft) && <Toaster
                position="top-right"
                reverseOrder={false}
            />}

        </>

    )
}

export default MintNFT