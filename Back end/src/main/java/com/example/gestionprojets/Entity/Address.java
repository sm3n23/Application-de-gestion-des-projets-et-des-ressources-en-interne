
package com.example.gestionprojets.Entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private String city;

    private String zipCode;


    /*@OneToOne
    @PrimaryKeyJoinColumn
    private Employee employees;*/


}

