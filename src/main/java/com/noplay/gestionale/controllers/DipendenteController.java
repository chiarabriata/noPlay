package com.noplay.gestionale.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	private void addDipendente(@RequestBody Dipendente dipendente, RedirectAttributes ra, 
		@RequestParam("fileImage") MultipartFile multipartFile) throws IOException {
		
			String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			dipendente.setImmagine(fileName);

			Dipendente savedDipendente = daodipendente.save(dipendente);

			String uploadDir = "/target/classes/static/" + savedDipendente.getId();

			Path uploadPath = Paths.get(uploadDir);

			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}


			try (InputStream inputStream = multipartFile.getInputStream()) {
				Path filePath = uploadPath.resolve(fileName);
				Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
				
			} catch (IOException e) {
				throw new IOException("Non è stato possibile salvare il file: " + fileName);
			}


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
