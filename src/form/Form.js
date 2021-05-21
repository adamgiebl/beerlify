import { useState } from "react";
import "./Form.scss";
import Splash from "./Splash.js";
import Listpage from "./Listpage.js";

const Form = () => {
  const [splashOpen, setSplashOpen] = useState(false);
  return (
    <>{splashOpen ? <Splash setSplashOpen={setSplashOpen} /> : <Listpage />}</>
  );
};

export default Form;
