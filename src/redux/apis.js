const API_END_POINT = 'http://localhost:8006/api';
const VERSION = 'v1'

const routes = {
    AdminLogin: 'admin-login',
    UserEnquire: 'add-enquire',
    EnquireList: 'enquire-list',
    DeleteEnquire: 'delete-enquire',
    WorkerList: 'get-workers',
    AddWorker: 'add-worker',
    AddBooking: 'add-booking',
    AllBooking: 'all-booking',
    AssignTask: 'assign-task',
    WorkerTaskList: 'worker-task-list'
}

const API = {};
Object.keys(routes).forEach((key) => {
  API[key] = `${API_END_POINT}/${VERSION}/${routes[key]}`;
});


export default API;
