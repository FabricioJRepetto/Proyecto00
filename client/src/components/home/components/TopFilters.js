import { useDispatch, useSelector } from "react-redux";
import { dogsPerPage, pageExact } from '../../../slice-reducer/dogsSlice';
import { ReactComponent as SelectArrow } from '../../../assets/arrow-down.svg'
import './TopFilters.css'

const TopFilters = () => {
    const filtered = useSelector(state => state.dogs.filtered)
    const dispatch = useDispatch() ;
     
    let changeHandler = (e) => {
        dispatch(dogsPerPage(e.target.value))
        dispatch(pageExact(1))
    };

  return (
    <>
        <div className="home-top-bar">
            <span className='results-page-box'>
                <div className='total-results'>
                    <p><b>Dogs: </b>{filtered.length}</p>
                </div> 
                
                <div className='dpp-list'>Results per page:
                    <select onChange={changeHandler} defaultValue={16}>
                        <option>8</option>
                        <option >16</option>
                        <option>24</option>
                        <option>32</option>
                    </select>
                    <SelectArrow className='selectArrow'/>
                </div>
            </span>
        </div>
    </>
  )
}

export default TopFilters