import { useState } from "react";
import "./Form.scss";
import Splash from "./Splash.js";
import ListPage from "./ListPage.js";
import DetailPage from "./DetailPage.js";

const Form = () => {
  const [splashOpen, setSplashOpen] = useState(false);
  const [detailPage, setDetailPage] = useState(null);
  return (
    <div className="form-wrapper">
      {/*splashOpen ? <Splash setSplashOpen={setSplashOpen} /> : <ListPage />*/}
      {detailPage ? (
        <DetailPage
          {...detailPage}
          closeDetailPage={() => setDetailPage(null)}
        />
      ) : (
        <ListPage setDetailPage={setDetailPage} />
      )}
    </div>
  );
};

export default Form;
