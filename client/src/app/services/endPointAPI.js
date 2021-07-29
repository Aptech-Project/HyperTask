import axios from "axios";
import id from "date-fns/locale/id";

const baseApi = 'http://localhost:4000/api/user';
export const endPointApi = {
    users: {
        getAll: baseApi + '/get-all-users',
        loginWUP: baseApi + '/login/',
        create: baseApi + '/create-user/',
        fetchById: baseApi + '/get-user/',
    },
}