import axios from 'axios';

const server_url = "localhost:8000";


export function login_user(user_email, user_password) {
  const requestBody = {
    email: user_email,
    password: user_password
  };
  return axios.post(`${server_url}/api/user/auth/login`, requestBody)
    .then(response => response.json())
    .catch(err => err);
}


// login_user("user1@gmail.com", "user2pwd")
//   .then(data => console.log(data))
//   .catch(err => console.log(err))