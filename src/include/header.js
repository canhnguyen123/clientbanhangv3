import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_listNotification,updateNotification } from '../service/funApi';
import { getListMyCart, logout } from '../service/funApi';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list_cart = useSelector((state) => state.cart.list_cart);
  const list_notification = useSelector((state) => state.notification.listNotification);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [togglBell, setTogglBell] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [valueSearch, setValueSearch] = useState([]);
  const [quantityList, setQuantityList] = useState({});

  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    if (user_id > 0) {
      dispatch(get_listNotification(user_id, 1))
    }
  }, [dispatch])
  const chaneToggle = () => {
    setToggle(!toggle)
  }
  const showSearch = () => {
    setToggleSearch(true);
  }
  const closeSearch = () => {
    setToggleSearch(false);
  }
  const showCart = () => {
    setToggleCart(true);
  }
  const closeCart = () => {
    setToggleCart(false);
  }
  const closeBell = () => {
    setTogglBell(false);
  }
  const showBell = () => {
    setTogglBell(true);
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getListMyCart(user_id))
  }, [dispatch, user_id]);
  const logoutUser = () => {
    dispatch(logout(navigate));
  }
  const increaseQuantity = (itemId) => {
    setQuantityList((prevQuantityList) => ({
      ...prevQuantityList,
      [itemId]: (prevQuantityList[itemId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (quantityList[itemId] > 1) {
      setQuantityList((prevQuantityList) => ({
        ...prevQuantityList,
        [itemId]: prevQuantityList[itemId] - 1,
      }));
    }
  };
  const readMess=(id)=>{
    let arr=[];
    arr.push(id)
    const data={
      notification_ids:arr
    }
    dispatch(updateNotification(user_id,data))
  }
  const search=()=>{
    if (typeof valueSearch === 'string' && valueSearch.trim().length > 0) {
      setTimeout(() => {
        navigate('/search');
      }, 500);
    } else {
        toast.error('Vui lòng nhập thông tin để tìm kiếm');
    }
  
  }
  return (
    <Navbar className={scrolling ? "header-bar" : "header"}>
      <Container className='nav-bar-container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='flex_center' id="basic-navbar-nav">
          <Nav className="me-auto menu menu-header">
            <Link to={`/`} className='active nav-link'>Trang chủ</Link>
            <Link to={`/buy`} className='nav-link'>Mua hàng</Link>
            <Link to="/" className='nav-link'>Giới thiệu</Link>
            <Link to="/feedback" className='nav-link'>Góp ý</Link>
            <Link to="/blog" className='nav-link'>Bài viết</Link>
            <Link to="/contact" className='nav-link'>Liên hệ</Link>
          </Nav>
          <div className='div-acction-orther flex_center'>
            <div className='item-icon flex_center' onClick={showSearch}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            {user_id !== null && user_id !== 0 ?
              (
                <div className='item-icon flex_center div-account'>
                  <i className="fa-solid fa-user" onClick={chaneToggle}></i>
                  <div className={`account-box ${toggle ? 'active' : ''}`}>
                    <ul>
                      <li className="flex_start">Đổi mật khẩu</li>
                      <li className="flex_start" onClick={logoutUser}>Đăng xuất</li>
                    </ul>
                  </div>
                </div>

              ) : (
                <Link to={'/acction'} className='color-text'>
                  <div className='item-icon flex_center' >
                    <i class="fa-solid fa-user"></i>
                  </div>
                </Link>
              )}
            <div className='item-icon flex_center' onClick={showCart}>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div className='item-icon flex_center' onClick={showBell}>
              <i class="fa-solid fa-bell"></i>
            </div>
          </div>
        </Navbar.Collapse>

        <div className={`header-search flex_center ${toggleSearch ? 'active' : ""}`}>
          <form className='form-search'>
            <input placeholder='Nhập thông tin cần tìm' onChange={(e)=>setValueSearch(e.target.value)}/>
            <div className='icon-search flex_center' onClick={search}>
              <i class="fa-solid fa-magnifying-glass "></i>
            </div>
            <i class="fa-solid fa-xmark close-search" onClick={closeSearch}></i>
          </form>
        </div>
        <div className={`cart-box ${toggleCart ? "active" : ""}`}>
          <div className='cart-box-content'>
            <div className='cart-box-session'>
              <div className='cart-content'>
                <i class="fa-solid fa-xmark close-cart" onClick={closeCart}></i>
                <div className='cart-header'>
                  <h4 className='titel-c-drak'>
                    Giỏ hàng của bạn
                  </h4>
                  {user_id !== 0 && user_id !== null ?
                    (
                      <div className="list-my-cart">
                        {list_cart.map((item) => {
                          return (
                            <div className="item-cart flex_start">
                              <div className="item-cart-img">
                                <img src={item.img} />
                              </div>
                              <div className="item-cart-infro">
                                <div className="cart-item-span">
                                  {item.color}/{item.size}
                                </div>
                                <div className='deatil-row quantity mg-15-0'>
                                  <div className='flex_center acction-quantity w-h-30' onClick={() => decreaseQuantity(item.id)} >
                                    <span>-</span>
                                  </div>

                                  <input type='text' className="h-30" value={quantityList[item.id] || 1} />
                                  <div className='flex_center acction-quantity w-h-30' onClick={() => increaseQuantity(item.id)} >
                                    <span>+</span>
                                  </div>

                                </div>
                              </div>
                              <div className="acction-cart flex_a-end">
                                <div className="btn-acction-cart flex_center bg-red">
                                  <i class="fa-solid fa-pen-to-square"></i>
                                </div>
                                <div className="btn-acction-cart flex_center bg-yellow">
                                  <i class="fa-solid fa-trash"></i>
                                </div>
                              </div>
                            </div>
                          )
                        })} </div>
                    )
                    : <div className="flex_center">
                      <p>Đăng nhập để mua hàng</p>
                    </div>}
                    {user_id !== 0 && user_id !== null?
                    <div className="flex_end see-all"><Link to={`/cart`}>Xem toàn bộ <i class="fa-solid fa-angles-right"></i> </Link></div>:""
                    }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`notification-box ${togglBell ? "active" : ""}`}>
          <div className='notification-box-content'>
            <div className='notification-box-session'>
              <div className='notification-content'>
                <i class="fa-solid fa-xmark close-cart" onClick={closeBell}></i>
                <div className='notification-header'>
                  <h4 className='titel-c-drak'>
                    Thông báo
                  </h4>
                  {user_id !== 0&& user_id!==null ?
                     <div className={`list-notification ${togglBell ? "active" : ""}`} >
                     {list_notification.map((item, index) => {
                       return (
                         <div className="item-notification" onClick={()=>readMess(item.id)}>
                           <label>{item.category}</label>
                           {item.status === 1 ? <div className="toast-span"></div> : ""}
                           <p> {item.mess} </p>

                           <small>{formatDistanceToNow(new Date(item.created_at), { locale: vi, addSuffix: true })}</small>
                         </div>
                       )
                     })}

                   </div>
                  
                    :
                    <div className="flex_center">
                      <p>Đăng nhập để nhận thông báo </p>
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>

    </Navbar>
  )
}

export default Header
