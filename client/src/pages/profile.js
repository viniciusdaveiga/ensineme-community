import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onUpdateProfile, onLogout } from '../api/auth';
import Layout from '../components/layout';
import VideoScreen from './videos';
import { unauthenticateUser } from '../redux/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [updating, setUpdating] = useState(false);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.log(error.response);
    }
  };

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!updating) {
      try {
        setUpdating(true);
        const { data } = await onUpdateProfile(updatedData);
        setProtectedData(data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setUpdating(false);
      }
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return (
    <div>
      <Layout>
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <form className='container container_inputs mt-3' onSubmit={handleUpdateProfile}>
            <h1>Atualizar cadastro</h1>

            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Nome
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={updatedData ? updatedData.name : protectedData.name}
                required
                disabled={updating}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='university' className='form-label'>
                Nome da Universidade
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, university: e.target.value })}
                type='text'
                className='form-control'
                id='university'
                name='university'
                value={updatedData ? updatedData.university : protectedData.university}
                required
                disabled={updating}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Telefone
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                type='text'
                className='form-control'
                id='phone'
                name='phone'
                value={updatedData ? updatedData.phone : protectedData.phone}
                required
                disabled={updating}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='age' className='form-label'>
                Idade
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
                type='number'
                className='form-control'
                id='age'
                name='age'
                value={updatedData ? updatedData.age : protectedData.age}
                required
                disabled={updating}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='course' className='form-label'>
                Curso
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, course: e.target.value })}
                type='text'
                className='form-control'
                id='course'
                name='course'
                value={updatedData ? updatedData.course : protectedData.course}
                required
                disabled={updating}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='semester' className='form-label'>
                Semestre
              </label>
              <input
                onChange={(e) => setUpdatedData({ ...updatedData, semester: e.target.value })}
                type='number'
                className='form-control'
                id='semester'
                name='semester'
                value={updatedData ? updatedData.semester : protectedData.semester}
                required
                disabled={updating}
              />
            </div>

            <button type='submit' className='btn btn-primary' disabled={updating}>
              {updating ? 'Atualizando...' : 'Atualizar'}
            </button>
          </form>
        )}

        <button onClick={() => logout()} className='btn btn-primary'>
          Sair
        </button>
      </Layout>
    </div>
  );
};

export default Profile;
