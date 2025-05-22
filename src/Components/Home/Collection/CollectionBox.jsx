import React from "react";
import "./CollectionBox.css";
import { useNavigate } from "react-router-dom";

const CollectionBox = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="collection" style={{color: "beige"}}>
        <div className="collectionLeft" onClick={() => (navigate('/shop/woman'))}>
          <p className="col-p">Hot List</p>
          <h3 className="col-h3">
            <span>Women</span> Collection
          </h3>
        </div>
        <div className="collectionLeftHom" onClick={() => (navigate('/shop/men'))}>
          <p className="col-p">Hot List</p>
          <h3 className="col-h3">
            <span>Men</span> Collection
          </h3>
          
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
