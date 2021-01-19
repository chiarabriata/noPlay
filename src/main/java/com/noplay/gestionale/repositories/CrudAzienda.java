package com.noplay.gestionale.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.noplay.gestionale.entities.Azienda;

@Repository
public interface CrudAzienda extends CrudRepository<Azienda, Long>{

}
