/*
  list sagas
*/
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher sagas
*/
export function* watchFetchInitRecipes() {
  yield takeLatest(Types.FETCH_INITIAL_RECIPES, workerFetchInitRecipes);
}

export function* watchLoadMoreRecipes() {
  yield takeLatest(Types.LOAD_MORE_RECIPES, workerLoadMoreRecipes);
}

/*
  Worker sagas
*/
function* workerLoadMoreRecipes() {
  console.log('bottom');
  const listState = yield select(Operations.getListState);
  console.log(listState);
}

function* workerFetchInitRecipes() {
  yield put({ type: Types.LIST_BEGIN });
  try {
    const response = yield call(Operations.fetchInitialRecipes);
    if (response.error) {
      throw new Error(response.error);
    } else {
      console.log(response);
      yield put({
        type: Types.SUCESS_INITIAL_RECIPES,
        payload: response
      });
    }
  } catch (err) {
    yield put({
      type: Types.LIST_ERROR,
      payload: err.message
    });
  }
}
