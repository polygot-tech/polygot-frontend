import { apiClient } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Customer {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  street: string;
  zipcode: string;
}

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async ({
      customer,
      type,
    }: {
      customer: Customer;
      type: string;
    }) => {
      const res = await apiClient.post("/api/v1/payments", {
        customer: customer,
        type: type,
      });
      return res.data; // should include { paymentLink: string }
    },
  });
};

export const usePaymentStatus = (paymentId: string | null, token: string) => {
  return useQuery({
    queryKey: ["paymentStatus", paymentId],
    queryFn: async () => {
      if (!paymentId) return null;
      const res = await apiClient.get(`/api/v1/payments/status/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      const shouldPoll = status === "pending" || status === "processing";
      return shouldPoll ? 3000 : false;
    },
    enabled: !!paymentId,
  });
};
