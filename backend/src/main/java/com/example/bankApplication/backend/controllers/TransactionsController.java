package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.models.Transactions;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsRepository transactionsRepository;

    // get all transactions
    @GetMapping("")
    public Iterable<Transactions> getAll()
    {
        return transactionsRepository.findAll();
    }

    //Create transaction rest api
    @PostMapping("")
    public Transactions transfer(@RequestBody Transactions transaction)
    {
        return transactionsRepository.save(transaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transactions> gettransactionById(@PathVariable Long id)
    {
        Transactions transaction= transactionsRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(transaction);

    }
}
