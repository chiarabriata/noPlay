package com.noplay.gestionale.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Azienda {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String ragionesociale;
	private String partitaiva;
	private String indirizzo;
	private String email;
	private String ntelefono;
	
	
	public Azienda(Long id, String ragionesociale, String partitaiva, String indirizzo, String email, String ntelefono) {
		super();
		this.id = id;
		this.ragionesociale = ragionesociale;
		this.partitaiva = partitaiva;
		this.indirizzo = indirizzo;
		this.email = email;
		this.ntelefono = ntelefono;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public Azienda() {
		super();
	}


	public String getRagionesociale() {
		return ragionesociale;
	}


	public void setRagionesociale(String ragionesociale) {
		this.ragionesociale = ragionesociale;
	}


	public String getPartitaiva() {
		return partitaiva;
	}


	public void setPartitaiva(String partitaiva) {
		this.partitaiva = partitaiva;
	}


	public String getIndirizzo() {
		return indirizzo;
	}


	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getNtelefono() {
		return ntelefono;
	}


	public void setNtelefono(String ntelefono) {
		this.ntelefono = ntelefono;
	}


	
	
	
	

}
