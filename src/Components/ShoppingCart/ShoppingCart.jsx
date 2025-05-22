import React, { useState } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotalAmount,
} from "../../Features/Cart/cartSlice";

import { MdOutlineClose } from "react-icons/md";

import { Link } from "react-router-dom";

import success from "../../Assets/success.png";
import formatMoney from "../../util/formatMoney";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) {
      setActiveTab(tab);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1 && quantity <= 20) {
      dispatch(updateQuantity({ productID: productId, quantity: quantity }));
    }
  };

  const totalPrice = useSelector(selectCartTotalAmount);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // current Date

  const currentDate = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Random number

  const orderNumber = Math.floor(Math.random() * 100000);

  // Radio Button Data

  const [selectedPayment, setSelectedPayment] = useState(
    "Direct Bank Transfer"
  );

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <>
      <div className="shoppingCartSection">
        <h2>Cart</h2>

        <div className="shoppingCartTabsContainer">
          <div className={`shoppingCartTabs ${activeTab}`}>
            <button
              className={activeTab === "cartTab1" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab1");
                setPayments(false);
              }}
            >
              <div className="shoppingCartTabsNumber">
                <h3>01</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Lista de compra</h3>
                  <p>Maneja tu lista de articulos</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab2" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab2");
                setPayments(false);
              }}
              disabled={cartItems.length === 0}
            >
              <div className="shoppingCartTabsNumber">
                <h3>02</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Envío y pago</h3>
                  <p>Revisa tu lista de artículos</p>
                </div>
              </div>
            </button>
            <button
              className={activeTab === "cartTab3" ? "active" : ""}
              onClick={() => {
                handleTabClick("cartTab3");
              }}
              disabled={cartItems.length === 0 || payments === false}
            >
              <div className="shoppingCartTabsNumber">
                <h3>03</h3>
                <div className="shoppingCartTabsHeading">
                  <h3>Confirmación</h3>
                  <p>Revisar y enviar su pedido</p>
                </div>
              </div>
            </button>
          </div>
          <div className="shoppingCartTabsContent">
            {/* tab1 */}
            {activeTab === "cartTab1" && (
              <div className="shoppingBagSection">
                <div className="shoppingBagTableSection">
                  {/* For Desktop Devices */}
                  <table className="shoppingBagTable">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th></th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                          <tr key={item.productID}>
                            <td data-label="Product">
                              <div className="shoppingBagTableImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                            </td>
                            <td data-label="">
                              <div className="shoppingBagTableProductDetail">
                                <Link to="/product" onClick={scrollToTop}>
                                  <h4>{item.productName}</h4>
                                </Link>
                              </div>
                            </td>
                            <td
                              data-label="Price"
                              style={{ textAlign: "center" }}
                            >
                              {formatMoney(item.productPrice)}
                            </td>
                            <td data-label="Quantity">
                              <div className="ShoppingBagTableQuantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productID,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  min="1"
                                  max="20"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.productID,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.productID,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              <p
                                style={{
                                  textAlign: "center",
                                  fontWeight: "500",
                                }}
                              >
                                {formatMoney(item.quantity * item.productPrice)}
                              </p>
                            </td>
                            <td data-label="">
                              <MdOutlineClose
                                onClick={() =>
                                  dispatch(removeFromCart(item.productID))
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="shoppingCartEmpty">
                              <span>¡Tu carrito está vacío!</span>
                              <Link to="/" onClick={scrollToTop}>
                                <button>Compra ahora</button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <th
                        colSpan="6"
                        className="shopCartFooter"
                        style={{
                          borderBottom: "none",
                          padding: "20px 0px",
                        }}
                      >
                        
                      </th>
                    </tfoot>
                  </table>

                  {/* For Mobile devices */}

                  <div className="shoppingBagTableMobile">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.productID}>
                            <div className="shoppingBagTableMobileItems">
                              <div className="shoppingBagTableMobileItemsImg">
                                <Link to="/product" onClick={scrollToTop}>
                                  <img src={item.frontImg} alt="" />
                                </Link>
                              </div>
                              <div className="shoppingBagTableMobileItemsDetail">
                                <div className="shoppingBagTableMobileItemsDetailMain">
                                  <Link to="/product" onClick={scrollToTop}>
                                    <h4>{item.productName}</h4>
                                  </Link>
                                  <p>{item.productReviews}</p>
                                  <div className="shoppingBagTableMobileQuantity">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      min="1"
                                      max="20"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.productID,
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.productID,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span>{formatMoney(item.productPrice)}</span>
                                </div>
                                <div className="shoppingBagTableMobileItemsDetailTotal">
                                  <MdOutlineClose
                                    size={20}
                                    onClick={() =>
                                      dispatch(removeFromCart(item.productID))
                                    }
                                  />
                                  <p>{formatMoney(item.quantity * item.productPrice)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                      </>
                    ) : (
                      <div className="shoppingCartEmpty">
                        <span>Tu carrito esta vacio!</span>
                        <Link to="/shop" onClick={scrollToTop}>
                          <button>Compra ahora</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="shoppingBagTotal">
                  <h3>Total del carrito</h3>
                  <table className="shoppingBagTotalTable">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>{formatMoney(totalPrice)}</td>
                      </tr>
                      <tr>
                        <th>Envio</th>
                        <td>
                          <div className="shoppingBagTotalTableCheck">
                            <p>{(totalPrice === 0 ? 0 : formatMoney(20000))}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>I.V.A</th>
                        <td>{(totalPrice === 0 ? 0 : ((formatMoney(totalPrice * 0.16))))}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>
                          {(totalPrice === 0 ? 0 : formatMoney(totalPrice + 20000 + (totalPrice * 0.16)))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab2");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Proceder a la zona de pago
                  </button>
                </div>
              </div>
            )}

            {/* tab2 */}
            {activeTab === "cartTab2" && (
              <div className="checkoutSection">
                <div className="checkoutDetailsSection">
                  <h4>Detalles de facturación</h4>
                  <div className="checkoutDetailsForm">
                    <form>
                      <div className="checkoutDetailsFormRow">
                        <input type="text" placeholder="Nombres" />
                        <input type="text" placeholder="Apellidos" />
                      </div>
                      <input type="text" placeholder="Street Address*" />
                      <input type="text" placeholder="Ciudad *" />
                      <input type="text" placeholder="Telefono *" />
                      <input type="mail" placeholder="Tu correo *" />
                      <textarea
                        cols={30}
                        rows={8}
                        placeholder="Notas de la orden (Op)"
                      />
                    </form>
                  </div>
                </div>
                <div className="checkoutPaymentSection">
                  <div className="checkoutTotalContainer">
                    <h3>Tu orden</h3>
                    <div className="checkoutItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTOS</th>
                            <th>SUBTOTALES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>{formatMoney(items.productPrice * items.quantity)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="checkoutTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>{formatMoney(totalPrice)}</td>
                          </tr>
                          <tr>
                            <th>Envio</th>
                            <td>{formatMoney(20000)}</td>
                          </tr>
                          <tr>
                            <th>I.V.A</th>
                            <td>{formatMoney(totalPrice * 0.16)}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              {formatMoney(totalPrice === 0 ? 0 : totalPrice + 16)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="checkoutPaymentContainer">
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Transferencia bancaria directa"
                        defaultChecked
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Transferencia bancaria directa</span>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Pagos con cheque"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Pagos con cheque</span>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Pago contra entrega"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Pago contra entrega</span>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="Paypal"
                        onChange={handlePaymentChange}
                      />
                      <div className="checkoutPaymentMethod">
                        <span>Paypal</span>
                      </div>
                    </label>
                    
                  </div>
                  <button
                    onClick={() => {
                      handleTabClick("cartTab3");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setPayments(true);
                    }}
                  >
                    Realizar pedido
                  </button>
                </div>
              </div>
            )}

            {/* tab3 */}
            {activeTab === "cartTab3" && (
              <div className="orderCompleteSection">
                <div className="orderComplete">
                  <div className="orderCompleteMessage">
                    <div className="orderCompleteMessageImg">
                      <img src={success} alt="" />
                    </div>
                    <h3>Su pedido se ha completado!</h3>
                    <p>Gracias. Su pedido ha sido recibido.</p>
                  </div>
                  <div className="orderInfo">
                    <div className="orderInfoItem">
                      <p>Numero de orden</p>
                      <h4>{orderNumber}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Fecha</p>
                      <h4>{formatDate(currentDate)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Total</p>
                      <h4>${totalPrice.toFixed(2)}</h4>
                    </div>
                    <div className="orderInfoItem">
                      <p>Metodo de pago</p>
                      <h4>{selectedPayment}</h4>
                    </div>
                  </div>
                  <div className="orderTotalContainer">
                    <h3>Detalle de la orden</h3>
                    <div className="orderItems">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCTOS</th>
                            <th>SUBTOTALES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((items) => (
                            <tr>
                              <td>
                                {items.productName} x {items.quantity}
                              </td>
                              <td>{formatMoney(items.productPrice * items.quantity)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="orderTotal">
                      <table>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>{formatMoney(totalPrice)}</td>
                          </tr>
                          <tr>
                            <th>Envio</th>
                            <td>{ formatMoney(20000)}</td>
                          </tr>
                          <tr>
                            <th>I.V.A</th>
                            <td>{formatMoney(totalPrice * 0.16)}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>
                              {(totalPrice === 0 ? 0 : formatMoney(totalPrice + (totalPrice * 0.16) + 20000) )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
