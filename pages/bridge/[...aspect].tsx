"use strict";
import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Script from 'next/script';
import {Button, Card, Col, Container, Form, NavLink, Row, Nav, Navbar} from "react-bootstrap";
import { useRouter } from 'next/router';
import NavIndex from '../../components/ab/nav';
import navComponentObject from '../../components/ab/navigaton';
import { GetServerSideProps } from 'next';
import { ActiveUser } from '../login/[userlogin]';
import Calendar from 'react-calendar';
import 'components/calendar.module.css';
import 'react-calendar/dist/Calendar.css';
import SimpleNav from '../../components/simplenav';
import { translit } from './hebrew';

/**CSS module *//not working/
//TODO is working

/**Custom Components */


/*THERE'S A BETTER WAY THAN THIS*/
const componentObject = navComponentObject()

/**
 * This is the Primary function of the web site. All dunamic rendering is processed here
 * 
 * @returns This web site
 */
export default function AspectBridge(props: ActiveUser) {
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)
    const [access, setAccess] = useState(props.access)
    const [message, setMessage] = useState(props.message)
    const router = useRouter()
    if(username != 'Login'){
    useEffect(() => {
        router.push('./'+username)
    }, [username])}
    return <>
        <Headers />
        <Container className={'aspect'}>
            <ContainerHeader username={username} access={access}/>
            <Row id="content" className={""}>
                <NavLeftDefault />
                    <DynamicInfo />
                <NavRightDefault />
            </Row>
            <Row>
                <CalendarTab />
            </Row>
            <Footer />
        </Container>
    </>
}
function CalendarTab(){
    const [date, setDate] = useState(new Date());

    return (
        <div className='calendar grey-back'>
            <h1 className='text-center'>React Calendar</h1>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );
}

/**
 * The Head section contains all the complicated important stuff.
 * The brains if you will.
 * 
 * @returns <Head>{els}</Head>
 */
function Headers(){
    return <Head>
                <title>Aspect Bridge</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <link rel="shortcut icon" href="assets/binary2.png" type="image/x-icon" />
                <Script src="js/script.js"></Script>
                <Script src="js/hebrew.js"></Script>
            </Head>
}

/**
 * This is an optional segment that simply contains the top main bar
 * 
 * @returns Title bar and Navbar
 */
function ContainerHeader(props){
    return <Row id='header' className={"well-sm tcenter"}>
                <Col sm={12} className='tcenter navy_back title logo'>
                    <h1>Aspect Bridge</h1>
                    <NavIndex username={props.username} access={props.access} root={"bridge"}/>
                </Col>
            </Row>
}

/**
 * This is the left side navigation meue
 * Note: we maybe could make variations of this function for alternate uses
 * 
 * @returns Client Navs
 */
function NavLeftDefault(){  
    return <Col md={1} id="nav-left" className={"well-sm grey-back o7"}>
            {componentObject.navcards.aspects}
            <SimpleNav root={"bridge"} title={"aspects"} links={["air", "fire", "water", "earth"]} args={""}/>
            </Col>
}
function NavRightDefault(){  
    return <Col md={1} id="nav-right" className={"well-sm grey-back o7"}>
            {componentObject.navcards.air}
            </Col>
}
function Footer(){
    return <Row id="footer" className={""}>
                <Col sm={3} >
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>Contact Us</Card.Title>
                            <hr />
                            <Card.Text>Somehow</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6} >
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>About...Upon</Card.Title>
                            <hr />
                            <Card.Text>
                                Crossing lines no one considers crossing, not for lacking morality<br />
                                More has remained mystery that has ever been concieved of by mind.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} ><div>
                    <Card className={'gray-back'}>
                        <Card.Body>
                            <Card.Title className={'img-banner'}>News</Card.Title>
                            <hr />
                            <Card.Text>"Lorem ipsum dolor sit amet,</Card.Text>
                        </Card.Body>
                    </Card></div>
                </Col>
            </Row>
}

/**
 * This is where all the magic happens.
 * Observe...
 * 
 * This section between the <Card.Text> tags chooses what Page loads determined by the url
 * 
 * @returns DynamicInfo
 */
