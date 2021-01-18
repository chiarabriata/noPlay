package com.noplay.gestionale.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Azienda {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String ragionesociale;
	private String partitaiva;
	private String indirizzo;
	private String email;
	private int ntelefono;
	private List<Dipendente> dipendenti;
	
	
	public Azienda(String ragionesociale, String partitaiva, String indirizzo, String email, int ntelefono,
			List<Dipendente> dipendenti) {
		super();
		this.ragionesociale = ragionesociale;
		this.partitaiva = partitaiva;
		this.indirizzo = indirizzo;
		this.email = email;
		this.ntelefono = ntelefono;
		this.dipendenti = dipendenti;
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


	public int getNtelefono() {
		return ntelefono;
	}


	public void setNtelefono(int ntelefono) {
		this.ntelefono = ntelefono;
	}


	public List<Dipendente> getDipendenti() {
		return dipendenti;
	}


	public void setDipendenti(List<Dipendente> dipendenti) {
		this.dipendenti = dipendenti;
	}
	
	
	
	

}
