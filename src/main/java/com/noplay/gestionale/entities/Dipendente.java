package com.noplay.gestionale.entities;


import javax.persistence.Column;
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
	//@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	//@JoinColumn(name = "immagine_id", referencedColumnName = "id")
	//private DBFile dbFile;
	@Column(length = 225, nullable = true)
	private String immagine;

	
	

	public Dipendente() {
	}

	public Dipendente(long id, String nome, String cognome, String ddn, double stipendio, String dataassunzione, String ruolo, Azienda azienda, String immagine) {
		this.id = id;
		this.nome = nome;
		this.cognome = cognome;
		this.ddn = ddn;
		this.stipendio = stipendio;
		this.dataassunzione = dataassunzione;
		this.ruolo = ruolo;
		this.azienda = azienda;
		this.immagine = immagine;
	}
	

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return this.cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getDdn() {
		return this.ddn;
	}

	public void setDdn(String ddn) {
		this.ddn = ddn;
	}

	public double getStipendio() {
		return this.stipendio;
	}

	public void setStipendio(double stipendio) {
		this.stipendio = stipendio;
	}

	public String getDataassunzione() {
		return this.dataassunzione;
	}

	public void setDataassunzione(String dataassunzione) {
		this.dataassunzione = dataassunzione;
	}

	public String getRuolo() {
		return this.ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	public Azienda getAzienda() {
		return this.azienda;
	}

	public void setAzienda(Azienda azienda) {
		this.azienda = azienda;
	}


	public String getImmagine() {
		return this.immagine;
	}

	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}
	

	@Override
	public String toString() {
		return "{" +
			" id='" + getId() + "'" +
			", nome='" + getNome() + "'" +
			", cognome='" + getCognome() + "'" +
			", ddn='" + getDdn() + "'" +
			", stipendio='" + getStipendio() + "'" +
			", dataassunzione='" + getDataassunzione() + "'" +
			", ruolo='" + getRuolo() + "'" +
			", azienda='" + getAzienda() + "'" +
			", immagine='" + getImmagine() + "'" +
			"}";
	}
	
	

}
