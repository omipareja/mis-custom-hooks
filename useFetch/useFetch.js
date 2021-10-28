import React from 'react'
import { useEffect, useState,useRef } from 'react/cjs/react.development'

export const useFetch = (url) => {

    const isMounted = useRef(true)

    const [state,setState] = useState({data:null,loading:true,error:null})

    useEffect(()=>{
        return () =>{ //se ejecuta cuando el componente se desmonta
            isMounted.current=false;//estoy manteniendo la referencia al mismo para que no se cargue el estado
                                    //despues de desmontado
        }
    },[])


    useEffect( () => {

        setState(
            {data:null,loading:true,error:null}
        )
        fetch(url)
            .then(resp =>resp.json())
            .then(data =>{

                if(isMounted.current){ // si el componete no se ha desmontado llame el estado
                    setState({ 
                        loading:false,
                        error:null,
                        data
                    })
                }


            })
            .catch(()=>{
                setState({
                    data:null,
                    loading:false,
                    error: 'No se pudo cargar la info'
                })
            })
    },[url])

    return state
}
