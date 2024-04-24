import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'
import { Link, useNavigate } from 'react-router-dom'
export type SignInFormType = {
    email:string,
    password:string
}

const SignIn = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const navigate = useNavigate()
    const mutation = useMutation(apiClient.signIn,{
        onSuccess:async()=>{
            await queryClient.invalidateQueries('validateToken')
            showToast({message:'Login Successfull!',type:'SUCCESS'})
            navigate('/')
        },
        onError:(err:Error)=>{
            showToast({message:err.message,type:'ERROR'})
        }
    })

    const {register ,handleSubmit, formState:{errors}} = useForm<SignInFormType>()
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })
  return (
    <form className='flex flex-col gap-5' autoComplete='true' onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input className='border rounded w-full py-1 px-2 font-normal' type="email" {...register("email",{required:'This field is required'})}/>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input className='border rounded w-full py-1 px-2 font-normal' type="password" {...register("password",{required:'This field is required',minLength:{
                value:6,
                message:'Password must be at least 6 characters'
            }})}/>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <span className='flex justify-between items-center'>
            <span>
                Not Registered?{' '}
                <Link className='underline hover:text-blue-600' to='/register'>Register Here</Link>
            </span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold rounded text-2xl hover:bg-blue-500">Login</button>
        </span>
    </form>
  )
}

export default SignIn