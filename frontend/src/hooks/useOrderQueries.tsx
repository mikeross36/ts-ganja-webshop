import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItemType, ShippingAddressType } from "../types/CartTypes";
import { apiClient } from "../utils/apiClient";
import { OrderType } from "../types/OrderType";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: async (order: {
      orderItems: CartItemType[];
      shippingAddress: ShippingAddressType;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: OrderType }>(
          "api/v1/orders",
          order
        )
      ).data,
  });
};

export const useGetOrderDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () =>
      (await apiClient.get<OrderType>(`api/v1/orders/${id}`)).data,
  });
};

export const usePayOrderMutation = () => {
  return useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: OrderType }>(
          `api/v1/orders/${details.orderId}/pay-order`,
          details
        )
      ).data,
  });
};

// getting client id from backend keyRouter
export const useGetPaypalClientIdQuery = () => {
  return useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>("api/v1/keys/paypal")).data,
  });
};

export const useGetStripePublishableKeyQuery = () => {
  useQuery({
    queryKey: ["stripe-publishable-key"],
    enabled: false,
    queryFn: async () =>
      (await apiClient.get<{ key: string }>("/api/v1/keys/stripe")).data,
  });
};

export const useCreateStripePaymentIntentMutation = () => {
  useMutation({
    mutationFn: async (orderId: string) =>
      (
        await apiClient.post<{ clientSecret: string }>(
          `/api/v1/orders/${orderId}/stripe-payment-intent`
        )
      ).data,
  });
};

export const useGetUserOrdersQuery = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () =>
      (await apiClient.get<OrderType[]>("api/v1/orders/user-orders")).data,
  });
};

export const useDeliverOrderMutation = () =>
  useMutation({
    mutationFn: async (orderId: string) =>
      (
        await apiClient.put<{ message: string; order: OrderType }>(
          `/api/v1/orders/${orderId}/deliver-order`
        )
      ).data,
  });
