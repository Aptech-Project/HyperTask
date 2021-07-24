import axios from "axios";
import id from "date-fns/locale/id";

const baseApi = 'http://localhost:4000/api/user';
export const endPointApi = {
    users: {
        getAll: baseApi + '/get-all-users'
    },
    user(url = baseApi) {
        return {
            loginWUP: (username, password) => axios.post(url + '/login/' + username + '&' + password),
            fetchAll: () => axios.get(url + '/get-all-users/'),
            create: newRecord => axios.post(url + '/create-user', newRecord),
            fetchById: id => axios.get(url + '/get-user/' + id),
        }
    },
}