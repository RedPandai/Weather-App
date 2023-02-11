import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoOptions } from "../api";
import { useState } from "react";
import "./search.css";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <div className="searchBar">
      <div className="rabbit">
        <div className="rabbitbody">
          <div className="rabbitface">
            <div className="ear">
              <div className="ear-L"></div>
              <div className="ear-R"></div>
            </div>
            <div className="eye">
              <div className="eye-L"></div>
              <div className="eye-R"></div>
            </div>
            <div className="nose"></div>
            <div className="mouth">
              <div className="tooth"></div>
            </div>
            <div className="hands">
              <div className="hands-L"></div>
              <div className="hands-R"></div>
            </div>
            <div className="intro-card">
              <h1 className="apptitle">Weather Forecast App</h1>

              <div className="leaf"></div>
            </div>
          </div>
        </div>
      </div>
      <AsyncPaginate
        placeholder="Search for City"
        debounceTimeout={600}
        value={search}
        loadOptions={loadOptions}
        onChange={handleChange}
      />
    </div>
  );
}
export default Search;
