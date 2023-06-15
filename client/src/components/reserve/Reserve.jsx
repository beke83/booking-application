import React, { useState } from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../../hooks/useFetch';
import './reserve.css';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`room/${hotelId}`)
    console.log(data)

    const [selectedRooms, setSelectedRooms] = useState([]);

    const { dates } = useContext(SearchContext);

    const navigate = useNavigate()

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());

        let list = [];

        while (date <= end) {
            list.push(new Date(date).getTime()) // return date in timestamps
            date.setDate(date.getDate() + 1)
        }

        return list;
    }
    console.log(getDatesInRange(dates[0].startDate, dates[0].endDate));

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    //this is to check the available dates an if it unavailable we disable the check box(selection) of that room
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()));

        return !isFound
    }

    {/* handle checkboxes selection */ }
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value
        {/* check if selected then get the previous selected rooms and add the new value to it */ }
        setSelectedRooms(checked ?
            [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value))
    }
    console.log(selectedRooms)

    const handleClick = async () => {
        try {

            await Promise.all(selectedRooms.map(roomId => {
                console.log(roomId)
                const res = axios.put(`/rooms/availability/${roomId}`, {
                    dates: allDates,
                });
                return res.data
            }));
            setOpen(false);
            navigate('/');
        } catch (err) {

        }
    }
    return (
        <div className='reserve'>
            Reserve
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms: </span>
                {data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max person: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="rButton" onClick={handleClick}>Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve
