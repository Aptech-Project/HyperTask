package hypetask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hypetask.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, String> {

}
