import { useState, useEffect } from "react";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import Modal from "./Modal.js";
import Card from "./Card.js";
import DetailPage from "./DetailPage.js";
import _ from "lodash";
import { createTapMap } from "../utils";
import "../styles/form/ListPage.scss";

const ListPage = (props) => {
  const [products, setProducts] = useState([]); //created a state for the product.
  const [order, setOrder] = useState([]);
  const [modalMinimized, setModalMinimized] = useState(false);
  const [detailPage, setDetailPage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [availableBeers, setAvailableBeers] = useState([]);

  function addToOrder(beer) {
    const copyOfBeer = { ...beer };
    const copyOfOrder = [...order];
    const productInOrder = copyOfOrder.find(
      (item) => item.name === copyOfBeer.name
    );
    if (productInOrder) {
      productInOrder.amount++; // puts one more product of that type in the order
      setOrder(copyOfOrder); // updates the state with all the same items, but one of them updated!
    } else {
      copyOfBeer.amount = 1; // puts the product in the basket for the first time

      setOrder((prevState) => [copyOfBeer, ...prevState]);
    }
    setModalMinimized(false);
  }

  function removeFromOrder(beer) {
    const copyOfBeer = { ...beer };
    let copyOfOrder = [...order];
    const productInOrder = copyOfOrder.find(
      (item) => item.name === copyOfBeer.name
    );
    if (productInOrder.amount > 1) {
      productInOrder.amount--;
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

        const allBeers = data.map((beer) => beer.name);
        setCategories([...new Set(data.map((item) => item.category))]);

        fetch("https://beerlify.herokuapp.com/")
          .then((res) => {
            return res.json();
          })
          .then(({ taps }) => {
            const beersServed = [...new Set(Object.values(createTapMap(taps)))];
            console.log(beersServed);
            setAvailableBeers(_.difference(allBeers, beersServed));
          });
      });
  }, []);

  const checkout = () => {
    props.setCheckoutOrder(order);
  };

  return (
    <>
      {detailPage ? (
        <DetailPage
          {...detailPage}
          closeDetailPage={() => setDetailPage(null)}
          addToOrder={addToOrder}
        />
      ) : (
        <div className="list-page">
          <div className="elem-up">
            <img src={elemupSrc} alt="" />
          </div>
          <header className="wrapper">
            <h1>Select from the options below to add beer to your order</h1>
            <img className="logo" src={logoSrc} alt="logo" />
          </header>
          <section className="content">
            <div className="filters wrapper">
              <button
                className={`${!activeCategory && "active"}`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  className={`${category === activeCategory && "active"}`}
                  key={category}
                  onClick={() =>
                    setActiveCategory((prev) =>
                      category === prev ? null : category
                    )
                  }
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="card-container">
              {products
                .filter((item) =>
                  activeCategory ? item.category === activeCategory : true
                )
                .map((product) => (
                  <Card
                    {...product}
                    key={product.name} // key to differentiate between items when updating UI.
                    addToOrder={addToOrder}
                    isNotServed={availableBeers.includes(product.name)}
                    openDetailPage={() => setDetailPage(product)}
                  />
                ))}
            </div>
          </section>
          <div className="elem-down">
            <img src={elemdownSrc} alt="" />
          </div>
          <footer>Foobar 2021 • All rights reserved - The Group</footer>
        </div>
      )}
      {order.length > 0 && (
        <Modal
          order={order}
          setModalMinimized={setModalMinimized}
          modalMinimized={modalMinimized}
          addToOrder={addToOrder}
          checkout={checkout}
          removeFromOrder={removeFromOrder}
        />
      )}
    </>
  );
};
export default ListPage;
