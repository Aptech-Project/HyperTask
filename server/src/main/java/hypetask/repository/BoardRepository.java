package hypetask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hypetask.model.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
