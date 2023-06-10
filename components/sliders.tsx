import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./sliders.module.css";

export default function CssSlidersWrapper(props) {
    //{children}
    const [controlerOpen, setControlerOpen] = useState(false)
    const [controlerTarget, setControlerTarget] = useState(null)


    const [state, setState] = useState({});
    const styleRef = useRef({
        top: "0vh",
        left: "0vw",
        width: '100vw',
        height: '100vh',
        opacity: '100%',
        borderRadius: '0%',
        borderWidth: '0%',
        //fontSize: '100%',
        margin: '0%',
        padding: '0%',
        color: 'black',
        display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'gray',
        borderColor: 'black',
        ...props.style
    })

    useEffect(() => {
        props.setStyle(props.id, {...styleRef.current})
        console.log(props.id+" css sliders wrapper style updated")
    }, [state])

    /*const [content, setContent] = useState(<></>)
        useEffect(()=>{
            setContent(<>
                
            </>)
        },[])*/
    const sliders = [
        { name: 'zIndex', min: 0, max: 10},
        { name: 'width', min: 0, max: 100, unit: 'vw' },
        { name: 'height', min: 0, max: 100, unit: 'vh' },
        { name: 'left', min: 0, max: 100, unit: 'vw' },
        { name: 'top', min: 0, max: 100, unit: 'vh' },
        { name: 'opacity', min: 0, max: 100, unit: '%' },
        { name: 'borderRadius', min: 0, max: 50, unit: 'px' },
        { name: 'borderRadius', min: 0, max: 50, unit: '%' },
    ]
    const slidersColor = [
        { name: 'color' },
        { name: 'backgroundColor' },
        { name: 'borderColor' },
    ]
    const q = false
    if(q)return (
        <div id={"csswrapper_"+props.id} style={{ ...props.styleRef, ...styleRef.current, position: 'absolute' }}>
            <div id={"csschild_" + props.id} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <Dialog id={"csscontrol_" + props.id} className={style.controlStyle} title={'css sliders'} open={'<>'} close={'</>'}>
                    <Container>
                        {sliders.map((slider, i) => {
                            return <Row key={i}>
                                <Col xs={6}><label>{slider.name + ': '+styleRef.current[slider.name]+'  '}</label>
                                </Col>
                                <Col xs={6}><input
                                    type="range"
                                    min={slider.min}
                                    max={slider.max}
                                    name={slider.name}
                                    defaultValue={styleRef.current[slider.name].split(slider.unit)[0]}
                                    onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleRef.current[slider.name] = e.target.value + slider.unit; setState({}); }}
                                /></Col>
                            </Row>
                        })}
                        {slidersColor.map((slider, i) => {
                            return <Row key={i}>
                                <Col xs={6}><label>{slider.name + ': '+styleRef.current[slider.name]+'  '}</label>
                                </Col>
                                <Col xs={6}><input
                                    type="color"
                                    name={slider.name}
                                    defaultValue={styleRef.current[slider.name]}
                                    onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleRef.current[slider.name] = e.target.value; setState({}); }}
                                /></Col>
                            </Row>
                        })}
                    </Container>
                </Dialog>
                {props.children}
            </div>
        </div>
    )
    else return <>
        <div id={"csswrapper_"+props.id} style={{ ...props.styleRef, ...styleRef.current, position: 'absolute' }}>
            <div id={"csschild_" + props.id} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <div id={"csscontrolerbutton_" + props.id} className={style.controlStyle} title={'css sliders'}>
                    <Button id={'csscontroleropen_'+props.id} onClick={
                        ()=>{setControlerOpen(!controlerOpen)}
                    }>{controlerOpen?'Close':'Open'}</Button>
                </div>
                {props.children}
            </div>
        </div>
        {controlerOpen?<CssControler sliders={sliders} slidersColor={slidersColor} styleRef={styleRef} setState={setState}/>:null}
    </>

}

export function CssControler(props){
    const {sliders, slidersColor, styleRef, setState} = props
    return <div id={"csscontroler_" + props.id} style={{position: 'absolute', right: '0%', top: '0%', width: '300px', borderRadius: '25px'}}>
        <div id={"csscontrolerBackground_" + props.id} className={'grey-back o4 w100 h100'} style={{position: 'absolute', borderRadius: '25px'}}></div>{/**translucent backdrop */}
        <div id={"csscontroler_" + props.id} style={{position: 'relative'}}>
            {sliders.map((slider, i) => {
                return <Row key={i} style={{zIndex: 2}}>
                    <Col xs={6}><label>{slider.name + ': '+styleRef.current[slider.name]+'  '}</label>
                    </Col>
                    <Col xs={6}><input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        name={slider.name}
                        defaultValue={slider.unit?styleRef.current[slider.name].split(slider.unit)[0]:styleRef.current[slider.name]}
                        onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleRef.current[slider.name] = slider.unit?(e.target.value + slider.unit):e.target.value; setState({}); }}
                    /></Col>
                </Row>
            })}
            {slidersColor.map((slider, i) => {
                return <Row key={i} style={{zIndex: 2}}>
                    <Col xs={6}><label>{slider.name + ': '+styleRef.current[slider.name]+'  '}</label>
                    </Col>
                    <Col xs={6}><input
                        type="color"
                        name={slider.name}
                        defaultValue={styleRef.current[slider.name]}
                        onChange={(e) => { console.log(slider.name + "=" + e.target.value); styleRef.current[slider.name] = e.target.value; setState({}); }}
                    /></Col>
                </Row>
            })}
        </div>
    </div>
}