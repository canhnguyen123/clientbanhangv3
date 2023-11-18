export const openModal = (id) => ({
    type: 'OPEN_MODAL',
    payload: id,
});
  export const closeModal = () => ({
    type: 'CLOSE_MODAL',
  });