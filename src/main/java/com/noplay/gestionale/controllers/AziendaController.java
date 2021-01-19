package com.noplay.gestionale.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noplay.gestionale.entities.Azienda;
import com.noplay.gestionale.repositories.CrudAzienda;

// CAMBIAMENTO!!!!
@RestController
@RequestMapping("/aziende")
public class AziendaController {
	
	@Autowired
	private CrudAzienda daoazienda;

	
	
	@GetMapping
	public Iterable<Azienda> getListaAziende() {
		return daoazienda.findAll();
	}
	
	
	@GetMapping("/{id}")
	private Optional<Azienda> getAzienda(@PathVariable long id) {
		return daoazienda.findById(id);
	}
	
	
	@PostMapping
	private void addAzienda(@RequestBody Azienda azienda) {
		daoazienda.save(azienda);
	}
	
	
	@PutMapping
	private void updateAzienda(@RequestBody Azienda azienda) {
		if(daoazienda.findById(azienda.getId()).isPresent()) {
			daoazienda.save(azienda);
		}
	}
	
	
//	@DeleteMapping("/{id}")
//	private void deleteAzienda(@PathVariable long id) {
//		daoazienda.deleteById(id);
//	}

}
