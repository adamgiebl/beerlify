import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
const Splash = (props) => {
  return (
    <main>
      <img className="elem-up" src={elemupSrc} alt="" />
      <div className="cta">
        <img src={logoSrc} alt="logo" />
        <button onClick={() => props.setSplashOpen(false)}>Order beer</button>
      </div>
      <img className="elem-down" src={elemdownSrc} alt="" />
    </main>
  );
};
export default Splash;
