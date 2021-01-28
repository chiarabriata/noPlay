package com.noplay.gestionale.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.noplay.gestionale.entities.Utente;
import com.noplay.gestionale.repositories.CrudUtente;

@RestController
@RequestMapping("/utente")
public class UtenteController {

	// Altro cambiamento ma da Eclipse!!
	// Abbiamo cambiato tutto ciao

	//MODIFICA PER CAPIRE COME FUNZIONA GIT CON ECLIPSE
	@Autowired
	private CrudUtente daoutente;
	
	
	@PostMapping
	private RedirectView addUtente(Utente utente){
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String pwd = passwordEncoder.encode(utente.getPassword());
		utente.setPassword(pwd);
		daoutente.save(utente);
		RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:8080");
        return redirectView;
	}

	

	
		
}
