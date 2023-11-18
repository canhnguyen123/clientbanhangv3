import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{openModal} from '../../redux/action/acction'
import { Link } from 'react-router-dom';
import {formatPrice} from "../../service/funweb";
function ItemProduct(props) {
    const dispatch = useDispatch();
        const openModalProduct=(event,status)=>{
            event.preventDefault();
            dispatch(openModal(props.id));
        }
  return (
    <Link to={`/deatil/${props.id}`}>
         <div className='item-product'>
        <div className='product-img'>
            <div className='add-my-cart flex_center'>
                    <div className='flex_center btn-cart-acction'  onClick={(event)=>openModalProduct(event)}>
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <div
                   onClick={(event)=>openModalProduct(event)}
                    className='flex_center btn-cart-acction add-cart-icon'>
                        <i class="fa-solid fa-cart-plus" ></i>
                    </div>
            </div>
            <img src={props.imgLink}/>
        </div>
        <div className='product-infro'>
            <h5>{props.name}</h5>
            <p> {formatPrice(props.price)}</p>
        </div>
    </div>
    </Link>
   
  )
}

export default ItemProduct;
