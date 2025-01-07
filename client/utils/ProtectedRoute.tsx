//@ts-nocheck
import { useAuth } from '../context/AuthContext'
import { useNavigate} from 'react-router-dom'

const ProtectedRoute = ({children,role}) => {
    const auth=useAuth()
    const navigate=useNavigate()
      if (!auth) {
        navigate('/')
      }
      if (role && auth?.role !== 'admin') {
        navigate('/')
      }    
      return children;
}

export default ProtectedRoute