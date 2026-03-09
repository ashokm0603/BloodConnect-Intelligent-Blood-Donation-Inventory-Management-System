package com.nec.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nec.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
	Optional<User> findByEmail(String email);
}
