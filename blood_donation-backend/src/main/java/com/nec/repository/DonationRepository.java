package com.nec.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nec.entity.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByUserEmail(String email);
}
