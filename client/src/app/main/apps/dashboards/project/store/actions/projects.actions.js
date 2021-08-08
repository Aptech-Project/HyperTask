import { deserializeObject } from 'app/main/common/CommonFunctions';
import { endPointApi } from 'app/services/endPointAPI';
import { showMessage } from 'app/store/actions';
import axios from 'axios';
import { getBoardsStatistic } from '../../functions/DashboardFunctions';

export const GET_ALL_BOARDS = '[PROJECT DASHBOARD APP] GET_ALL_BOARDS';
export const GET_DASHBOARD_DATA = '[PROJECT DASHBOARD APP] GET_DASHBOARD_DATA';
export const CLEAR_DASHBOARD_DATA = '[PROJECT DASHBOARD APP] CLEAR_DASHBOARD_DATA';

export const getUserBoards = async (userId) => {
    let allBoards = null;
    await axios
        .get(`${endPointApi.boards.getUserBoards}${userId}`)
        .then((res) => {
            if (res.status === 200) {
                allBoards = deserializeObject(res.data);
            }
        })
        .catch((err) => console.log(err));
    return allBoards;
};

export const getDashBoardData = (userId) => async (dispatch) => {
    const allBoards = await getUserBoards(userId);
    console.log(allBoards);
    const boardsStatistic = getBoardsStatistic(allBoards);
    dispatch({
        type: GET_DASHBOARD_DATA,
        boardsStatistic,
        allBoards
    })
}

export const clearDashBoardState = () => async (dispatch) => {
    dispatch({
        type: CLEAR_DASHBOARD_DATA,
    })
}
