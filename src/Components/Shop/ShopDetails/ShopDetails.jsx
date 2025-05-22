/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import Filter from "../Filters/Filter";
import { Link, useParams } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { productActions } from './../../../Application/Actions/product';
import { categoryActions } from './../../../Application/Actions/category';
import { useSetState, useUpdateEffect } from "react-use";
import useProduct from "../../../hooks/useProduct";
import useCategory from "../../../hooks/useCategory";
import FullScreenLoader from "../../FullScreenLoader";
import formatMoney from "../../../util/formatMoney";

const urlImg = 'http://localhost:8181/images/';

const ShopDetails = () => {
  const { gen } = useParams();

  const dispatch = useDispatch();
  const { products, isFetchingGetProducts, } = useProduct();
  const { categories, isFetchingGetCategories, } = useCategory();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  const isFetching = useMemo(() => {
    return Boolean(
      isFetchingGetProducts && 
      isFetchingGetCategories
    );
  }, []);

  const labelGender = useMemo(() => {
    return gen == 'woman' ? 'Shop para mujeres' : 'Shop para hombre'
  }, [gen]);

  const shopProducts = useMemo(() => {
    return products.map((pro) => {
      const firstImg = pro.productImages[0].image;
      const secondImg = pro.productImages.length > 1 ? pro.productImages[1].image : pro.productImages[0].image;
      
      return {
        productID: pro.id,
        frontImg: `${urlImg}${firstImg}`,
        backImg: `${urlImg}${secondImg}`,
        productName: pro.name,
        productPrice: pro.price,
        gender: pro.genderName,
        category: pro.categoryName,
        productImages: pro.productImages,
      }
    });
  }, [products]);

  const [categoryId, setCategoryId] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const [filterProduct, setFilterProduct] = useSetState({
    gender: gen === 'woman' ? 'm' : 'h',
    categoryId: 0,
    minPrice: 0,
    maxPrice: 0
  });

  useEffect(() => {
    setFilterProduct({ gender: gen === 'woman' ? 'm' : 'h', categoryId: 0,  minPrice: 0, maxPrice: 1000000,});
  }, [gen]);

  useUpdateEffect(() => {
    setFilterProduct({ gen, categoryId, minPrice, maxPrice });
  }, [categoryId, minPrice, maxPrice]);

  useEffect(() => {
    dispatch(productActions.getProducts(filterProduct));
  }, [filterProduct]);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <>
      <FullScreenLoader isFetching={isFetching} />
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter 
              categories={categories} 
              minPrice={minPrice} 
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>/
                <Link to={'/shop/${gen}'} onClick={scrollToTop}>
                  { labelGender } 
                </Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {shopProducts.map((product) => (
                  <div className="sdProductContainer">
                    <div className="sdProductImages">
                      <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt=""
                          className="sdProduct_front"
                        />
                        <img
                          src={product.backImg}
                          alt=""
                          className="sdProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Agregar al carro
                      </h4>
                    </div>
                    <div
                      className="sdProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{product.category}</p>
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to="/product" onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>

                        <p>{formatMoney(product.productPrice)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter 
              categories={categories} 
              minPrice={minPrice} 
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              categoryId={categoryId}
              setCategoryId={setCategoryId}/>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
