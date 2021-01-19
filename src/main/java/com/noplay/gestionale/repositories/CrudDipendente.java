package com.noplay.gestionale.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.noplay.gestionale.entities.Dipendente;

@Repository
public interface CrudDipendente extends CrudRepository<Dipendente, Long>{

}
