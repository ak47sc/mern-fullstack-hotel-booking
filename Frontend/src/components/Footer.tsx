import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to='/'>Booking.com</Link>
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <span>
                    <Link to='/'>Privacy Policy</Link>
                </span>
                <span>
                    <Link to='/'>Terms of Service</Link>
                </span>
            </span>
        </div>
    </footer>
  )
}
