import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client'

export const SignoutButton = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const mutation = useMutation(apiClient.logout,{
        onSuccess:async()=>{
            await queryClient.invalidateQueries('validateToken')
            showToast({message:'Logged out successfully!',type:'SUCCESS'})
        },
        onError:(err:Error)=>{
            showToast({message:err.message,type:'ERROR'})
        }
    })
    const handleLogout = ()=>{
        mutation.mutate()
    }
  return (
    <button className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100' onClick={handleLogout}>
        Sign Out
    </button>
  )
}
