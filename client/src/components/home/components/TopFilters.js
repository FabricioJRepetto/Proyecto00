import { useDispatch, useSelector } from "react-redux";
import { dogsPerPage, pageExact } from '../../../slice-reducer/dogsSlice';
import { ReactComponent as SelectArrow } from '../../../assets/arrow-down.svg'
import './TopFilters.css'

const TopFilters = () => {
    const dogs = useSelector(state => state.dogs.main)
    const filtered = useSelector(state => state.dogs.filtered)
    const dispatch = useDispatch() ;
     
    let changeHandler = (e) => {
        dispatch(dogsPerPage(e.target.value))
        dispatch(pageExact(1))
    };

  return (
    <div className='top-filters'>
        <div className='total-results'>{filtered.length !== dogs.length ?
            <p><b>Dogs: </b>{filtered.length}</p>
            : null
            }
        </div> 
        
        <div className='dpp-list'>results per page:
            <select onChange={changeHandler}>
                <option>8</option>
                <option selected>16</option>
                <option>24</option>
                <option>32</option>
            </select>
            <SelectArrow className='selectArrow'/>
        </div>
    </div>
  )
}

export default TopFilters