import Featured from '../../components/featured/Featured';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Mail from '../../components/mail/Mail';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Home guests love</h1>
        <FeaturedProperties />
        <Mail />
        <Footer />
      </div>
    </div>
  )
}

export default Home
