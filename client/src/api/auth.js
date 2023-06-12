import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/api/register',
    registrationData
  )
}

export const onUpdateProfile = async (updatedData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/update', updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function onLogin(loginData) {
  return await axios.post('http://localhost:8000/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}
