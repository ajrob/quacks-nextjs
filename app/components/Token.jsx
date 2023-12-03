import React, { Fragment } from 'react'

const Token = ({color="black", value="1"}) => {
  return (
    <>
        <img className='token' src={color+"_"+value+".png"} ></img>
    </>
  )
}

export default Token