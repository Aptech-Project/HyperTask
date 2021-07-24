package hypetask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hypetask.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE (u.username = :username or u.email=:username)  AND u.password = :password")
    User getLogin(@Param("username") String username, @Param("password") String password);
}
