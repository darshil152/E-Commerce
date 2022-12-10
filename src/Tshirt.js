import React, { useState, useCallback, createContext } from "react";
import { CartProvider, useCart } from "react-use-cart";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import hoddies from './assets/jackets.jpg';
import show from './assets/show.gif';
import { json } from 'react-router';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ModalDialog } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";
import Cart from './cart';
import { color } from "@mui/system";
import { BatchPrediction, CheckBox, PermCameraMic } from "@mui/icons-material";
import sizechart from "./assets/sizechart.png"
import Wishlist from "./wishlist";





export default function Tshirt() {

    const [getteesdata, setGetteesdata] = useState(JSON.parse(localStorage.getItem('productdetail')));
    const [color, setColor] = useState('green')
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [counter, setCounter] = useState(0);



    // -----------------  Product Counter --------------------//
    const increase = () => {
        setCounter(count => count + 1);
    };
    const decrease = () => {
        if (counter > 0) {
            setCounter(count => count - 1);
        }
    };
    const reset = () => {
        setCounter(0)
    }


    //  -------------------- Price sorting ----------------------//
    const sorting = (e) => {
        getteesdata.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        console.log(getteesdata)
    }
    const sorting1 = (e) => {
        getteesdata.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        console.log(getteesdata)
    }


    //---------------select size-------------------------------//
    let handlesize = (data) => {
        console.log("your selected size", data);
        toast.success(((data)), {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
    }



    //-------------------product slider --------------------------//
    const settings = {
        customPaging: function (i) {
            return (
                <a>

                    <img
                        src={modal.file[i]}
                        alt=""
                        style={{
                            height: "80px",
                            width: "72px",
                            objectFit: "fill",
                            borderRadius: "10px"
                        }}
                    />
                </a>
            );
        },
        dots: true,
        cssEase: "linear",
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }



    // ------------------open model ---------------------//
    const openModal = (data) => {
        console.log('data :: ', data)
        setModal(data)
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }
    const close = () => {
        setModalIsOpen(false)
    }


    //-------------------add to cart /state lifting---------------//
    const [add, setAdd] = useState([])
    const addtocarts = (data) => {

        // add.push(data)
        // setAdd(add)
        // localStorage.setItem('cartitems', JSON.stringify(add));

        let olddata = localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem('cartitems')) : []
        let duplicate = false;

        for (let i = 0; i < olddata.length; i++) {
            if (olddata[i] === data) {
                duplicate = true
            }
        }
        if (!duplicate) {
            add.push(data)
            setAdd(add)
            localStorage.setItem('cartitems', JSON.stringify(add));
        }
        console.log(add)
    }
    
    //----------------show selected size ----------------------------//
    const getInitialState = () => {
        const value = "X";
        return value;
    };
    const [value, setValue] = useState(getInitialState);
    const handleChange = (e) => {
        setValue(e.target.value);
    };


    //-------------------Total price of product ---------------------//
    const sendprice = (data) => {
        console.log("Total Price", data * modal.price)
    }


    //-------------------Wishlist ------------------------------------//
    const [wishlist1, setWishlist1] = useState([])
    const addto = (data) => {

        let oldwishlsit = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem('wishlist')) : []
        let flag = false;

        for (let i = 0; i < oldwishlsit.length; i++) {
            if (oldwishlsit[i].id === data.id) {
                flag = true
            }
        }
        if (!flag) {
            wishlist1.push(data)
            setWishlist1(wishlist1)
            localStorage.setItem('wishlist', JSON.stringify(wishlist1))
        }
        console.log(wishlist1)
    }

    // const openModal = useCallback(() => setIsOpen(true), setModalData(data), []);
    // const closeModal = useCallback(() => setIsOpen(false), []);

    return (
        <>
            <div className='container'>
                <div class="row">
                    <h1 className='heading1'>Tshirts</h1>
                    <div className="soring">
                        <label className="price">Price:</label>
                        <select id="sorting">
                            <option value="low to high" onClick={sorting}>low to high</option>
                            <option value="low to high" onClick={sorting1}>high to low</option>
                        </select>
                    </div>
                    {
                        getteesdata.length > 0 && getteesdata.map((item, i) => {
                            return (
                                <div class="col-md-3 col-sm-6">
                                    <div class="product-grid">
                                        <div class="product-image">
                                            <a href="#" class="image">
                                                <img class="pic-1" src={item.file[0]} />
                                            </a>
                                            <span class="product-discount-label">{item.discount}%</span>
                                            <ul class="product-links">
                                                <li><a href="#" data-tip="Add to Wishlist" onClick={() => addto(item)}><i class="fas fa-heart" ></i></a></li>
                                                <li><a href="#" data-tip="Quick View" onClick={() => openModal(item)}><i class="fa fa-search" ></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="product-content">
                                            <h3 class="title">{item.productname}</h3>
                                            <div class="price">₹{item.price}</div>
                                            <a class="add-to-cart" onClick={() => addtocarts(item.id)} >add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {isOpen && <Modal isOpen={isOpen} onRequestClose={closeModal}>
                        <button onClick={closeModal}>X</button>
                        <div>
                            <div class="container">
                                <div class="card">
                                    <div class="container-fliud">
                                        <div class="wrapper row">
                                            <div class="preview col-md-6">
                                                <div class="tab-pane active" id="pic-1">
                                                    {/* <img src={modal.file && (modal.file.length > 0 ? modal.file[0] : '')}
                                                    isclassName="innerproduct"
                                                    width="500" /> */}
                                                    <div>
                                                        <Slider {...settings}>
                                                            {modal.file.map((item, i) => (
                                                                <div>
                                                                    <img
                                                                        src={modal.file[i]}
                                                                        alt=""
                                                                        style={{ width: "100%", height: "100%" }}
                                                                        className="slickslideriamge"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    </div>


                                                </div>
                                                {/* <div class="preview-pic tab-content"> */}
                                                {/* <ul class="preview-thumbnail nav nav-tabs">
                                                    {modal.file && modal.file.map((item, i) => {
                                                        return (
                                                            <li class="active">
                                                                <a data-target="#pic-1" data-toggle="tab">
                                                                    <img src={item} className="innerproduct" />
                                                                   
                                                                            <img
                                                                                alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                                                                                src={item}
                                                                                width="100"
                                                                                className="zoomeffct" 
                                                                            />
                                                                      
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                                </ul> */}

                                                {/* </div> */}
                                            </div>
                                            <div class="details col-md-6">
                                                <h3 class="product-title">{modal.productname}</h3>
                                                <h4 class="price"><span>₹{modal.price}</span></h4>
                                                <div class="product-info-button" onClick={setModalIsOpenToTrue}>Size chart →

                                                    <Modal isOpen={modalIsOpen} className="charts" onRequestClose={close}>
                                                        {/* <button onClick={closeModals}>x</button> */}
                                                        <button onClick={close}>Close</button>
                                                        <div className="sizechart" >
                                                            <img src={sizechart} />
                                                        </div>
                                                    </Modal>
                                                </div>
                                                <div className="sizes">
                                                    {/* {modal.checked && modal.checked.map((item, i) => {
                                                    return (
                                                        <button className="sizebutton" onClick={() => handlesize(item)}>{item}</button> 
                                                    )
                                                   
                                                })} */}
                                                    <select value={value} onChange={handleChange}>
                                                        <option value="X">X</option>
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="L">L</option>
                                                        <option value="XL">XL</option>
                                                        <option value="XXL">XXL</option>
                                                        <option value="XXXL">XXXL</option>
                                                    </select>
                                                    <h4>{`You selected size ${value}`}</h4>
                                                </div>

                                                <div className="counter">
                                                    <span className="counter__output">{counter}</span>
                                                    <div className="btn__container">
                                                        <button className="control__btn" onClick={decrease}>-</button>
                                                        <button className="control__btn" onClick={increase}>+</button>
                                                        <button className="reset" onClick={reset}>Reset</button>
                                                        <button className='cfade1' value="Close modal" onClick={() => sendprice(counter)}>Add to Cart</button>

                                                    </div>
                                                </div>
                                                <div className='adada1'>
                                                    <button className='cfade1' value="Close modal">Add to Wishlist</button>
                                                </div>
                                                {/* <p class="product-description">{modal.description}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>}
                </div>
            </div>
        </>


    )
}