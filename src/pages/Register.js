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
  const [name, setName] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      setLoading(true)

      if(password !== confirm){
        toast.error("Passwords do not match")
        setLoading(false)
        return
      }

      const { data } = await axios.post(`/signup`, {name, email, password})

      if(data.error){
        toast.error(data.error)
        return
      } else {
        setAuth(data)

        //local storage
        setToLocalStorage("auth", data)
        toast.success("Successfully registered")
        navigate('/')     
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
            <h1 className="fw-bold mb-3">Register</h1>
            <form>
            <Input value={name} setValue={setName} label="Name" type="text"/>
              <Input value={email} setValue={setEmail} label="Email" type="email"/>
              <Input value={password} setValue={setPassword} label="Password" type="password"/>
              <Input value={confirm} setValue={setConfirm} label="Confirm" type="password"/>
              <Button handleSubmit={handleSubmit} loading={loading}/>
            </form>
            <p className="mt-3">
              Already registered? <Link to="/login">Login</Link> </p>
          </div>
        </div>
      </div>
    </div>
  )
}