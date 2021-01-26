package com.noplay.gestionale.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Utente, Long> {

    Utente findByUsername(String username);
    
}
