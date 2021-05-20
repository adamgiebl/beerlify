import { useState } from "react";
import "./Form.scss";
import Splash from "./Splash.js";

const Form = () => {
  const [splashOpen, setSplashOpen] = useState(true);
  return (
    <>
      {splashOpen ? (
        <Splash setSplashOpen={setSplashOpen} />
      ) : (
        <main>This is the main page</main>
      )}
    </>
  );
};

export default Form;
