import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import loadingGif from '../images/loading.gif'

export default function LoadingToRedirect(){
  const [count, setCound] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(()=> {
      setCound((currentCount) => --currentCount)      
    }, "1000")

    count === 0 && navigate('/login')
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={loadingGif} alt="loading" style={{height: "50px", marginTop: "-100px"}}/>
    </div>
  )

}