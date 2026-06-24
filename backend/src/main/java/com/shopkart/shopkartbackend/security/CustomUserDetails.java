package com.shopkart.shopkartbackend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.shopkart.shopkartbackend.model.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // No roles → return empty list
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // mapped from your entity
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // or username if available
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // always active
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // credentials valid
    }

    @Override
    public boolean isEnabled() {
        return true; // account enabled
    }

    public User getUser() {
        return user;
    }
}
