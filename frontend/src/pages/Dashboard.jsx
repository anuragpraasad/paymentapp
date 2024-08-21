import { useSearchParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect, useState } from "react"

export const Dashboard = () =>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
            .then(response => {
                // setBalance(response.data.balance)
                console.log(response.data.balance)
                setBalance(response.data.balance)
            })
    }, [])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}