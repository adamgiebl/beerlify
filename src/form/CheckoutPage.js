import { useState, useEffect, useRef } from "react";
import { Input, Checkbox } from "antd";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import InputMask from "react-input-mask";
import _ from "lodash";
import ConfirmationPage from "./ConfirmationPage";

const CheckoutPage = (props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [cardnumber, setCardnumber] = useState("");
  const [cardnumberError, setCardnumberError] = useState("");

  const [monthYear, setMonthYear] = useState("");
  const [monthYearError, setMonthYearError] = useState("");

  const [CVC, setCVC] = useState("");
  const [CVCError, setCVCError] = useState("");

  const [ageChecked, setAgeChecked] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useRef(null);

  useEffect(() => {
    const isCreditCardValid = cardnumber.replaceAll(" ", "").length === 16;
    const isMonthYearValid = monthYear.replace("/", "").length === 4;
    const isNameValid = name.length > 0;
    const isCVCValid = CVC.length === 3;

    if (cardnumber) {
      setCardnumberError(!isCreditCardValid);
    }
    if (monthYear) {
      setMonthYearError(!isMonthYearValid);
    }
    if (name) {
      setNameError(!isNameValid);
    }
    if (CVC) {
      setCVCError(!isCVCValid);
    }

    setIsValid(
      form.current?.checkValidity() &&
        isMonthYearValid &&
        isCreditCardValid &&
        isCVCValid &&
        isNameValid
    );
  }, [name, cardnumber, monthYear, CVC, ageChecked]);

  function onSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    // pull only name and amount from each beer item
    const body =
      props.order && props.order.map(({ name, amount }) => ({ name, amount }));

    console.log(body);

    const bodyJson = JSON.stringify(body);

    fetch("https://beerlify.herokuapp.com/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: bodyJson,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("data posted", response);
        setIsSubmitted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {isSubmitted ? (
        <ConfirmationPage />
      ) : (
        <main className="checkout-form wrapper">
          <img className="elem-up" src={elemupSrc} alt="" />
          <header>
            {/* //Todo MAKE THIS BUTTON WORK / */}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <span className="error">Card holder name is required</span>
                )}
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
                {cardnumberError && (
                  <span className="error">Card number is incomplete</span>
                )}
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
                  {monthYearError && (
                    <span className="error">Month and year is required</span>
                  )}
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
                  {CVCError && (
                    <span className="error">Wrong format of the CVC code</span>
                  )}
                </div>
              </div>
              <label htmlFor="age" className="age-checkbox form-control">
                <Checkbox
                  id="age"
                  required
                  value={ageChecked}
                  onChange={(e) => setAgeChecked(!ageChecked)}
                />
                <span className="age-text">
                  I am 18 years or older<span className="error">*</span>
                </span>
              </label>
              <div className="total">
                <span className="total__label">Total: </span>
                <span className="total__price"> 54,-</span>
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
