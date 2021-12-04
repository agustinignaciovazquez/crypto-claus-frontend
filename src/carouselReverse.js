import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as st from "./styles/globalStyles";
import "./styles/carousel-style.css";


import a from "./assets/images/carrousel/Santa3.png";
import b from "./assets/images/carrousel/Santa5.png";
import c from "./assets/images/carrousel/Santa6.png";
import h from "./assets/images/carrousel/Santa12.png";
import l from "./assets/images/carrousel/Santa17.png";
import m from "./assets/images/carrousel/Santa18.png";
import o from "./assets/images/carrousel/Santa20.png";
import q from "./assets/images/carrousel/Santa23.png";
import r from "./assets/images/carrousel/Santa24.png";
import t from "./assets/images/carrousel/Santa27.png";


export default class AutoPlay extends Component {

  render() {
    const settingsReverse = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        swipeToSlide: false,
        focusOnSelect: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        draggable: false,
        swipe: false,
        touchMove: false,
        cssEase: "linear",
        rtl: true,
        variableWidth: true

      };
    return (
    <div>
        <slickCarousel style={{position: "relative", overflow: "hidden", width:"1500px", }}>
            <Slider {...settingsReverse} className="carouselReverse" style={{position: "absolute", overflow: "hidden"}}>

                <div>
                    <st.slickSlide style={{backgroundImage: `url(${b})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${t})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${m})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${h})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${o})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${q})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${r})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${a})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${l})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${c})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
            </Slider>
        </slickCarousel>
    </div>
    );
  }
}
