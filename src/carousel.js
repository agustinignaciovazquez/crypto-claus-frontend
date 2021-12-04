import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as st from "./styles/globalStyles";


import d from "./assets/images/carrousel/Santa7.png";
import e from "./assets/images/carrousel/Santa8.png";
import f from "./assets/images/carrousel/Santa10.png";
import g from "./assets/images/carrousel/Santa11.png";
import i from "./assets/images/carrousel/Santa13.png";
import j from "./assets/images/carrousel/Santa14.png";
import k from "./assets/images/carrousel/Santa16.png";
import n from "./assets/images/carrousel/Santa19.png";
import p from "./assets/images/carrousel/Santa21.png";
import s from "./assets/images/carrousel/Santa25.png";


export default class AutoPlay extends Component {

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 6,
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
      variableWidth: true

    };
    return (
    <div>
        <slickCarousel style={{position: "relative", overflow: "hidden", width:"1500px"}}>
            <Slider {...settings} style={{position: "absolute", overflow: "hidden"}}>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${e})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${k})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${f})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${d})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${s})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${p})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${g})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${n})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${i})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
                <div>
                    <st.slickSlide style={{backgroundImage: `url(${j})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  }}/>
                </div>
            </Slider>
        </slickCarousel>
    </div>
    );
  }
}
