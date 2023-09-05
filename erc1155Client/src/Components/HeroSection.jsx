import '../CSS/HeroSection.css';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
    return (
        <section className="hero" style={{ display: "block", margin: "auto", marginTop: "35px", height: "fit-content", width: "fit-content" ,justifyItems:'center',alignItems:'center'}}>
             <Spline scene="https://prod.spline.design/zqFvtnTM1dVjnZb6/scene.splinecode"  style={{width:"100%"}}/>

            <button className='but2' id='buttonnichewala' style={{display:"block",margin:"auto" ,marginBottom:'auto',marginTop:'20px'}}>Explore</button>
        
        </section>
    );
};

export default HeroSection;