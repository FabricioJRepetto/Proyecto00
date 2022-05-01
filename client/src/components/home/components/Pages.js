import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { pageIncrease, pageDecrease, pageExact } from '../../../slice-reducer/dogsSlice';
import { EL_PER_PAGE } from '../../../constants';

const Pages = () => {
  const dogs = useSelector(state => state.dogs.main);
  const filtered = useSelector(state => state.dogs.filtered);
  const page = useSelector(state => state.dogs.page)
  const dispatch = useDispatch()

  let source = filtered,  
  totalPages = Math.ceil(source.length / EL_PER_PAGE),
  maxLimit = (page +1) <= totalPages,
  minLimit = (page - 1) >= 1;

<div>
    {filtered.length>0 ?
    <p><b>Dogs: </b>{filtered.length}</p>
    : null
    }
</div>   

  return(
    <>
        <div>{filtered.length !== dogs.length ?
            <p><b>Dogs: </b>{filtered.length}</p>
            : null
            }
        </div>   
        <button onClick={() => dispatch(pageExact(1))} >{' << '}</button>
        <button onClick={() => dispatch(pageDecrease())} >{' < '}</button>
        <span>
            <span onClick={() => dispatch(pageDecrease())}>{ 
            minLimit ? page-1 : ` - `
            }</span>
            <b>{` ${page} `}</b>
            <span onClick={() => dispatch(pageIncrease(totalPages))}>{ 
            maxLimit ? page+1 : ` - `
            }</span>
        </span>
        <button onClick={() => dispatch(pageIncrease(totalPages))} >{' > '}</button>
        <button onClick={() => dispatch(pageExact(totalPages))} >{' >> '}</button>
        <span> /{totalPages}</span>
    </>
  );
};

export default Pages;