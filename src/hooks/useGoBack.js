import { useLocation, useNavigate } from 'react-router-dom'

// Go back in history when there is somewhere to go back to; otherwise open `fallback`.
export default function useGoBack(fallback) {
  const navigate = useNavigate()
  const location = useLocation()
  return () => (location.key !== 'default' ? navigate(-1) : navigate(fallback))
}
