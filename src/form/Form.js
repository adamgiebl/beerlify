import { useState } from "react";
import "./Form.scss";
import Splash from "./Splash.js";
import ListPage from "./ListPage.js";
import CheckoutPage from "./CheckoutPage";
import "./CheckoutPage.scss";
import "./ConfirmationPage";

const Form = () => {
  const [splashOpen, setSplashOpen] = useState(true);
  const [checkoutOrder, setCheckoutOrder] = useState(null);
  return (
    // if checkoutOpen then we show the Checkout component, else we show the ListPage
    <div className="form-wrapper">
      {splashOpen ? (
        <Splash setSplashOpen={setSplashOpen} />
      ) : checkoutOrder ? (
        <CheckoutPage order={checkoutOrder} />
      ) : (
        <ListPage setCheckoutOrder={setCheckoutOrder} />
      )}
    </div>
  );
};

export default Form;
