import React, { useState } from 'react'
import './header.css'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom'
const Header = ({type}) => {

    const navigate = useNavigate()
    const [destination , setDestination] = useState('')
    const [openDate,setOpenDate] = useState(false)

    const [date,setDate] = useState([
        {
            startDate : new Date(),
            endDate : new Date(),
            key : 'selection'
        }
    ])

    const [openOptions,setOpenOptions] = useState(false)
    const [options,setOptions] = useState({ 
        adult : 0,
        children : 0,
        room : 0
    })

    const handleOption = (name,operation) => {

        setOptions((prev => {
            return {
                ...prev,
                [name] : operation === "i" ? options[name]+1 : options[name]-1
            }
        })

    )}


    
    const handleSearch = () => {
        navigate('/hotels',{state : {destination, date, options}})
    }


  return (
    <div className='header'>
        <div className={type==="list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <i className="fa-solid fa-bed"></i>
                    <span>
                        Stays 
                    </span>
                </div>
                <div className="headerListItem">
                <i className="fa-sharp fa-solid fa-plane"></i>
                    <span>
                        Flights
                    </span>
                </div>
                <div className="headerListItem">
                    <i className="fa-solid fa-car"></i>
                    <span>
                        Car Rentals
                    </span>
                </div>
                <div className="headerListItem">
                    <i className="fa-solid fa-bed"></i>
                    <span>
                        Attractions
                    </span>
                </div>
                <div className="headerListItem">
                <i className="fa-solid fa-car"></i>
                    <span>
                        Airport Taxis
                    </span>
                </div>
            </div>

            
        {type!=="list"  &&   <>     <h1 className="headerTitle">
                A lifetime of discounts? It's a Genius
            </h1>
            <p className="headerDesc">
                Get rewarded for your travels - Unlock instant savings of 10% or more with a free Booking Account?
            </p>
            <button className='headerBtn'>
                Sign in / Register
            </button>

            <div className="headerSearch">
                <div className="headerSearchItem">
                    <i className="fa-solid fa-bed headerIcon"></i>
                    <input type="text" placeholder='Where are you going?' className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
                </div>
                <div className="headerSearchItem">
                <i className="fa-solid fa-calendar-days headerIcon"></i>
                    <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">
                        {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}
                    </span>
                    {openDate && <DateRange editableDateInputs={true}
                    minDate = {new Date()}
                    onChange={item=>setDate([item.selection])}
                    moveRangeOnFirstSelection = {false}
                    ranges = {date} className='date'/>}
                </div>
                <div className="headerSearchItem">
                    <i class="fa-solid fa-person headerIcon"></i>
                     <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText" >
                       {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                    </span>

                    {openOptions && <div className="options">
                        <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">

                            <button className="optionCounterButton" onClick={()=>handleOption("adult","d")} disabled={options.adult<=1}>
                                -
                            </button>
                            <span className="optionCounterNumber">
                                {options.adult}
                            </span>
                            <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>
                                +
                            </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">

                            <button className="optionCounterButton" onClick={()=>handleOption("children","d")} disabled={options.children<=1}>
                                -
                            </button>
                            <span className="optionCounterNumber">
                                {options.children}
                            </span>
                            <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>
                                +
                            </button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">

                            <button className="optionCounterButton" onClick={()=>handleOption("room","d")} disabled={options.room<=1}>
                                -
                            </button>
                            <span className="optionCounterNumber">
                                {options.room}
                            </span>
                            <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>
                                +
                            </button>
                            </div>
                        </div>
                    </div>}
                </div>
                 <div className="headerSearchItem">
                    <button className='headerBtn' onClick={handleSearch}>Search</button>
                </div>

            </div> </>}
        </div>
    </div>
  )
}

export default Header
