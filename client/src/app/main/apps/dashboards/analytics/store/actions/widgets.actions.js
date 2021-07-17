import { endPointApi } from 'app/services/endPointAPI';
import axios from 'axios';

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export function getWidgets()
{
    const request = axios.get('/api/analytics-dashboard-app/widgets');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WIDGETS,
                payload: response.data
            })
        );
}

export function getAllUsers() {
    const request = axios.get(endPointApi.users.getAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            })
        ).catch((error) => console.log(error));
}
