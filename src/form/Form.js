import { useState } from "react";
import "../styles/form/Form.scss";
import Splash from "./Splash.js";
import ListPage from "./ListPage.js";
import CheckoutPage from "./CheckoutPage";
import "../styles/form/CheckoutPage.scss";
import "./ConfirmationPage";

const Form = () => {
  const [splashOpen, setSplashOpen] = useState(true);
  const [checkoutOrder, setCheckoutOrder] = useState(null);

  const renderPage = () => {
    if (splashOpen === true) {
      return <Splash setSplashOpen={setSplashOpen} />;
    } else {
      if (checkoutOrder === null) {
        return <ListPage setCheckoutOrder={setCheckoutOrder} />;
      } else {
        return <CheckoutPage order={checkoutOrder} />;
      }
    }
  };
  return <div className="form-wrapper">{renderPage()}</div>;
};

export default Form;
