import { useState, useEffect, useRef } from "react";
import { Input, Checkbox } from "antd";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import InputMask from "react-input-mask";
import ConfirmationPage from "./ConfirmationPage";

const CheckoutPage = (props) => {
  const [name, setName] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [CVC, setCVC] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useRef(null);

  useEffect(() => {
    const isCreditCardValid = cardnumber.replaceAll(" ", "").length === 16;
    const isMonthYearValid = monthYear.replace("/", "").length === 4;
    setIsValid(
      form.current?.checkValidity() && isMonthYearValid && isCreditCardValid
    );
  }, [name, cardnumber, monthYear, CVC]);

  function onSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Thank you one");
  }
  console.log(props);
  return (
    <>
      {true ? (
        <ConfirmationPage />
      ) : (
        <main className="checkout-form wrapper">
          <img className="elem-up" src={elemupSrc} alt="" />
          <header>
            <button className="back-btn" onClick={props.closeDetailPage}>
              « Back
            </button>
            <img className="logo" src={logoSrc} alt="" />
          </header>
          <div className="checkout-content">
            <h3 className="payment-heading">Add your payment details below</h3>
            <form ref={form} onSubmit={onSubmit}>
              <div className="form-control">
                <label htmlFor="name">Cardholder's name</label>
                <Input
                  id="name"
                  type="text"
                  required
                  minLength="2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="cardnumber">Card number</label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  value={cardnumber}
                  maskChar=""
                  id="cardnumber"
                  className="ant-input"
                  onChange={(e) => setCardnumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <div className="form-control form-control--date">
                  <label htmlFor="monthyear">Month/Year</label>
                  <InputMask
                    mask="99/99"
                    maskChar=""
                    className="ant-input"
                    required
                    id="monthyear"
                    value={monthYear}
                    onChange={(e) => setMonthYear(e.target.value)}
                    minLength="17"
                  ></InputMask>
                </div>
                <div className="form-control">
                  <label htmlFor="CVC">CVC</label>
                  <Input
                    id="CVC"
                    type="text"
                    required
                    length="3"
                    minLength="3"
                    maxLength="3"
                    value={CVC}
                    onChange={(e) => setCVC(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="age" className="age-checkbox form-control">
                <Checkbox id="age" />
                <span className="age-text">I am 18 years or older</span>
              </label>
              <div className="total">
                <span className="total__label">Total: </span>
                <span className="total__price">54,-</span>
              </div>
              <button className="place-order" type="submit" disabled={!isValid}>
                Place order
              </button>
            </form>
          </div>
          <img className="elem-down" src={elemdownSrc} alt="" />
        </main>
      )}
    </>
  );
};

export default CheckoutPage;
