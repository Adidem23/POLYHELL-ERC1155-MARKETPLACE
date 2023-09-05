import '../CSS/HeroSection3.css';
import MLSC from '../Images/MLSC.png'
import Coder from '../Images/Coder.png'
import Aditya from '../Images/Aditya.jpg';
import VIT from '../Images/VIT.png';

const HeroSection3 = () => {
    return (
        <>

            <section className="hero3" style={{  height: "100vh" }}>
            
            <h2 className="heading-style-h1" style={{display:"block",margin:'auto',width:"fit-content"}}>Meet Us</h2>

                <div style={{ display: "flex", flexDirection:"row", justifyContent:"space-evenly" ,marginTop:"100px" ,marginBottom:"50px"}}>

                    <div className="card">
                        <img  src={MLSC}/>
                       
                        <div className="card__content">
                            <p className="card__title">MLSC VIT Pune 
                            </p><p className="card__description">Come Join With Us and Explore New Dimensions Of Technologies . Come And Dive Into World Of WEB3 and Web Dev and Explore With Us</p>
                            <img  src={VIT} style={{borderRadius:"20%", width:"200px" ,height:"40vh" , margin:'auto',display:"block" , marginTop:"20px"}}/>
                        </div>
                    </div>

                    <div className="card">
                        <img  src={Coder}/>
                        <div className="card__content">
                            <p className="card__title">Aditya Suryawanshi  
                            </p><p className="card__description">Hello  I am Aditya Suryawanshi Currently in Third Year Computer Science Department at VIT Pune</p>
                            <img  src={Aditya} style={{borderRadius:"20%", width:"200px" ,height:"40vh" , margin:'auto',display:"block" , marginTop:"20px"}}/>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default HeroSection3