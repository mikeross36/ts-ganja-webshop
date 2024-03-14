import {
  CardElement,
  //   PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentIntent, StripeElementsOptions } from "@stripe/stripe-js";
import Button from "./Button";
import { toast } from "react-toastify";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";

const StripeCheckout = ({
  orderId,
  refetch,
  options,
  payOrder,
}: {
  orderId: string;
  refetch: () => void;
  options: StripeElementsOptions;
  payOrder: (orderId: string, paymentIntent: PaymentIntent) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const styleOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmitStripe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded!");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    const result = await stripe.confirmCardPayment(options.clientSecret!, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      try {
        await payOrder(orderId, result.paymentIntent);
        refetch();
        toast.success("Order is paid");
        console.log("[Paymentintent]", result.paymentIntent);
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitStripe}>
        <CardElement
          options={styleOptions}
          className="sr-input sr-card-element"
        />
        <div>
          <Button type="submit" className="button button--mid">
            pay
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckout;
