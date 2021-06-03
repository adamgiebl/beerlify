import "../styles/form/ConfirmationPage.scss";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";

const ConfirmationPage = (props) => {
  return (
    <main className="confirmation">
      <img className="elem-up" src={elemupSrc} alt="" />
      <div className="confirmation__content">
        <img className="logo" src={logoSrc} alt="" />
        <h1>
          Thank you
          <br />
          for your order!
        </h1>
        <span className="order-no">
          Your order number is <b>#2034</b>
        </span>
        <div className="cta">
          <span>Forgot something or you fancy more beer?</span>
          <button onClick={() => window.location.reload()} className="cta-btn">
            Order more
          </button>
        </div>
      </div>
      <img className="elem-down" src={elemdownSrc} alt="" />
    </main>
  );
};

export default ConfirmationPage;
