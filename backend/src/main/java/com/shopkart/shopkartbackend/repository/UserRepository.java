package com.nike.nikebackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nike.nikebackend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ Preferred naming
    Optional<User> findByEmail(String email);
    

    Optional<User> findByMobile(String mobile);

 
}
