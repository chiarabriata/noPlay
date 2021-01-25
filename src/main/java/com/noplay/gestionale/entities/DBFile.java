package com.noplay.gestionale.entities;

import javax.persistence.*;

@Entity
@Table(name = "immagini")
public class DBFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String percorso;
    


    public DBFile() {
    }

    public DBFile(Long id, String percorso) {
        this.id = id;
        this.percorso = percorso;
        
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPercorso() {
        return this.percorso;
    }

    public void setPercorso(String percorso) {
        this.percorso = percorso;
    }

    

    
}
