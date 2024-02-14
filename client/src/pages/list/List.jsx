import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import './list.css';
import { use } from 'react-router-dom';
import { format } from 'date-fns'
import DateRange from 'react-date-range/dist/components/DateRange';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom';

const List = () => {

  const location = useLocation();
  console.log(location);
  //using the states sent from the navigate function
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  //console.log(location);

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label htmlFor="">Destination</label>
              <input type="text" name="" id="" placeholder={destination} />
            </div>
            <div className="listItem">
              <label htmlFor="">Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {
                  `${format(dates[0].startDate, "dd/MM/yyy")} 
                 to 
                 ${format(dates[0].endDate, "dd/MM/yyy")}`
                }
              </span>
              {openDate &&
                (
                  <DateRange
                    onChange={item => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )
              }
            </div>
            <div className="listItem">
              <label htmlFor="">Options</label>
              <div className="listOptions">
                <div className="listOptionItem">
                  <span className="listOptionText">Min price <small>per night</small></span>
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Max price <small>per night</small></span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adult</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading..." : <>
              {data.map((item) => (
                <SearchItem item={item} key={item.id} />
              ))}
            </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default List
