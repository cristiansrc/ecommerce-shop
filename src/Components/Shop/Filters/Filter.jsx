import React, { useEffect, useState } from "react";
import "./Filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import formatMoney from "../../../util/formatMoney";
import { use } from "react";

const Filter = ({ categories, minPrice, setMinPrice, maxPrice, setMaxPrice, categoryId, setCategoryId  }) => {

  const [value, setValue] = useState([minPrice, maxPrice]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buttonFilterPrice = () => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }

  return (
    <div>
      <div className="filterSection">
        <div className="filterCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Categorias de productos</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <>
                {categories.map((category) => (
                  <p 
                    style={categoryId === category.id ? { fontWeight: 'bold' } : {}}  
                    key={category.id}
                    onClick={() => setCategoryId(categoryId === category.id ? 0 : category.id)}>
                      {category.name}
                  </p>
                ))}
              </>
              
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="filterPrice">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Price</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${formatMoney(value)}`}
                min={0}
                max={1000000}
                sx={{
                  color: "black",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                    border: "2px solid black",
                    width: 18,
                    height: 18,
                  },
                }}
              />

              <div className="filterSliderPrice">
                <div className="priceRange">
                  <p>
                    Precio minimo: <span>{formatMoney(value[0])}</span>
                  </p>
                  <p>
                    Precio maximo: <span>{formatMoney(value[1])}</span>
                  </p>
                </div>
                <div className="shoppingCartEmpty">
                  <button onClick={() => buttonFilterPrice()} style={{ width: '110%'}}>Aplicar filtro de precio</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array,
  minPrice: PropTypes.number,
  setMinPrice: PropTypes.func,
  maxPrice: PropTypes.number,
  setMaxPrice: PropTypes.func,
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
}

export default Filter;
