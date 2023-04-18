import React, { useContext, useState } from 'react'
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Mail from '../../components/mail/Mail';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Hotel = () => {
  const location = useLocation()
  console.log(location)
  const id = location.pathname.split("/")[2]
  console.log({ id })

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, error, loading, reFetch } = useFetch(`/hotels/find/${id}`);

  const { dates } = useContext(SearchContext);
  // console.log(dates);

  //function to caluate the number of days between a range of dates

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  //function to handle sliding of the images
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  return (
    <div className=''>
      <Navbar />
      <Header type="list" />
      {
        loading ? "Loading..." 
        : (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                <div className="sliderWrapper">
                  <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
              </div>
            )}
            <div className="hotelWrapper">
              <button className='bookNow'>Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocation} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location - {data.distance} from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over {data.cheapestPrice} at this property and get a fee airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper">
                    <img onClick={() => handleOpen(i)} src={photo} alt="hotel_img" className='hotelImg' />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsText">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                    {data.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a 9-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>$945</b> (9 nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <Mail />
            <Footer />
          </div>
        )}
    </div>
  )
}

export default Hotel
