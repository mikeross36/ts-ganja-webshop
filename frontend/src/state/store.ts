import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import * as ganjaReducers from "./reducers/ganjaReducers";
import * as authReducers from "./reducers/authReducers";
import * as categoryReducers from "./reducers/categoryReducers";
import { shoppingCartReducer } from "./reducers/shoppingCartReducers";
import * as reviewReducers from "./reducers/reviewReducers";
// import * as orderReducers from "./reducers/orderReducers";
import { updateUserAccountReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  getAllGanjas: ganjaReducers.getAllGanjasReducer,
  getGanja: ganjaReducers.getGanjaReducer,
  registerUser: authReducers.registerUserReducer,
  loginUser: authReducers.loginUserReducer,
  logoutUser: authReducers.logoutUserReducer,
  resetPassword: authReducers.resetPasswordReducer,
  updatePassword: authReducers.updatePasswordReducer,
  getAllCategories: categoryReducers.getAllCategoriesReducer,
  getCategory: categoryReducers.getCategoryReducer,
  shoppingCart: shoppingCartReducer,
  addReview: reviewReducers.addReviewReducer,
  // createOrder: orderReducers.createOrderReducer,
  // getOrder: orderReducers.getOrderReducer,
  // getPaypalClient: orderReducers.getOrderReducer,
  // payOrder: orderReducers.payOrderReducer,
  // getUserOrders: orderReducers.getUserOrdersReducer,
  updateUserAccount: updateUserAccountReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const removeStoreData = () => {
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
