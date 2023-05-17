import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import cart from './cart';
import {api} from '../services/api';

const reducers = combineReducers({
  cart,
  api: api.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({}).concat(api.middleware);
    return middlewares;
  },
});

setupListeners(store.dispatch);

export {store};
