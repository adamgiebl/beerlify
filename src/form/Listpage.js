import { useState, useEffect } from "react";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import Modal from "./Modal.js";
import Card from "./Card.js";
import "./ListPage.scss";
const ListPage = (props) => {
  const [products, setProducts] = useState([]); //created a state for the product.
  const [order, setOrder] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  function addToOrder(beer) {
    const copyOfBeer = { ...beer };
    const copyOfOrder = [...order];
    const productInOrder = copyOfOrder.find(
      (item) => item.name === copyOfBeer.name
    );
    if (productInOrder) {
      productInOrder.count++; // puts one more product of that type in the order
      setOrder(copyOfOrder); // updates the state with all the same items, but one of them updated!
    } else {
      copyOfBeer.count = 1; // puts the product in the basket for the first time

      setOrder((prevState) => [...prevState, copyOfBeer]);
    }
  }

  function removeFromOrder(beer) {
    const copyOfBeer = { ...beer };
    let copyOfOrder = [...order];

    const productInOrder = copyOfOrder.find(
      (item) => item.name === copyOfBeer.name
    );

    if (productInOrder.count > 1) {
      productInOrder.count--;
    } else {
      copyOfOrder = copyOfOrder.filter((item) => item.name !== copyOfBeer.name);
    }

    setOrder(copyOfOrder);
  }

  useEffect(() => {
    fetch("https://beerlify.herokuapp.com/beerTypes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        //console.log(data);
      });
  }, []);

  return (
    <div className="list-page">
      <div className="elem-up">
        <img src={elemupSrc} alt="" />
      </div>
      <header className="wrapper">
        <h1>Select from the options below to add beer to your order</h1>
        <img className="logo" src={logoSrc} alt="logo" />
      </header>
      <section className="content">
        <div className="filters wrapper ">
          <span className="active">All </span>
          <span>| IPA | </span>
          <span>Belgian Specialty Ale |</span>
          <span>European Lager |</span>
          <span>Belgian Specialty Ale |</span>
          <span>Belgian Specialty Ale</span>
        </div>
        <div className="card-container">
          {products.map((product) => (
            <Card
              {...product}
              key={product.name} // key to differentiate between items when updating UI.
              setModalOpen={setModalOpen}
              addToOrder={addToOrder}
              openDetailPage={() => props.setDetailPage(product)}
            />
          ))}
        </div>
      </section>
      <div className="elem-down">
        <img src={elemdownSrc} alt="" />
      </div>
      <footer>Foobar 2021 • All rights reserved - The Group</footer>
      {order.length > 0 && (
        <Modal
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          order={order}
          addToOrder={addToOrder}
          removeFromOrder={removeFromOrder}
        />
      )}
    </div>
  );
};
export default ListPage;
