import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { pageIncrease, pageDecrease, pageExact } from '../../../slice-reducer/dogsSlice';
import { ReactComponent as IconLeft } from "../../../assets/left.svg";
import { ReactComponent as IconRight } from "../../../assets/right.svg";
import { ReactComponent as IconLastPage } from "../../../assets/last_page.svg";
import { ReactComponent as IconFirstPage } from "../../../assets/first_page.svg";
import './Pages.css'

const Pages = () => {
    const filtered = useSelector(state => state.dogs.filtered);
    const page = useSelector(state => state.dogs.page)
    const dpp = useSelector(state => state.dogs.dogsPerPage)
    const dispatch = useDispatch()



  let source = filtered,  
  totalPages = Math.ceil(source.length / dpp),
  maxLimit = (page +1) <= totalPages,
  minLimit = (page - 1) >= 1;

  return(
    <div className='pages'>
        <div className='page-button' onClick={() => dispatch(pageExact(1))}>
            <IconFirstPage className='page-icon'></IconFirstPage>
        </div>
        <div className='page-button' onClick={() => dispatch(pageDecrease())}>
            <IconLeft className='page-icon'></IconLeft>
        </div>

        <div className='pages-num-box'>
            <span className='pages-nums' onClick={() => dispatch(pageDecrease())}>{ 
            minLimit ? page-1 : ` - `
            }</span>
            <b className='pages-nums'>{` ${page} `}</b>
            <span className='pages-nums' onClick={() => dispatch(pageIncrease(totalPages))}>{ 
            maxLimit ? page+1 : ` - `
            }</span>
        </div>

        <div className='page-button' onClick={() => dispatch(pageIncrease(totalPages))}>
            <IconRight className='page-icon' ></IconRight>
        </div>
        <div className='page-button' onClick={() => dispatch(pageExact(totalPages))}>
            <IconLastPage className='page-icon' ></IconLastPage>
        </div>
        <span className='pages-pages'> /{totalPages}</span>
    </div>
  );
};

export default Pages;