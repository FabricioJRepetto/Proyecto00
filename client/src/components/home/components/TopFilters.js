import React from 'react'
import { useSelector } from "react-redux";
import './TopFilters.css'

const TopFilters = () => {
    const dogs = useSelector(state => state.dogs.main)
    const filtered = useSelector(state => state.dogs.filtered)

  return (
    <div className='top-filters'>
        <div className='total-results'>{filtered.length !== dogs.length ?
            <p><b>Dogs: </b>{filtered.length}</p>
            : null
            }
        </div> 
        <div>{null}</div>
        <div className='total-results-list'>results per page
            <select>
                <option defaultValue>14</option>
                <option>21</option>
                <option>28</option>
            </select>
        </div>
    </div>
  )
}

export default TopFilters