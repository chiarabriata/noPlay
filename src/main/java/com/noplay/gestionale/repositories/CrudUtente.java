package com.noplay.gestionale.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.noplay.gestionale.entities.Utente;

@Repository
public interface CrudUtente extends CrudRepository<Utente, Long>{

}