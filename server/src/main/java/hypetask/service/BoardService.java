package hypetask.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hypetask.model.Board;
import hypetask.repository.BoardRepository;

@Service
public class BoardService {
	
	Gson json = new Gson();

	@Autowired
	private BoardRepository boardRepository;

	public List<Board> getAllBoard() {
		return boardRepository.findAll();
	}

	public void createBoard(Board board) {
		boardRepository.save(board);
	}

	public Board getBoardById(int id) {
		return boardRepository.findById(id).get();
	}

	public List<Board> getUserBoards(int userId) {
		List<Board> allBoards = this.getAllBoard();
		ArrayList<Board> usersBoard = new ArrayList<Board>();
		allBoards.forEach((board) -> {
			List<Map<String,String>> members = json.fromJson(board.getMembers(), List.class);
			members.forEach((user)-> {
				if (Integer.parseInt((String)user.get("userId")) == userId) {
					usersBoard.add(board);
				}
			});
		});
		return usersBoard;
	}
}
