package com.noplay.gestionale.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Dipendente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome;
	private String cognome;
	private String ddn;
	private double stipendio;
	private String dataassunzione;
	private String ruolo;
	@ManyToOne
	@JoinColumn(name = "azienda_id", nullable = false)
	private Azienda azienda;
	
	
	public Dipendente(long id, String nome, String cognome, String ddn, double stipendio, String dataassunzione,
			String ruolo, Azienda azienda) {
		super();
		this.id = id;
		this.nome = nome;
		this.cognome = cognome;
		this.ddn = ddn;
		this.stipendio = stipendio;
		this.dataassunzione = dataassunzione;
		this.ruolo = ruolo;
		this.azienda = azienda;
	}


	public Dipendente() {
		super();
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getCognome() {
		return cognome;
	}


	public void setCognome(String cognome) {
		this.cognome = cognome;
	}


	public String getDdn() {
		return ddn;
	}


	public void setDdn(String ddn) {
		this.ddn = ddn;
	}


	public double getStipendio() {
		return stipendio;
	}


	public void setStipendio(double stipendio) {
		this.stipendio = stipendio;
	}


	public String getDataassunzione() {
		return dataassunzione;
	}


	public void setDataassunzione(String dataassunzione) {
		this.dataassunzione = dataassunzione;
	}


	public String getRuolo() {
		return ruolo;
	}


	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}


	public Azienda getAzienda() {
		return azienda;
	}


	public void setAzienda(Azienda azienda) {
		this.azienda = azienda;
	}
	
	
	
	
	
	

}
