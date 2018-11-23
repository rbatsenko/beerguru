const initialState = {
  isModalOpen: false,
};

export const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return {
        isModalOpen: true,
        modalBeer: {
          name: action.name,
          tagline: action.tagline,
          image_url: action.image_url ? action.image_url : 'https://via.placeholder.com/300',
          ibu: action.ibu,
          abv: action.abv,
          ebc: action.ebc,
        }
      }
    case 'CLOSE_MODAL':
      return {
        isModalOpen: false,
        modalBeer: undefined,
      }
    default:
      return state;
  }
}