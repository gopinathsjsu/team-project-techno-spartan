package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.exceptions.IdNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionsController {
    @ResponseBody
    @ExceptionHandler(IdNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String idNotFoundHandler(IdNotFound ex) {
        return ex.getMessage();
    }
}
