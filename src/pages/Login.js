import { useState, useContext } from "react"

import Input from "../components/forms/Input"

import Button from "../components/forms/Button"

import toast from "react-hot-toast";

import axios from "axios"
import { AuthContext } from "../context/auth"

import { setToLocalStorage } from "../helpers/auth"

import { useNavigate } from "react-router-dom"

import { Link } from "react-router-dom"

export default function Register() {
  //context
  const [auth, setAuth] = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      setLoading(true)
      const { data } = await axios.post(`/signin`, {email, password})

      if(data.error){
        toast.error(data.error)
      } else {
        setAuth(data)

        //local storage
        setToLocalStorage("auth", data)
        navigate('/dashboard')     
      }
      setLoading(false)

    }catch(err){
      console.log(err)
      setLoading(false)
    }
    
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 authbox">
            <h1 className="fw-bold mb-3">Login</h1>
            <form>
              <Input value={email} setValue={setEmail} label="Email" type="email"/>
              <Input value={password} setValue={setPassword} label="Password" type="password"/>
              <Button handleSubmit={handleSubmit} loading={loading}/>
            </form>
            <p className="mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}