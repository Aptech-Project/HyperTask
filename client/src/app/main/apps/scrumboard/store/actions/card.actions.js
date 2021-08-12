import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import { convertBoardProperty, userIsAdmin } from "../allBoardFunction";
import { endPointApi } from "app/services/endPointAPI";

export const OPEN_CARD_DIALOG = "[SCRUMBOARD APP] OPEN CARD DIALOG";
export const CLOSE_CARD_DIALOG = "[SCRUMBOARD APP] CLOSE CARD DIALOG";
export const UPDATE_CARD = "[SCRUMBOARD APP] UPDATE CARD";
export const REMOVE_CARD = "[SCRUMBOARD APP] REMOVE CARD";
export const UPDATE_FILE_CARD = "[SCRUMBOARD APP] UPDATE FILE CARD";

export function openCardDialog(data) {
  return {
    type: OPEN_CARD_DIALOG,
    payload: data,
  };
}

export function closeCardDialog() {
  return {
    type: CLOSE_CARD_DIALOG,
  };
}

export function updateCard(board, newCard) {
  return (dispatch) => {
    const userisAdmin = userIsAdmin(board);
    const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
    if (userisAdmin == false && allowMemberEdit === "false") {
      alert("Member cannot Edit");
      //window.location.reload();
    } else {
      console.log("newCard: ", newCard);
      const allList = JSON.parse(board.lists);
      const allListUpdated = allList.map((list) => {
        let listToUpdate;
        const allListCardUpdate = list.cards.map((card) => {
          if (card.id === newCard.id) {
            card = newCard;
            listToUpdate = list;
          }
          return card;
        });
        listToUpdate = { ...listToUpdate, cards: allListCardUpdate };
        if (listToUpdate) {
          if (list.id === listToUpdate.id) {
            list = listToUpdate;
          }
        }
        return list;
      });
      const boardUpdate = { ...board, lists: allListUpdated };
      const boardConverted = convertBoardProperty(boardUpdate);
      const request = axios.put(
        `${endPointApi.boards.updateBoard}`,
        boardConverted
      );
      return request.then((response) => {
        // dispatch(
        //   showMessage({
        //     message: "Card Saved",
        //     autoHideDuration: 2000,
        //     anchorOrigin: {
        //       vertical: "top",
        //       horizontal: "right",
        //     },
        //   })
        // );
        return dispatch({
          type: UPDATE_CARD,
          payload: allListUpdated,
        });
      });
    }
  };
}

export function removeCard(board, cardId) {
  return (dispatch) => {
    const userisAdmin = userIsAdmin(board);
    const allowMemberEdit = JSON.parse(board.info).allowMemberEdit;
    if (userisAdmin == false && allowMemberEdit === "false") {
      alert("Member cannot Edit");
      //window.location.reload();
    } else {
      const allList = JSON.parse(board.lists);
      const allListUpdated = allList.map((list) => {
        let listToUpdate;
        let allListCardUpdate;
        list.cards.map((card) => {
          if (card.id === cardId) {
            listToUpdate = list;
            allListCardUpdate = list.cards.filter((card) => card.id !== cardId);
          }
        });
        listToUpdate = { ...listToUpdate, cards: allListCardUpdate };
        if (listToUpdate) {
          if (list.id === listToUpdate.id) {
            list = listToUpdate;
          }
        }
        return list;
      });
      const boardUpdate = { ...board, lists: allListUpdated };
      const boardConverted = convertBoardProperty(boardUpdate);
      const request = axios.put(
        `${endPointApi.boards.updateBoard}`,
        boardConverted
      );

      return request.then((response) =>
        dispatch({
          type: REMOVE_CARD,
          payload: allListUpdated,
        })
      );
    }
  };
}

export function updateFileCard(attachment) {
  let formData = new FormData();
  formData.append("File", attachment);
  const request = axios.post(`${endPointApi.file.uploadFile}`, formData);
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: UPDATE_FILE_CARD,
        payload: response.data,
      })
    );
}
