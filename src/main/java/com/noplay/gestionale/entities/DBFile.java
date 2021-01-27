// package com.noplay.gestionale.entities;

// import javax.persistence.*;


// @Entity
// @Table(name = "immagini")
// public class DBFile {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id_dipendente;
//     private String percorso;
//     // @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "immagini")
//     // // @JoinColumn(name = "id_dipendente", nullable = false)
//     // private Dipendente dipendente;

    

//     public DBFile(Long id_dipendente, String percorso, Dipendente dipendente) {
//         this.id_dipendente = id_dipendente;
//         this.percorso = percorso;
//         this.dipendente = dipendente;
//     }
    

//     public DBFile() {
//     }

    
    
//     public Long getId_dipendente() {
//         return this.id_dipendente;
//     }
    
//     public void setId_dipendente(Long id_dipendente) {
//         this.id_dipendente = id_dipendente;
//     }   
    
//     public String getPercorso() {
//         return this.percorso;
//     }
    
//     public void setPercorso(String percorso) {
//         this.percorso = percorso;
//     }
    
//     public Dipendente getDipendente() {
//         return this.dipendente;
//     }
    
//     public void setDipendente(Dipendente dipendente) {
//         this.dipendente = dipendente;
//     }
    
// }