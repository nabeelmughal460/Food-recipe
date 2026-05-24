import React, { useState } from "react";
import Mealcard from "./Mealcard";

const Mainpage = () => {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [message, setmessage] = useState("");

  const handleinput = (event) => {
    setsearch(event.target.value);
  };

  const myfunction = async () => {
    if (search === "") {
      setmessage("Please enter something");
      return;
    }

    try {
      const get = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const jsonData = await get.json();

      setdata(jsonData.meals);
      setmessage("");
    } catch (error) {
      console.log(error);
      setmessage("Something went wrong");
    }
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">
            Discover Flavors From Around The World
          </p>

          <h1 className="hero-title">🍽️ Food Recipe App</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search biryani, kebab, butter chicken..."
              value={search}
              onChange={handleinput}
            />

            <button className="search-btn" onClick={myfunction}>
              Search
            </button>
          </div>

          {message && <h4 className="search-message">{message}</h4>}
        </div>
      </div>

      <div className="container">
        <Mealcard data={data} />
      </div>
    </>
  );
};

export default Mainpage;