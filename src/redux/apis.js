const API_END_POINT = 'http://localhost:8006/api';
const VERSION = 'v1'

const routes = {
    AdminLogin: 'admin-login'
}

const API = {};
Object.keys(routes).forEach((key) => {
  API[key] = `${API_END_POINT}/${VERSION}/${routes[key]}`;
});


export default API;
