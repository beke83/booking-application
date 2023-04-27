import React, { useState } from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../../hooks/useFetch';
import './reserve.css';

const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`room/${hotelId}`)
    console.log(data)

    const [selectedRooms, setSelectedRooms] = useState([])
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value
        setSelectedRooms(checked ? 
            [...selectedRooms, value] 
            : selectedRooms.filter((item) => item !== value))
    }
    console.log(selectedRooms)
    return (
        <div className='reserve'>
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

                        {item.roomNumbers.map(roomNumber => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button className="rButton" onClick={handleClick}>Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve
