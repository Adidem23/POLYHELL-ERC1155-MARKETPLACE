import '../CSS/Navbar.css'
import Logo from '../Images/PolyHell_Logo.png'
import { useState } from 'react';

const Navbar = () => {

    const [Account, setAccount] = useState("");

    const ConnectMetamask = async () => {

        const { ethereum } = window;

        const acc = document.getElementById('munde');

        const account = await ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(account[0]);

        ethereum.on('accountsChanged', async (accountnew) => {
            setAccount(accountnew[0]);
        })

        if (acc) {
            acc.innerText = "Connected";
        }

    }


    return (

        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="Logo" />
                <span className="logo-text">PolyHell</span>
            </div>

            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
                {Account && <li>{Account}</li>}
            </ul>


            <button className="connect-button but2" id='munde' onClick={ConnectMetamask}>Connect</button>
        </nav>
    );

};

export default Navbar;
