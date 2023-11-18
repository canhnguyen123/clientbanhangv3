export const getProductHome = (items) => ({
    type: 'GET_LIST_PRODUCT',
    payload: items,
});
export const getProductInTL= (items) => ({
    type: 'GET_LIST_PRODUCT_CASE',
    payload: items,
});
export const getDeatilProduct= (items) => ({
    type: 'GET_PRODUCT_DEATIL',
    payload: items,
});

  