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

import com.noplay.gestionale.entities.Dipendente;
import com.noplay.gestionale.repositories.CrudDipendente;

@RestController
@RequestMapping("/dipendenti")
public class DipendenteController {

	// Altro cambiamento ma da Eclipse!!
	// Abbiamo cambiato tutto ciao

	//MODIFICA PER CAPIRE COME FUNZIONA GIT CON ECLIPSE
	@Autowired
	private CrudDipendente daodipendente;

	
	@GetMapping
	private Iterable<Dipendente> getListaDipendenti() {
		return daodipendente.findAll();
	}
	
	
	@GetMapping("/{id}")
	private Optional<Dipendente> getDipendente(@PathVariable long id) {
		return daodipendente.findById(id);
	}
	
	
	@PostMapping
	private void addDipendente(@RequestBody Dipendente dipendente) {
		daodipendente.save(dipendente);
	}
	
	
	@PutMapping
	private void updateDipendente(@RequestBody Dipendente dipendente) {
		if(daodipendente.findById(dipendente.getId()).isPresent()) {
			daodipendente.save(dipendente);
		}
	}
	
	
//	@DeleteMapping("/{id}")
//	private void deleteDipendente(@PathVariable long id) {
//		daodipendente.deleteById(id);
//	}
	
}
