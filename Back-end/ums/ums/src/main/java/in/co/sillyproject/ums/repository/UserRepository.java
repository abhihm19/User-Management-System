package in.co.sillyproject.ums.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.co.sillyproject.ums.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(long id);
	User findByUserName(String username);
}
