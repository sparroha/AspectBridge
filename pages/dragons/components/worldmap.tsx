import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { regionLibrary } from "../../../public/dragons/tiles";
import { GameData } from "../../../public/dragons/tileTypes";
import { enterEvent, exitEvent, fallEvent } from "./event";
import Region, { RegionData } from "./region";


export type MapData = {
    name?: string,
    description?: string,
    background?: string,
    viewDistance: number,
    setViewDistance: Function,
    regions: RegionData[][][]
}
export default function MapFollow({game}: {game: GameData}){
    if(!game) return <>Map Loading...</>
    useEffect(()=>{
        game.setEventIndex(Math.floor(Math.random()*game.events.length))
        return game.activeMap.regions[game.position.z][game.position.x][game.position.y].events?.forEach((event)=>{
            switch(event.init){
                case 'fall':
                    fallEvent(game)
                    break;
                case 'enter':
                    enterEvent(game)
                    break;
                case 'exit':
                    exitEvent(game)
                    break;
                case 'fight':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'item':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'trap':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'treasure':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                case 'event':
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
                default:
                    game.setEventIndex(Math.floor(Math.random()*game.events.length))
                    break;
            }
        })
    },[game.position])
    return <div className={'net-dragons-map'}>Event:{'\['}{game.events[game.eventIndex].name}{': '}{game.events[game.eventIndex].description}{'\]'}
        {game.activeMap.regions?.map((row, i) => (game.position.z==i)?<Row key={i}>Floor {i+1}<Col xs={12}>
            {row.map((col, j) => (j>=(game.position.x-game.viewDistance))&&(j<=(game.position.x+game.viewDistance))?<Row key={j}><Col xs={12} style={{padding: 0}}>
                {col.map((cell, k) => ((k>=game.position.y-game.viewDistance)&&(k<=game.position.y+game.viewDistance))?
                <Region indexkey={k} region={cell} disabled={(game.position.x==j&&game.position.y==k&&game.position.z==i?false:true)} />
                :null)}
            </Col></Row>:null)}
        </Col></Row>:null)}
    </div>
}

const rl = regionLibrary;
type Floor = RegionData[][];
const treeTrunk: Floor = [
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    [rl.air, rl.air, rl.air, rl.air, {paths: [0,0,1,0,1,1], events: []}, rl.air, rl.air, rl.air],
    [rl.air, rl.air, {paths: [0,1,0,0,1,1], events: []}, {paths: [1,0,0,1,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,1,0,0,1,1]}, {paths: [0,0,0,1,1,1], events: []}, rl.air],
    [rl.air, rl.air, rl.air, {paths: [0,1,0,1,1,1]}, rl.vineUpDown, {paths: [0,1,0,1,1,1]}, rl.air, rl.air],
    [rl.air, rl.air, {paths: [0,1,0,0,1,1], events: []}, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,1,0,1,1]}, {paths: [0,0,0,1,1,1], events: [rl.events.fall]}, rl.air],
    [rl.air, rl.air, rl.air, {paths: [1,0,0,0,1,1], events: []}, rl.air, {paths: [1,0,0,0,1,1], events: []}, {paths: [0,0,0,0,1,1], events: []}, rl.air],
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
]
export const treeOfLifeRegionMap: RegionData[][][] = [
    [
        [rl.exitWorldTree, {paths: [1,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchS, {paths: [0,1,1,1,1,1]}, rl.branchS, {paths: [0,0,1,1,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchNE, {paths: [1,0,0,0,1,1]}, {paths: [0,0,1,0,1,1]}, {paths: [1,0,0,0,1,1]}, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [1,0,1,0,1,1]}, {paths: [0,1,0,0,1,1]}, rl.treeOfLifeEntrance, {paths: [0,0,0,1,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,1,0,0,1,1]}, rl.branchE, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, {paths: [0,0,1,1,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [1,1,0,0,1,1]}, rl.branchN, {paths: [0,1,0,1,1,1]}, rl.branchNE, rl.branchW, {paths: [0,1,0,1,1,1]}],
        [rl.exitWorldTree, {paths: [0,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}],
        [rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree, rl.exitWorldTree],
    ],
    treeTrunk,
    treeTrunk,
    treeTrunk,
    treeTrunk,
    treeTrunk,
    [
        [rl.air, rl.branchE, rl.branchWS, rl.air, rl.branchSE, rl.branchW, rl.air, rl.branchS],
        [rl.air, rl.air, rl.branchNS, rl.air, rl.branchNS, rl.air, rl.air, rl.branchNS],
        [rl.air, rl.air, rl.branchNE, {paths: [1,0,0,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [1,0,0,0,1,1]}, rl.branchWE, rl.branchNW],
        [rl.air, rl.air, rl.air, {paths: [0,0,0,0,1,1]}, rl.vineDown, {paths: [0,0,0,0,1,1]}, rl.air, rl.air],
        [rl.air, rl.branchSE, rl.branchWE, {paths: [0,0,1,0,1,1]}, {paths: [0,0,0,0,1,1]}, {paths: [0,1,0,0,1,1]}, rl.air, rl.branchS],
        [rl.air, rl.branchNS, rl.air, rl.air, rl.air, rl.branchNSE, rl.branchWE, rl.branchNSW],
        [rl.air, rl.branchNE, rl.branchW, rl.air, rl.branchE, rl.branchNW, rl.air, rl.branchN],
        [rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air, rl.air],
    ],
]
export const treeOfLife: MapData = {
    name: 'tree',
    description: 'Tree of Life',
    background: 'tree.png',
    viewDistance: 2,
    setViewDistance: null,
    regions: treeOfLifeRegionMap,
}
export function getMap(mapName: string): MapData {
    switch (mapName) {
        case 'treeOfLife':
            return treeOfLife
        default:
            return treeOfLife
    }
}