// service.js
import APILink from "./APILink";
import { getTLHomeAcction,getTLChecked,getBannerHome,getCategory,getPhanLoai,getTheLoai } from "../redux/action/theLoaiAcction";
import { getProductHome,getProductInTL,getDeatilProduct } from "../redux/action/productAcction";
import {loginAcction,updateIdAcction} from "../redux/action/accountAcction";
import {getListCart} from "../redux/action/cartAcction";
import {getListNotification} from "../redux/action/notificationAcction"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getListTheLoaiHome = () => {
    return (dispatch) => {
        APILink.get('theloai/')
          .then((response) => {
            if(response.data.status==="success"){
                dispatch(getTLHomeAcction(response.data.results));
            }
         
          })
          .catch((error) => {
          });
      }
};
export const getCheckedTL = () => {
  return (dispatch) => {
      APILink.get('theloai/get-check-list-home')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getTLChecked(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getBanner = () => {
  return (dispatch) => {
      APILink.get('banner/')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getBannerHome(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getCategoryList = () => {
  return (dispatch) => {
      APILink.get('theloai/get-category')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getCategory(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getPhanLoaiList = () => {
  return (dispatch) => {
      APILink.get('theloai/get-phanloai')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getPhanLoai(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getProduct = (id) => {
  return (dispatch) => {
      APILink.get(`product/list-product/${id}/4`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getProductHome(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getTheLoaiCase = (data) => {
  return (dispatch) => {
      APILink.post('theloai/fitter-theloai',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getTheLoai(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};

export const getProductCase= (theloai_id) => {
  return (dispatch) => {
      APILink.get(`product/case/${theloai_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getProductInTL(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};



export const getDeatil= (product_id) => {
  return (dispatch) => {
      APILink.get(`product/deatil/${product_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getDeatilProduct(response.data.results));
          }
        })
        .catch((error) => {
        });
    }
};
export const login = (data,navigate) => {
 
  return (dispatch) => {
      APILink.post('user/login',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(loginAcction(response.data.user_id));
              toast.success(response.data.mess,{})
              setTimeout(() => {
                navigate('/');
            }, 2000);
              dispatch(updateIdAcction(true))
              localStorage.setItem('user_id',response.data.user_id);
          }
          else if(response.data.status==="fail"){
            toast.success(response.data.mess,{})
          }
        })
        .catch((error) => {
        });
    }
};
export const logout = (navigate) => {
 
  return (dispatch) => {
    var user_id = localStorage.getItem('user_id');

        toast.success("Đăng xuất thành công",{})
        localStorage.removeItem('user_id');
            setTimeout(() => {
              navigate('/acction');
          }, 2000);
          dispatch(updateIdAcction(false))
      // localStorage.setItem('user_id',response.data.user_id);
    }
};
export const loginAccount = (data,navigate) => {
 
  return (dispatch) => {
      APILink.post('user/dangki-acction',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(loginAcction(response.data.user_id));
              toast.success(response.data.mess,{})
              setTimeout(() => {
                navigate('/');
            }, 2000);
              dispatch(updateIdAcction(true))
              localStorage.setItem('user_id',response.data.user_id);
          }
          else if(response.data.status==="fail"){
            toast.success(response.data.mess,{})
          }
        })
        .catch((error) => {
        });
    }
};
export const checkIsLogin = (navigate) => {
  return () => {
    const user_id = localStorage.getItem('user_id');
    if (user_id !== null && user_id !== '0') { // Kiểm tra user_id có khác null và '0'
      toast.success('Đã có tài khoản, bạn sẽ được chuyển về trang chủ', {})
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
}
export const getListMyCart= (user_id) => {
  return (dispatch) => {
      APILink.get(`cart/get-list-cart/${user_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getListCart(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};

export const addToMyCart= (data,user_id) => {
  return (dispatch) => {
      APILink.post(`cart/add/${user_id}`,data)
        .then((response) => {
          if(response.data.status==="success"){
             dispatch(getListMyCart(user_id));
             toast.success(response.data.mess, {})
          }
          else{
            toast.error(response.data.mess, {})
          }
         // alert(response.data.status)
        })
        .catch((error) => {
        });
    }
};
export const getListPageMyCart = (user_id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      APILink.get(`cart/get-list/${user_id}`)
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(getListCart(response.data.results));
            resolve(response.data.results);  
          } else {
            reject("Error: Failed to fetch cart data");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const deleteCartID = (data,user_id) => {
  return (dispatch) => {
    APILink.post(`cart/delete/${user_id}`,data)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(getListPageMyCart(user_id));
        dispatch(getListMyCart(user_id));
        toast.success(response.data.mess,{})
      } else {
        toast.error(response.data.mess,{})
      }
    })
    .catch((error) => {
     
    });
  };
};
export const get_listNotification = (user_id) => {
  return (dispatch) => {
    APILink.get(`notification/list-notification/${user_id}`)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(getListNotification(response.data.results));
      
      } else {
        toast.error(response.data.mess,{})
      }
    })
    .catch((error) => {
     
    });
  };
};

export const updateNotification = (user_id,data) => {
  return (dispatch) => {
    APILink.post(`notification/update-state/${user_id}`,data)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(get_listNotification(user_id));
        toast.success(response.data.mess)
      } else {
        toast.error(response.data.mess,{})
        toast.success(response.data.mess)
      }
    })
    .catch((error) => {
     
    });
  };
};
