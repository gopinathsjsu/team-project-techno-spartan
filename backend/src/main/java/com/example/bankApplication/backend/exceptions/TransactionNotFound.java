package com.example.bankApplication.backend.exceptions;

public class TransactionNotFound extends RuntimeException{
    public TransactionNotFound(Long id, String message) {
        super(message + id);
    }
}

