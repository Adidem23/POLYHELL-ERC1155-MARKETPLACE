import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import HeroSection2 from "./HeroSection2"
import HeroSection3 from "./HeroSection3"
import Footer from '../Components/Footer';

const ComposeAll = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer/>
    </>
  )
}

export default ComposeAll