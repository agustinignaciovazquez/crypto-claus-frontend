import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import gif from "./assets/images/CryptoClausGIF.gif";
import icon from "./assets/images/icon.png"

import lineRoadMap from "./assets/images/lineasRoadMap8.png"

import Faq from './Faq';

import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import "./styles/app-style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SiGmail } from "react-icons/si";
import { FaDiscord, FaTwitter,  } from 'react-icons/fa';
import AutoPlay from "./carousel.js";
import AutoPlayReverse from "./carouselReverse.js";
import CountdownTimer from "./countdownTimer.js";
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Countdown from 'react-countdown';

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  @media (min-width: 767px) {
    width: 100px;
    height: 100px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;





export const InformationSection = styled.div`
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>
        {Number(data.totalSupply) === 1000 ? (
        <>
          <s.TextTitle style={{ textAlign: "center" }}>
            The sale has ended.
          </s.TextTitle>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center" }}>
            You can still find Nerdy Coder Clones on{" "}
            <a
              target={"_blank"}
              rel="noreferrer"
              href={"https://opensea.io/collection/nerdy-coder-clones"}
            >
              Opensea.io
            </a>
          </s.TextDescription>
        </>
      ) : (
        <>
          <s.TextTitle style={{ textAlign: "center" }}>
            1 NCC costs 100 MATIC.
          </s.TextTitle>
          <s.TextDescription style={{ textAlign: "center" }}>
            {feedback}
          </s.TextDescription>
          {blockchain.account === "" ||
          blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.TextDescription style={{ textAlign: "center" }}>
                Connect to the Polygon network
              </s.TextDescription>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
              >
                CONNECT
              </StyledButton>
              {blockchain.errorMsg !== "" ? (
                <>
                  <s.SpacerSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                    {blockchain.errorMsg}
                  </s.TextDescription>
                </>
              ) : null}
            </s.Container>
          ) : (
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
              <StyledButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  claimNFTs(1);
                  getData();
                }}
              >
                {claimingNft ? "BUSY" : "MINT"}
              </StyledButton>
            </s.Container>
          )}
        </>
      )}
      </div>;
    } else {
      // Render a countdown
      return <CountdownTimer timeTillDate="12 20 2021, 6:00 am" timeFormat="MM DD YYYY, h:mm a" />
    }
  };

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: blockchain.account,
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.account, blockchain.smartContract, dispatch]);

  return (
    <s.Screen>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home"><img src={icon} alt="Home" className="iconStyle"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#profit">Profit</Nav.Link>
              <Nav.Link href="#roadMap">Road Map</Nav.Link>
              <Nav.Link href="#faq">FAQ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://discord.gg/ezDKCcCy" className="iconNavBar">
                <FaDiscord/>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://twitter.com/CryptoClaussNFT" className="iconNavBar">
                <FaTwitter/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <InformationSection id="home" className="bannerSection">
        <div className="padding-top-countdown">
          <Countdown date={new Date(1639976583 * 1000)} renderer={renderer}/>
        </div>

      </InformationSection>

      <InformationSection id="about">
        <Container fluid>
          <Row>
            <Col lg={2} xs={1} md={1} sm={1}></Col>
            <Col lg={5}>
              <s.TextTitle2 className="padding-top-title">
                What is Crypto Claus?
              </s.TextTitle2>
              <s.TextDescription2 className="padding-top-description">
                CryptoClaus is a collection of 4444 uniquely generated Santa Claus.
                Our foremost commitment is delivering value to our community members.
                In doing so we have dedicated countless hours into ensuring the artwork and project scope  are top tier. <br/>
              </s.TextDescription2>
              <s.TextDescription2 className="padding-top-description2">
                Delivering Value to Believers Crypto Claus holders will have access to exclusive airdrops, prizes, collaborative gifts, and other valuable benefits.
                In addition to delivering value to our community one of our core values is assisting in nonprofit efforts to poor children.
                Crypto Claus will make donations to a number of childen´s ong agencies to help ensure the wellness of a lot of children in the world.
              </s.TextDescription2>
            </Col>
            <Col className="paddingGif">
              <s.gif style={{backgroundImage: `url(${gif})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}/>
            </Col>
            <Col lg={2} xs={1} md={1} sm={1}></Col>
          </Row>

        </Container>
      </InformationSection>
      <InformationSection id="gallery" className="gallerySection">
        <InformationSection className="carouselstyle">
          <AutoPlay/>
          <AutoPlayReverse/>
        </InformationSection>
      </InformationSection>

      <InformationSection id="profit">
        <Container fluid>
          <Row>
            <Col lg={1} xs={0} md={0} sm={0}></Col>
            <Col lg={5} md={12}>
              <s.TextTitle2 className="padding-top-title">
                Why makes a Crypto Claus special?
              </s.TextTitle2>
              <s.TextDescription2 className="padding-top-description">
                Each Crypto Claus is the result of combining a lot of hand-designed attributes, which means that each one is unique and the chances of two Crypto Clauses being the same is almost null. <br/>
              </s.TextDescription2>
              <s.TextDescription2 className="padding-top-description2">
                Like all NFTs that are mined, a Crypto Claus is completely unique and unforgeable within the blockchain network.
                Each of the attributes that make up the Crypto Claus (background, body, eyes, mouth, hat, beard, moustache, ear, nose, head) have a certain probability of appearing. As you can imagine, the lower the probability, the more value that Crypto Claus will have and the more expensive it can be resold.
              </s.TextDescription2>
            </Col>
            <Col lg={5} md={12} className="paddingGif">
              <s.gif style={{backgroundImage: `url(${gif})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}/>
            </Col>
            <Col lg={2} xs={0} md={0} sm={0}></Col>
          </Row>

        </Container>
      </InformationSection>

      <InformationSection id="roadMap" className="infoSection">
        <Container style={{paddingBottom: "100px" }}>
          <Row className="roadmap-tittle-padding">
            <Col>
            <s.TextTitle style={{ textAlign: "center", }}>
              Road Map
            </s.TextTitle>
            </Col>
          </Row>
          <Row xl={2} md={1} sm={1} xs={1} className="lineRoadMapContainer">
            <img src={lineRoadMap} alt={"Roadmap"} className="roadMapLine"/>
            <Col>
              <Row xl={8} md={8} sm={8} xs={8}>
                <Col xl={1} md={2} sm={2} xs={2}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#fffeed"}}>
                      <AcUnitIcon style={{color: "#c19e50"}}/>
                    </TimelineDot>
                  </TimelineSeparator>
                </Col>
                <Col xl={7} md={10} sm={10} xs={10}>
                  <s.TextRoadMapTitle style={{ textAlign: "left", }}>
                    Q1 - Pre-launch
                  </s.TextRoadMapTitle>
                  <s.TextRoadMapDescription style={{ textAlign: "left", paddingTop: "30px", color: "#fffeed", }}>
                    Looking for different NGOs that are dedicated to helping children in street situations.<br/>
                    Create 4444 original Crypto Claus NFT.<br/>
                    Robust multi-channel marketing campaign.<br/>
                  </s.TextRoadMapDescription>
                </Col>
              </Row>
            </Col>
            <Col>
            </Col>
          </Row>
          <Row xl={2} md={1} sm={1} xs={1} style={{paddingTop: "50px"}}>
            <Col/>
            <Col>
              <Row xl={8} md={8} sm={8} xs={8}>
                <Col xl={3} md={0}  sm={0} xs={0}/>
                <Col xl={1} md={2} sm={2} xs={2}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#fffeed"}}>
                      <AcUnitIcon style={{color: "#c19e50"}}/>
                    </TimelineDot>
                  </TimelineSeparator>
                </Col>
                <Col xl={8} md={10} sm={10} xs={10}>
                  <s.TextRoadMapTitle style={{ textAlign: "left", }}>
                    Q2 - Launch
                  </s.TextRoadMapTitle>
                  <s.TextRoadMapDescription style={{ textAlign: "left", paddingTop: "30px", color: "#fffeed", }}>
                    Whitelisting event<br/>
                    Mint 4444 Crypto Claus<br/>
                    Launch the collection on opensea gallery <br/>
                    Donation to NGOs <br/>
                  </s.TextRoadMapDescription>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xl={2} md={1} sm={1} xs={1} style={{paddingTop: "50px"}}>
            <Col>
              <Row xl={8} md={8} sm={8} xs={8}>
                <Col xl={1} md={2} sm={2} xs={2}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#fffeed"}}>
                      <AcUnitIcon style={{color: "#c19e50"}}/>
                    </TimelineDot>
                  </TimelineSeparator>
                </Col>
                <Col xl={7} md={8} sm={8} xs={8} >
                  <s.TextRoadMapTitle style={{ textAlign: "left", }}>
                    Q3 - Gratefulness
                  </s.TextRoadMapTitle>
                  <s.TextRoadMapDescription style={{ textAlign: "left", paddingTop: "30px", color: "#fffeed", }}>
                    Airdrop 5555 valuable Santa's Reindeer to Crypto Claus holders. <br/>
                    200 Santa's Reindeer reserved for OG discord members. <br/>
                    50 Santa's Reindeer reserved for strategic partnerships. <br/>
                  </s.TextRoadMapDescription>
                </Col>
              </Row>
            </Col>
            <Col/>
          </Row>
          <Row xl={2} md={1} sm={1} xs={1} style={{paddingTop: "50px"}}>
            <Col/>
            <Col>
              <Row xl={8} md={8} sm={8} xs={8}>
                <Col xl={3} md={0} sm={0} xs={0}/>
                <Col xl={1} md={2} sm={2} xs={2}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#fffeed"}}>
                      <AcUnitIcon style={{color: "#c19e50"}}/>
                    </TimelineDot>
                  </TimelineSeparator>
                </Col>
                <Col xl={8} md={10} sm={10} xs={10}>
                  <s.TextRoadMapTitle style={{ textAlign: "left", }}>
                    Q4 - New Santas pre-launch
                  </s.TextRoadMapTitle>
                  <s.TextRoadMapDescription style={{ textAlign: "left", paddingTop: "30px", color: "#fffeed", }}>
                    Create a new Crypto Claus NFT edition (another artist)<br/>
                    Whitelist for Santa`s holders <br/>
                    Launch our own Crypto Santa Gallery <br/>
                  </s.TextRoadMapDescription>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xl={2} md={1} sm={1} xs={1} style={{paddingTop: "50px"}}>
            <Col>
              <Row xl={8} md={8} sm={8} xs={8}>
                <Col xl={1} md={2} sm={2} xs={2}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#fffeed"}}>
                      <AcUnitIcon style={{color: "#c19e50"}}/>
                    </TimelineDot>
                  </TimelineSeparator>
                </Col>
                <Col xl={7} md={10} sm={10} xs={10}>
                  <s.TextRoadMapTitle style={{ textAlign: "left", }}>
                    Q5 - New Santas launch
                  </s.TextRoadMapTitle>
                  <s.TextRoadMapDescription style={{ textAlign: "left", paddingTop: "30px", color: "#fffeed", }}>
                    Mint 4444 Crypto Claus v2 <br/>
                    Launch the new collection on opensea gallery <br/>
                    Donation to NGOs <br/>
                  </s.TextRoadMapDescription>
                </Col>
              </Row>
            </Col>
            <Col/>
          </Row>
        </Container>
      </InformationSection>

      <InformationSection id="faq">
        <Faq/>
      </InformationSection>

      <InformationSection className="footerSection" >
          <Row className="textFooter">
            <Col lg={4} xs={4} md={4} sm={4} style={{textAlign: "center"}}>
              <a href="mailto:cryptoclausnft.group@gmail.com" className="iconFooter">
                <SiGmail/>
              </a>

            </Col>
            <Col lg={4} xs={4} md={4} sm={4} style={{textAlign: "center"}}>
              <a href="https://discord.gg/ezDKCcCy" className="iconFooter">
                <FaDiscord/>
              </a>
            </Col>
            <Col lg={4} xs={4} md={4} sm={4} style={{textAlign: "center"}}>
              <a href="https://twitter.com/CryptoClaussNFT" className="iconFooter">
                <FaTwitter/>
              </a>
            </Col>

          </Row>
      </InformationSection>

      </s.Screen>
  );
}

export default App;
