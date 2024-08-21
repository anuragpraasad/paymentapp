import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const navigate = useNavigate();
    const [userName , setUserName] = useState("")
    const [password, setPassword] = useState("")

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      {/* userName is ${userName} */}
      {/* Pass is ${password} */}
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />

        <InputBox onChange={(e) => {
          setUserName(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />

        <InputBox onChange={(e) =>  {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />

        <div className="pt-4">
        <Button onClick={async () => {
                try{

                  const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/v1/user/signin',
                    data: {
                      userName: userName,
                      password: password
                    },
                  });
                  localStorage.setItem("token", response.data.token1)
                  navigate("/dashboard")
                  console.log(response);
                }
                catch(e){
                  console.log(e.message);
                }
            }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}