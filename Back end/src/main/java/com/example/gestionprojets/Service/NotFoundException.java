package com.example.gestionprojets.Service;

public class NotFoundException extends RuntimeException{

    public NotFoundException(String projectNotFound){

        super(projectNotFound);
    }
}
