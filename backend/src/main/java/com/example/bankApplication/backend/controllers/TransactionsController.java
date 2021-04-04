package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsRepository transactionsRepository;

    // get all transactions
    @GetMapping("")
    public Iterable<TransactionsDbModel> getAll()
    {
        return transactionsRepository.findAll();
    }

    //Create transaction rest api
    @PostMapping("")
    public TransactionsDbModel transfer(@RequestBody TransactionsDbModel transaction)
    {
        return transactionsRepository.save(transaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionsDbModel> gettransactionById(@PathVariable Long id)
    {
        TransactionsDbModel transaction= transactionsRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(transaction);

    }
}
