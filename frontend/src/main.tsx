import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AppContextProvider } from "./contexts/AppContextProvider";
import { store, persistor } from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/home/Home";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetails from "./pages/products/ProductDetails";
import Categories from "./pages/Categories";
import Category from "./components/Category";
import UserOrders from "./pages/UserOrders";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserAccount from "./pages/user-account/UserAccount.tsx";
import UpdateAccount from "./pages/user-account/UpdateAccount.tsx";
import UpdatePassword from "./pages/user-account/UpdatePassword.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

if (import.meta.env.VITE_NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:ganjaId" element={<ProductDetails />} />
      <Route path="categories" element={<Categories />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="payment" element={<Payment />} />
      <Route path="place-order" element={<PlaceOrder />} />
      <Route path="order/:id" element={<Order />} />
      <Route path="/user-orders" element={<UserOrders />} />
      <Route
        path="user-account"
        element={
          <UserAccount>
            <UpdateAccount />
            <UpdatePassword />
          </UserAccount>
        }
      />
    </Route>
  )
);

// const persistedStore = persistStore(store);
const queryClient = new QueryClient();
const clientId: string = import.meta.env.VITE_API_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AppContextProvider>
          <HelmetProvider>
            <PayPalScriptProvider
              options={
                {
                  "client-id": clientId,
                } as unknown as ReactPayPalScriptOptions
              }
              deferLoading={true}
            >
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </PayPalScriptProvider>
          </HelmetProvider>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
