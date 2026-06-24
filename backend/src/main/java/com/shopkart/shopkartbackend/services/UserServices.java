package com.nike.nikebackend.services;

import com.nike.nikebackend.model.User;
import com.nike.nikebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServices(UserRepository userRepo,@Lazy  PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) return null;
        System.out.println("DEBUG Email: " + user.getEmail());
        System.out.println("DEBUG Password: " + user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public void deleteUserById(Long id) {
        userRepo.deleteById(id);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
    
    public boolean checkPassword(String rawPassword, String encodedPasswordFromDB) {
        return passwordEncoder.matches(rawPassword, encodedPasswordFromDB);
    }
}
