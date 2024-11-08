package com.finance.user_service.domain.Profile.repository;

import com.finance.user_service.domain.Profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByEmail(String email);
    boolean existsByEmail(String email);
}
