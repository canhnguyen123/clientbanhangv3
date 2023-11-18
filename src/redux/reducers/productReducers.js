const initialState = {
  productList: [],
  productListCase: [],
  productDeatil:[]
};
const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_PRODUCT':
      return {
        ...state,
        productList: action.payload,
      };
    case 'GET_LIST_PRODUCT_CASE':
      return {
        ...state,
        productListCase: action.payload,
      };
    case 'GET_PRODUCT_DEATIL':
      return {
        ...state,
        productDeatil: action.payload,
      };
    default:
      return state;
  }
};

export default productReducers;
