import React, { useContext, useState } from "react"
import { Toast } from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from '../api-client'
type ToastMessage = {
    message:string,
    type:'SUCCESS'|'ERROR'
}
type AppContext = {
    showToast : (ToastMessage : ToastMessage) =>void,
    isLoggedIn:boolean
}

const AppContext = React.createContext<AppContext | null>(null)

export const AppContextProvider = ({children}:{children:React.ReactNode}) =>{
    const {isSuccess} = useQuery('validateToken',apiClient.validateToken,{
        retry:false
    })
    const [toast , setToast] = useState<ToastMessage|null>()
  return (
    <AppContext.Provider value={{
        showToast:(ToastMessage)=>{
            setToast(ToastMessage)
        },
        isLoggedIn:isSuccess
    }}>
        {
            toast && <Toast {...{...toast,onClose:()=>setToast(null)}}></Toast>
        }
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
    return useContext(AppContext) as AppContext;
}