package hypetask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hypetask.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE (u.username = :username or u.email=:username)")
    User getLogin(@Param("username") String username);
    @Query("SELECT new User (u.username,u.email) FROM User u")
    List<User> getUserNameEmail();
    @Query("SELECT u from User u WHERE (u.username like %:username% or u.email like %:username%)")
    List<User> searchNewFriend(@Param(("username")) String username);
}
