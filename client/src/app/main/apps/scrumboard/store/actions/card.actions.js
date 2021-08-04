import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import { convertBoardProperty } from "../allBoardFunction";
import { endPointApi } from "app/services/endPointAPI";

export const OPEN_CARD_DIALOG = "[SCRUMBOARD APP] OPEN CARD DIALOG";
export const CLOSE_CARD_DIALOG = "[SCRUMBOARD APP] CLOSE CARD DIALOG";
export const UPDATE_CARD = "[SCRUMBOARD APP] UPDATE CARD";
export const REMOVE_CARD = "[SCRUMBOARD APP] REMOVE CARD";

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
      dispatch(
        showMessage({
          message: "Card Saved",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return dispatch({
        type: UPDATE_CARD,
        payload: allListUpdated,
      });
    });
  };
}

export function removeCard(boardId, cardId) {
  return (dispatch) => {
    const request = axios.post("/api/scrumboard-app/card/remove", {
      boardId,
      cardId,
    });

    return request.then((response) =>
      dispatch({
        type: REMOVE_CARD,
        boardId,
        cardId,
      })
    );
  };
}
