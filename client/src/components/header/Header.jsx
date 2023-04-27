import React, { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendar, faCar, faMountainCity, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns" //convert the javascript date format into a readable string
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openPersonOptions, setOpenPersonOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    //this function handles the number of adult, children and rooms options
    const handleOption = (name, operation) => {
        setOptions({
            //copy the prev state
            ...options,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1
        })
        //console.log(options[name]);
    }

    const navigate = useNavigate();

    //make use of the context api
    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        //dispatch the new search action
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        //navigate to the page, then send the follwoing state to the component
        navigate("/hotels", { state: { destination, dates, options } });
    }

    const { user } = useContext(AuthContext);

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className={type === "list" ? "headerList list" : "headerList"}>
                    <div className="headerListitem active">
                        <FontAwesomeIcon icon={faBed} />
                        <spa>Stays</spa>
                    </div>
                    <div className="headerListitem">
                        <FontAwesomeIcon icon={faPlane} />
                        <spa>Flights</spa>
                    </div>
                    <div className="headerListitem">
                        <FontAwesomeIcon icon={faCar} />
                        <spa>Car rentals</spa>
                    </div>
                    <div className="headerListitem">
                        <FontAwesomeIcon icon={faMountainCity} />
                        <spa>Attractions</spa>
                    </div>
                    <div className="headerListitem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <spa>Airport Taxi</spa>
                    </div>
                </div>
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">Find same comfort as home</h1>
                        <p className="headerDesc">Search deals on hotels, flight, car rentals and much more...</p>
                        {!user && <button className="headerBtn">Sign in / Register</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text" placeholder='Where are you going?'
                                    className='headerSearchInput'
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyy")} to ${format(dates[0].endDate, "dd/MM/yyy")}`}</span>
                                {openDate &&
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        minDate={new Date()}
                                        className="date"
                                    />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenPersonOptions(!openPersonOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                {openPersonOptions && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "i")}
                                                >+</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton"
                                                    disabled={options.adult <= 1}
                                                    onClick={() => handleOption("adult", "d")}
                                                >-</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton"
                                                    onClick={() => handleOption("children", "i")}
                                                >+</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton"
                                                    disabled={options.children <= 0}
                                                    onClick={() => handleOption("children", "d")}
                                                >-</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton"
                                                    onClick={() => handleOption("room", "i")}
                                                >+</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton"
                                                    disabled={options.room <= 1}
                                                    onClick={() => handleOption("room", "d")}
                                                >-</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerSearchButton" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
