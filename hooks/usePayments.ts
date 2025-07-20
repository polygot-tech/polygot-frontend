import { apiClient } from "@/lib/api"
import { useMutation} from "@tanstack/react-query"

interface Customer {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  street: string;
  zipcode: string;
}

export const useCreatePayment = (token: string) => {
  return useMutation({
    mutationFn: async ({customer,type}:{
        customer: Customer,
        type:string
    }) => {
      const res = await apiClient.post(
        "/api/v1/payments",
        { customer: customer, type:type },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data; // should include { paymentLink: string }
    }
  });
};
