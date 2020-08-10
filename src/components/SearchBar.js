import React from 'react';

const SearchBar = (props) => {

  const { sortBy, changeSortBy, changeFilterBy } = props

  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input 
          type="radio" 
          value="None" 
          checked={sortBy === "None"} 
          onChange={(event) => {changeSortBy(event.target.value)}}
        />
        None
      </label>
      <label>
        <input 
          type="radio" 
          value="Alphabetically" 
          checked={sortBy === "Alphabetically"} 
          onChange={(event) => {changeSortBy(event.target.value)}}
        />
        Alphabetically
      </label>
      <label>
        <input 
          type="radio" 
          value="Price" 
          checked={sortBy === 'Price'} 
          onChange={(event) => {changeSortBy(event.target.value)}} 
        />
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => {changeFilterBy(event.target.value)}}>
          <option value="None">None</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
