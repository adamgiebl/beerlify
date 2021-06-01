import "./ConfirmationPage.scss";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";

const ConfirmationPage = (props) => {
  return (
    <main className="confirmation">
      <img className="elem-up" src={elemupSrc} alt="" />
      <img className="logo" src={logoSrc} alt="" />
      <h1>Thank you for your order!</h1>
      <span className="--number">
        Your order number is <b>#2034</b>
      </span>
      <div className="cta">
        <span>Forgot something or want more beer?</span>
        <button>Order more</button>
      </div>
      <img className="elem-down" src={elemdownSrc} alt="" />
    </main>
  );
};

export default ConfirmationPage;
