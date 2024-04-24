import {Link}from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import { SignoutButton } from './SignoutButton'

export default function Header() {
  const {isLoggedIn} = useAppContext()
  return (
    <header className='bg-blue-800 py-6'>
        <div className='container mx-auto flex justify-between'>
            <span className='text-3xl text-white font-bold tracking-tight'>
                <Link to='/'>Booking.com</Link>
            </span>
            <span className='flex space-x-2'>
              {
                isLoggedIn ?
                <>
                  <Link 
                    className='flex items-center text-white px-3 font-bold hover:bg-blue-400' 
                    to='/my-bookings'
                  >
                    My Booking
                  </Link>
                  <Link 
                    className='flex items-center text-white px-3 font-bold hover:bg-blue-400'  
                    to='/my-hotels'
                  >
                    My Hotels
                  </Link>
                  <SignoutButton/>
                </>
                :
                <Link to='/sign-in' className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100'>Sign In</Link>
              }
            </span>
        </div>
    </header>
  )
}
