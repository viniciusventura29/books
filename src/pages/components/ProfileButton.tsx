import { useState } from "react"
import { api } from "../../utils/api"
import { signOut } from "next-auth/react"

function optionsUser(optionsUserOpen:any, user:any){
    const signOutConst = ()=>{
        signOut({callbackUrl:'/'})
    }
    return(
        <div className={`${optionsUserOpen? 'visible' : 'invisible'} bg-gray-200 rounded-b rounded-tl absolute w-52 divide-y divide-slate-300 gap-2 right-0 mt-1`}>
            <div className="w-full text-right p-2 cursor-default">{user.data?.name}</div>
            <button onClick={()=>signOutConst()} className="w-full hover:bg-slate-200 text-right p-2">SignOut</button>
        </div>
    )
}

export function ProfileButton(){
    const [optionsUserOpen, setOptionsUserOpen] = useState(false)
    const user = api.user.getUserInfo.useQuery()
    let imgUser = user.data?.image
    if (imgUser === null){
        imgUser = undefined
    }
    return(
        <div onClick={()=>setOptionsUserOpen(!optionsUserOpen)} onBlur={()=>setOptionsUserOpen(false)} className="bg-gray-200 rounded-full w-10 h-10 absolute right-20 cursor-pointer">
            <img src={imgUser} alt="" />
            {optionsUser(optionsUserOpen, user)}
        </div>
    )
}