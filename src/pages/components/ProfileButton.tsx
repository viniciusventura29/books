import { useState } from "react"
import { api } from "../../utils/api"
import { signOut } from "next-auth/react"
import { IconLogout } from "@tabler/icons-react"
import { RouterOutputs } from "../api/trpc/[trpc]"

interface IOptionsUser{
    optionsUserOpen: boolean
    user: RouterOutputs['user']['getUserInfo']
}

function OptionsUser({optionsUserOpen, user}:IOptionsUser){
    const signOutConst = ()=>{
        void signOut({callbackUrl:'/'})
    }
    return(
        <div className={`${optionsUserOpen? 'visible' : 'invisible'} shadow-lg bg-white rounded-tl rounded-b absolute w-52 divide-y divide-slate-300 gap-2 right-0 mt-1`}>
            <div className="w-full p-2 cursor-default">{user?.name}</div>
            <button onClick={()=>signOutConst()} className="w-full hover:bg-red-200 text-right p-2 rounded-b bg-red-50 flex items-center gap-2 text-red-700 "><IconLogout /> SignOut</button>
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
            <OptionsUser optionsUserOpen={optionsUserOpen} user={user.data!} />
        </div>
    )
}