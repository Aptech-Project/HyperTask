package hypetask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hypetask.model.Board;
import hypetask.repository.BoardRepository;

@Service
public class BoardService {
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
}
