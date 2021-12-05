import React from "react";

import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsPlusSquare } from "react-icons/bs";
import { BsDashSquare } from "react-icons/bs";
import * as s from "./styles/globalStyles";
import "./styles/app-style.css";


export default class Faq extends React.Component{


    constructor(props){
        super(props);
        this.state = {
           questions: [
                {
                    title: "What is an NFT?",
                    content: "An NFT (Non-Fungible Token) is a digital asset that can only be owned by one person. When you acquire an NFT, you become the sole owner of that asset, and of the added profits it may have. An NFT has its own value and can increase in price over time if other people are willing to buy it from you."
                }, 

                {
                    title: "What network will this be launched on?",
                    content: "Ethereum."
                }, 
            
                
                {
                    title: "Is Crypto Claus going to have a presale",
                    content: "Yes, we are working hard in order to have a whitelist for people who deserve it."
                },  

                {
                    title: "Where can I mint?",
                    content: "On this website, as soon as the countdown reaches to 0."
                },  

                {
                    title: "How many can I mint?",
                    content: "You can mint as many Crypto Claus as you want until the 4444 NFTs available are sold out."
                },  

                {
                    title: "Which wallet do I need?",
                    content: "Any wallet that supports Ethereum blockchain is good. Metamask is the one we recommend the most."
                },  
           ],
           questionState:[],
        }

        this.updateIcon = this.updateIcon.bind(this);

    }


    componentDidMount(){
        
        this.setState({
            questionState:new Array(this.state.questions.length).fill(false), 
        })

    }

    updateIcon = (i) => {
        // 1. Make a shallow copy of the items
        let items = [...this.state.questionState];
        
        // 2. Make a shallow copy of the item you want to mutate
        let item = items[i];
        // 3. Replace the property you're intested in
        item = !item;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[i] = item;
        // 5. Set the state to our new copy
        this.setState({questionState:items});           

    }

    render(){

        return(
        
            <div>
                <Row>     
                    <s.TextTitle2 style={{paddingTop: "50px", textAlign: "center"}}>
                        FAQ
                    </s.TextTitle2>
                </Row>

                {this.state.questions.map((element, index)=>
                    <Row>
                        <Col xs={1} lg={4} sm={1} md={1}/>
                        <Col xs={10} lg={4} sm={10} md={10}>
                            
                            <Row style={{ paddingTop: "50px"}}>
                                <Col xs={1} sm={1} md={1} lg={1}>
                                    <s.TextDescription2 >
                                    {this.state.questionState[index] ? <BsDashSquare onClick={() => this.updateIcon(index)}/> : <BsPlusSquare onClick={() => this.updateIcon(index)}/> }
                                    </s.TextDescription2 >
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10}>
                                <s.TextDescription2 >
                                {element.title}
                                </s.TextDescription2> 
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1} sm={1} md={1} lg={1}/>
                                <Col xs={10} sm={10} md={10} lg={10}>
                                    <s.TextDescription3>
                                    {this.state.questionState[index] ? <div>{element.content}</div> : <div></div>}
                                    </s.TextDescription3>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} lg={4} sm={1} md={1}/>
                    </Row>


                )}            
            </div>
        
        
        
        
        )
    }



}