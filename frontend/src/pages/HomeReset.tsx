import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function HomeReset() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("hasVisited")
    navigate("/", { replace: true })
  }, [])

  return null
}