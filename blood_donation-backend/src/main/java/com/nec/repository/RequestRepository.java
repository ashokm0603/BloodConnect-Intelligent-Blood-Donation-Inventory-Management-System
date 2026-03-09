package com.nec.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nec.entity.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserEmail(String email);
}
