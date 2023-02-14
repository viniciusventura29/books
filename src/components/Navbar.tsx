import { useSession } from "next-auth/react"
import Link from "next/link"

export const Navbar = () =>{
    const { data: session } = useSession()

    return(
        <nav className="flex items-center bg-blue-00 fixed w-full py-8 px-64 justify-between">
            <Link href='/' className="text-2xl font-semibold cursor-pointer">
                Books
            </Link>
            <div className="flex gap-16 items-center">
                <Link href="/" className="tracking-wide hover:text-purple-700">Home</Link>
                <Link href="/books" className="tracking-wide hover:text-purple-700">Books</Link>
                <Link href="#" className="tracking-wide hover:text-purple-700">About</Link>
                <div className={`${session? 'hidden' : 'flex'} ml-12`}>
                    <Link href="/login" className="tracking-wide hover:bg-purple-800 text-white bg-purple-700 px-6 py-2 rounded">Get started</Link>
                </div>
            </div>
        </nav>
    )
}