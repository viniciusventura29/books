import Link from "next/link"

export const Footer = () =>{
    return(
        <footer className="flex gap-2 w-full mx-auto pb-10 pt-28 justify-center ">Developed by <Link href='https://github.com/viniciusventura29' className="hover:text-purple-900 font-semibold">Vinicius Ventura</Link></footer>
    )
}