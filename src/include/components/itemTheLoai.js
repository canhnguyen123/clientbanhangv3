import React from 'react'
import {SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
function itemTheLoai(props) {
  
  return (
    <Link to={`/theloai/${props.id}`}>
        <SwiperSlide className='sticker-slider item-theloai'>
            <img src={props.link}/>
            <span>{props.name}</span>
         </SwiperSlide>
    </Link>
    
  )
}

export default itemTheLoai