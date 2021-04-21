package com.example.bankApplication.backend.exceptions;

public class IdNotFound extends RuntimeException{
    public IdNotFound(Long id, String message) {
        super(message + id);
    }
}
