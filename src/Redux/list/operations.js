import { API } from '../../config';

export const fetchInitialRecipes = async () => {
  try {
    const res = await fetch(`${API}/recipes/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getListState = state => state.List;

// backend get request require params in query
export const loadMoreRecipes = async (page, orderBy) => {
  try {
    const res = await fetch(
      `${API}/recipes/list?page=${page}&orderBy=${orderBy}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// handle different loadmore when search field is not empty
export const searchLoadMore = async (page, orderBy, search) => {
  try {
    const res = await fetch(
      `${API}/recipes/search?page=${page}&orderBy=${orderBy}&search=${search}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// check if should load more
export const checkLoadMore = (listCycle, initialPage, recipePage) => {
  if (!listCycle) {
    return true;
  } else {
    // check if load next page would be the initialpage, avoid duplicate page
    return initialPage !== recipePage + 1;
  }
};

// search recipes
export const searchRecipes = async search => {
  try {
    const res = await fetch(`${API}/recipes/search?search=${search}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};
