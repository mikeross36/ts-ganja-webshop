const Checkout = (props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) => {
  return (
    <main className="checkout__steps">
      <p className={props.step1 ? "active" : ""}>register</p>
      <p className={props.step2 ? "active" : ""}>shipping</p>
      <p className={props.step3 ? "active" : ""}>payment</p>
      <p className={props.step4 ? "active" : ""}>order</p>
    </main>
  );
};

export default Checkout;
