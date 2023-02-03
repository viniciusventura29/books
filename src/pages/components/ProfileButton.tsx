import { api } from "../../utils/api"

export function ProfileButton(){
    const user = api.user.getUserInfo.useQuery()
    
    return(
        <div className="bg-gray-200 rounded-full w-10 h-10 absolute right-20 p-2">
            {user.data?.image}
        </div>
    )
}