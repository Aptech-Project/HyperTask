import * as Actions from '../actions';
const initialState = {
  entities: null,
  searchText: '',
  selectedContactIds: [],
  routeParams: {},
  contactDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};
const contactsTabReducer = function (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
export default contactsTabReducer;