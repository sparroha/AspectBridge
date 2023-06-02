import { useRef } from "react"

export default function Sliders(props){
    const styleRef = useRef({
        width: '100%',
        height: '100%',
        opacity: '100%',
        borderRadius: '0%',
        borderWidth: '0%',
        fontSize: '100%',
        margin: '0%',
        padding: '0%',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        borderColor: 'black',
    })

    return <>
        <label>width</label>{styleRef.current.width}
        <input type="range" name={'width'} defaultValue={styleRef.current.width.split('%')[0]} 
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.width = e.target.value+'%'}}/>

        <label>height</label>{styleRef.current.height}
        <input type="range" name={'height'} defaultValue={styleRef.current.height.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.height = e.target.value+'%'}}/>

        <label>opacity</label>{styleRef.current.opacity}
        <input type="range" name={'opacity'} defaultValue={styleRef.current.opacity.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.opacity = e.target.value+'%'}}/>

        <label>borderRadius</label>{styleRef.current.borderRadius}
        <input type="range" name={'borderRadius'} defaultValue={styleRef.current.borderRadius.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.borderRadius = e.target.value+'%'}}/>

        <label>borderWidth</label>{styleRef.current.borderWidth}
        <input type="range" name={'borderWidth'} defaultValue={styleRef.current.borderWidth.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.borderWidth = e.target.value+'%'}}/>

        <label>fontSize</label>{styleRef.current.fontSize}
        <input type="range" name={'fontSize'} defaultValue={styleRef.current.fontSize.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.fontSize = e.target.value+'%'}}/>

        <label>margin</label>{styleRef.current.margin}
        <input type="range" name={'margin'} defaultValue={styleRef.current.margin.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.margin = e.target.value+'%'}}/>

        <label>padding</label>{styleRef.current.padding}
        <input type="range" name={'padding'} defaultValue={styleRef.current.padding.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.padding = e.target.value+'%'}}/>

        <label>color</label>{styleRef.current.color}
        <input type="range" name={'color'} defaultValue={styleRef.current.color.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.color = e.target.value}}/>

        <label>backgroundColor</label>{styleRef.current.backgroundColor}
        <input type="range" name={'backgroundColor'} defaultValue={styleRef.current.backgroundColor.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.backgroundColor = e.target.value}}/>

        <label>borderColor</label>{styleRef.current.borderColor}
        <input type="range" name={'borderColor'} defaultValue={styleRef.current.borderColor.split('%')[0]}
        onChange={e => {console.log('slider='+e.target.value); styleRef.current.borderColor = e.target.value}}/>

    </>
}