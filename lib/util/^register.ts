'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

/**
 * Implementation
 * 
 * const defaultState = {}
 * const state = useRef(defaultState)
 * const [init, setInit] = useState(false)
 * //[data, setData, dataLoaded]
 * const [stateString, saveState, stateLoaded] = useRegister('uniqueid',defaultState)
 * 
 * //save state to database
 * function save(){saveState({...state.current})}
 * 
 * //get stateString as object: compare to state.current
 * const dbstate = useMemo(()=>
 *     JSON.parse(stateString),
 * [stateString])
 * 
 * useEffect(()=>{
 *     if(stateLoaded && !init){
 *         state.current = dbstate
 *         setInit(true)
 *     }
 * },[stateLoaded])
 * 
 * //escape clause to prevent data desync
 * if(!stateLoaded) return <>Loading...</>
 * 
 */

/**
 * 
 * @param registry 
 * @param defaultValue 
 * @returns data: string, setter: Function, loaded: boolean
 */
export default function useRegister(registry: string, defaultValue: any):[string, Function, boolean]{
    
    //useLog('@useRegister://REGISTRY_NAME: '+registry+' :: REGISTRY: '+JSON.stringify(reg))
    const [currentsave, setCurentSave] = useState(registry)//current save
    const [registryLoaded, setRegistryLoaded] = useState(false)
    const [register, setRegister] = useState(JSON.stringify(defaultValue))//register setter and render function
    const {data, error} = useSWR('../api/registry/'+registry, { refreshInterval: 500 })//get data from database
    //useLog('@useRegister://REGISTER: '+JSON.stringify(register.current)+' :: LOADED: '+registryLoaded)
    useEffect(()=>{//load data from database
        if(!data) return
        if(data == null || data == undefined) return
        setRegister(data)
    },[data])
    //INIT
    //initialize register from database
    async function loadDataOnce(registry,  signal?: AbortSignal){
        if(registryLoaded) return
        if(!registry) {console.log('@useRegister://REGISTER: '+'no registry: '+registry); return}
        if(registry ==  null) {console.log('@useRegister://REGISTER: '+'null registry: '+registry); return}
        return getDB(registry, signal).then((data: string)=>{
            if(data == null || data == undefined || !data || data == "default") {
                //init registry: only sets default if data not exist
                setDB(registry, defaultValue)
            }
            setRegistryLoaded(true)
        }).catch(err=>console.log('@useRegister.loadDataOnce://fetch error: '+err))
    }

    //load saved data once and if data name changes
    useEffect(()=>{
        //let controller = new AbortController();
        if(!registry)return
        if(registry != currentsave){
            setRegistryLoaded(false)
            setCurentSave(registry)
        }
        loadDataOnce(registry/*, controller.signal*/)
        //return () => controller?.abort();
    },[registry/*, registryLoaded.current*/])//load registry
    //END INIT

    const saveData = useCallback((data) => {//save data to database{//works and tested
        setRegister(JSON.stringify(data))
        //console.log('@useRegister.saveRegister://set register '+JSON.stringify(registry)+': '+JSON.stringify(data))
        setDB(registry, data)
    },[registry])
    return [register, saveData, registryLoaded]
}

//updates database with current register ref
export async function setDB(name: string, data: any){
    //console.log('@setDB://set '+name+' to '+JSON.stringify(data))
    await fetch(`/api/registry/${name}`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export async function getDB(name: string, signal?: AbortSignal): Promise<string>{
    return fetch(`/api/registry/${name}`,{signal: signal}).then(res=>res.json())
}


/**
Error: Ensure bailed, found path does not match ensure type (pages/app)
    at ensurePageImpl (C:\GitHub\aspectbridge\node_modules\next\dist\server\dev\on-demand-entry-handler.js:483:23)
- error Error: Ensure bailed, found path does not match ensure type (pages/app)
    at ensurePageImpl (C:\GitHub\aspectbridge\node_modules\next\dist\server\dev\on-demand-entry-handler.js:483:23) {
  digest: undefined

^register.ts:102     GET http://localhost:3000/api/registry/active_users 500 (Internal Server Error)
getDB @ ^register.ts:102
activateUser @ [userlogin].tsx:327
eval @ ^users.ts:15
Promise.then (async)
eval @ ^users.ts:15

VM17587:1 Uncaught (in promise) SyntaxError: Unexpected token '<', "

 */