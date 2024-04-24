import { useEffect } from "react"


type ToastProps = {
    message : string,
    type:'SUCCESS'|'ERROR',
    onClose:()=>void
}
export const Toast = ({message,type,onClose}:ToastProps) => {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose()
        },5000)

        return ()=>clearTimeout(timer)
    },[onClose])

    const styles = type === 'SUCCESS'?'bg-green-600':'bg-red-600'
  return (
    <div className={`fixed top-5 right-5 py-2 px-5 rounded-md max-w-md text-white ${styles}`}>
        <p className="font-semibold text-lg">{message}</p>
    </div>
  )
}
