import actionTypes from './types';

const initialState = {
  data: [],
  loading: false,
  active: {},
  selectValue: null,
  searchWord: '',
};

export const preproccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case actionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case actionTypes.SET_ACTIVE: {
      return {
        ...state,
        active: action.payload,
      };
    }
    case actionTypes.SET_SEARCH_WORD: {
      return {
        ...state,
        searchWord: action.payload,
      }
    }
    case actionTypes.SET_SELECT_VALUE: {
      return {
        ...state,
        selectValue: action.payload,
      }
    }
    
    default: {
      return state;
    }
  }
};

export const setData = value => ({ type: actionTypes.SET_DATA, payload: value });
export const setLoading = value => ({ type: actionTypes.SET_LOADING, payload: value });
export const setActive = value => ({ type: actionTypes.SET_ACTIVE, payload: value });
export const setSearchWord = value => ({ type: actionTypes.SET_SEARCH_WORD, payload: value });
export const setSelectValue = value => ({ type: actionTypes.SET_SELECT_VALUE, payload: value });