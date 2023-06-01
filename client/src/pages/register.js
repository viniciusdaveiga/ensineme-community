import { useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/layout'

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    phone: '',
    age: 0,
    name: '',
    course: '',
    semester: 0,
    university: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target;

    const characterLimits = {
      email: 150,
      password: 30,
      phone: 15,
      age: 3,
      name: 300,
      course: 150,
      semester: 2,
      university: 200,
    }

    if (value.length <= characterLimits[name]) {
      setValues({ ...values, [name]: value })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: '', phone: '', age: 0, name: '', course: '', semester: 0, university: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container container_inputs mt-3'>
        <h1>Registrar</h1>

        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Nome
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={values.name}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='university' className='form-label'>
            Nome da Universidade
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='university'
            name='university'
            value={values.university}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Endereço de email
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='teste@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Telefone
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='phone'
            name='phone'
            value={values.phone}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='age' className='form-label'>
            Idade
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='number'
            className='form-control'
            id='age'
            name='age'
            value={values.age}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='course' className='form-label'>
            Curso
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='course'
            name='course'
            value={values.course}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='semester' className='form-label'>
            Semestre
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='number'
            className='form-control'
            id='semester'
            name='semester'
            value={values.semester}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Senha
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='senha'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Registrar
        </button>
      </form>
    </Layout>
  )
}

export default Register
