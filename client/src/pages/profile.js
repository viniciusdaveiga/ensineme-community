import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import VideoScreen from './videos'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Profile = () => {
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
      const { data } = await fetchProtectedInfo();
  
      setProtectedData({
        name: data.name,
        age: data.age,
        phone: data.phone,
        course: data.course,
        semester: data.semester,
        university: data.university,
      });
  
      setLoading(false);
    } catch (error) {
      logout();
    }
  };  

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
        <form className='container container_inputs mt-3'>
          <h1>Atualizar cadastro</h1>

          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Nome
            </label>
            <input
              // // onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={protectedData.name}
              // value={values.name}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='university' className='form-label'>
              Nome da Universidade
            </label>
            <input
              // onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='university'
              name='university'
              value={protectedData.university}
              // value={values.university}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
              Telefone
            </label>
            <input
              // onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='phone'
              name='phone'
              value={protectedData.phone}
              // value={values.phone}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='age' className='form-label'>
              Idade
            </label>
            <input
              // onChange={(e) => onChange(e)}
              type='number'
              className='form-control'
              id='age'
              name='age'
              value={protectedData.age}
              // value={values.age}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='course' className='form-label'>
              Curso
            </label>
            <input
              // onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='course'
              name='course'
              value={protectedData.course}
              // value={values.course}
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='semester' className='form-label'>
              Semestre
            </label>
            <input
              // onChange={(e) => onChange(e)}
              type='number'
              className='form-control'
              id='semester'
              name='semester'
              value={protectedData.semester}
              // value={values.semester}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Atualizar
          </button>
        </form>
        <button onClick={() => logout()} className='btn btn-primary'>
          Sair
        </button>
      </Layout>
    </div>
  )
}

export default Profile