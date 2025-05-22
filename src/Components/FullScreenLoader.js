import React from "react";
import PropTypes from "prop-types"
import { HashLoader } from "react-spinners"

const FullScreenLoader = ({ isFetching, }) => {
  
  if(!isFetching) {
    return null;
  }
  
  return (
  <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(71,71,71,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <HashLoader color="#0d6efd" size={200} />
    </div>
  </>
)}


FullScreenLoader.propTypes = {
  isFetching: PropTypes.bool,
}

export default FullScreenLoader