package hypetask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hypetask.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