function DynamicInfo(args){
    const router = useRouter()
    const { aspect } = router.query //query url props
    const [bridge, setBridge] = useState(<></>)
    const [dir, setDir] = useState('')
    const [sub, setSub] = useState('')
    const [nest, setNest] = useState('')
    function handleBridgePassage(){
        if(aspect){
            let dir = args.username?args.username:(aspect.length>1?aspect[0]:aspect).toString()
            let sub = (aspect.length>1?aspect[1]:aspect).toString()
            let nest = (aspect.length>2?aspect[2]:(aspect.length>1?aspect[1]:aspect)).toString()
            setDir(dir)
            setSub(sub)
            setNest(nest)            
            switch(dir){
                case 'dashboard': setBridge(<>DASHBOARD</>)
                break;
                case 'q': {
                    switch(sub){
                        case 'q': setBridge(<>QQ</>)
                        break;
                        default: setBridge(<>Q not Q</>)
                        break;
                    }
                } break;
                case 'api': //{router.push('/bridge/api/users.ts')}
                break;
                default: {setBridge(<Placeholder feed={dir}/>)}
                break;
            }console.log('Client: '+dir+'|'+(aspect.length>1?aspect[0]:aspect)+' ./. Subdomain: '+sub+'|'+(aspect.length>1?aspect[1]:aspect))
        }
    }
    useEffect(() => {
        handleBridgePassage()
        return handleBridgePassage()
    }, [aspect])
    return <Col md={10} id='home' className={"well-sm white-back scroll"}>
                <Row className={""}><h3 className={'img-banner'}>{args.username?args.username:dir}</h3></Row>
                <hr />
                {bridge}
                <TLiterator />
            </Col>
}
function Placeholder(props){
    return <Row className={""}>
            <Col md={12} className={"tcenter black-font"}>
                <h1>{props.feed}</h1>
                <p>14. The race of the dwarfs | in Dvalin's throng</p>
                <p>Down to Lofar | the list must I tell;</p>
                <p>The rocks they left, | and through wet lands</p>
                <p>They sought a home | in the fields of sand.</p>
            </Col>
            <Col md={12} className={"tcenter black-font"}>
                <h3>Eye, Theou, Soul</h3>
                <p>Egh: "I" live for 'Your' breath is in "me"</p>
                <p>Tuh: "You" breathe life into 'me'</p>
                <p>Swe: "Self" is 'Your' breath becoming 'me'</p>
            </Col>
            <Col md={12} className={"tcenter black-font"}>
                <h3>Egg, Two, Schwa</h3>
                <p>Egh: Add 1 egg</p>
                <p>Tuh: Add another egg</p>
                <p>Swe: Stir</p>
            </Col>
        </Row>
}
function TLiterator(props){
    const [tlword, setTLWord] = useState('Inavtive')
    const word = 'Inavtive'

    function tl(e) {
        e.preventDefault();
        setTLWord(translit(e.target.value))
      }

    return <Row className={""}>
            <Col sm={3}></Col>
            <Col sm={6} id="content">
                <Form id="tLit" className="vcenter tcenter">
                    <Form.Group>
                        <Form.Label>Input</Form.Label>
                        <Form.Control  type="text" id="word" name="word" placeholder="Enter word" onChange={tl} />
                        <Form.Text className="text-muted"><h2>transliteration: </h2></Form.Text>
                        <Form.Text className="text-muted"><h1 id="hbru">{tlword}</h1></Form.Text>
                        {/*<Form.Control  type="submit"/>*/}
                    </Form.Group>
                
                </Form>
            </Col>
            <Col sm={3}></Col>
        </Row>
}
export const getServerSideProps: GetServerSideProps<ActiveUser> = async (context) => {
    const query = context.query
    const userProps: ActiveUser = {
        username: query.username&&query.username!=undefined?query.username:'login',
        email: query.email?query.email:'',
        access: query.access?query.access:'0',
        message: query.message?query.message:'Do you need to login?',
        homepage: query.aspect?query.aspect:""
    }
    return {props: userProps}
}