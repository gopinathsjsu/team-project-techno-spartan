package com.example.bankApplication.backend.exceptions;

public class TypeNotFound extends RuntimeException{
    public TypeNotFound(String type, String message) {
        super(message + type);
    }
}
