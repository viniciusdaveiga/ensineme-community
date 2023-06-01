import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import VideoScreen from './videos'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.name)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <Layout>
      <h1>Carregando...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard de vídeos</h1>
        <h2>Olá, {protectedData}</h2>
        <div className='container-videos'>
          <VideoScreen />
        </div>
        <button onClick={() => logout()} className='btn btn-primary'>
          Sair
        </button>
      </Layout>
    </div>
  )
}

export default Dashboard
