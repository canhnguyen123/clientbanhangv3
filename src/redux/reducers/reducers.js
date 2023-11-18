// src/redux/reducers/reducers.js
const initialState = {
    modalProduct: false,
    product_id:0
};
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          modalProduct: true,
          product_id: action.payload,
        };
        case 'CLOSE_MODAL':
          return {
            ...state,
            modalProduct: false,

          };
      default:
        return state;
    }
  };
  
  export default Reducer;
  