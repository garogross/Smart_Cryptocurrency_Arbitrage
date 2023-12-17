export const baseUrl = '/api/v1';

export const authConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
            'mode': 'no-cors'
        }
    }
}

// auth
export const loginUrl = '/users/login'

// tasks
export const createTaskUrl = '/tasks/create'
export const getTasksUrl = '/tasks/'

// subtask
export const createSubtaskUrl = '/subtasks/create'
export const getSubtaskUrl = '/subtasks/'
export const getNotificationsUrl = '/subtasks/notifications'


// employees
export const getEmployeesUrl = '/users/'

export const addEmployeesUrl = '/users/signup'
// report

export const getReportsUrl = '/reports/'


export const fetchRequest = async (fetchUrl, method = 'GET', body = null, config = authConfig()) => {
    const response = await fetch(`${baseUrl}${fetchUrl}`, {
        method: method,
        body: body,
        ...config
    });
    const resData = await response.json();
    if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {message: resData, status: response.status};
    }
    return resData
}


export const setError = (err, type) => dispatch => {
    dispatch({type: type, payload: err.message?.error?.errors})

}