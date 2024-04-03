    package com.example.gestionprojets.Entity;

    import javax.persistence.*;
    import lombok.Data;
    import lombok.Getter;
    import lombok.Setter;

    @Entity
    @Table
    @Getter@Setter
    public class Material {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name ="name")
        private String name;

        private String state;


    }
