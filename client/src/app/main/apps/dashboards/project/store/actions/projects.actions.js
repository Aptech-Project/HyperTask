import { deserializeObject } from 'app/main/common/CommonFunctions';
import { endPointApi } from 'app/services/endPointAPI';
import { showMessage } from 'app/store/actions';
import axios from 'axios';

export const GET_ALL_BOARDS = '[PROJECT DASHBOARD APP] GET_ALL_BOARDS';
export const GET_DASHBOARD_DATA = '[PROJECT DASHBOARD APP] GET_DASHBOARD_DATA';

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

export const getDashBoardData = (userId) => async (dispatch, getState) => {
    const allBoard = await getUserBoards(userId);
    console.log(allBoard);















    
    if (!allBoard) {
        dispatch(showMessage({message: "Get dashboard data failed", variant: "error"}))
    } else {
        dispatch(showMessage({message: "Get dashboard data success", variant: "success"}))
    }
}
