import React,{useState} from 'react'

import {useParams} from 'react-router-dom'

const Mealinfo = () => {
    const [info, setinfo] = useState(null)
    const {mealid} =useParams()
    console.log(mealid);


     const GetMeal_ID_API = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
            const JSondata = await response.json();
            console.log(JSondata.meals[0]);
            setinfo(JSondata.meals[0])
        } catch (error) {
            console.error("Error fetching the data:", error);
        }
    }
    
    if(info!=="")
    {
        GetMeal_ID_API()
    }
  return (
  

    <>
    
      {
        ! info ? "Not info Find":


        <div className='meal-details'>
        <img src={info.strMealThumb} alt="" />
        <div className='info'>
            {/* <h1>{info.strMeal}</h1>
            <p>{info.strCategory}</p>   
            <p>{info.strArea}</p>
            <p>{info.strInstructions}</p>
            <p>{info.strTags}</p>
            <p>{info.strMealThumb}</p>
            <p>{info.strYoutube}</p> */}
            <h1>Recipe Detail</h1>
            <button>{info.strMeal}</button>
            <h3>Instructions</h3>
            <p>{info.strInstructions}</p>
        </div>
        </div>
    
    
    }
    </>
    
)
}

export default Mealinfo