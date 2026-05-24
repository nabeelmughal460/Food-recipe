import React from 'react'
import {NavLink} from 'react-router-dom'

const Mealcard = ({data}) => {
    console.log(data);
    
  return (
    <div className='meals'>
        {!data ? "": data.map((curItem)=>{
            return(
            <div className='meal-Images'>
            <img src={curItem.strMealThumb} alt="" />
            <p>{curItem.strMeal}</p>
            <NavLink to={`/${curItem.idMeal}`}> <button>Recipe</button></NavLink>
        </div>)
        })
        
        
        }


    </div>
  )
}

export default Mealcard