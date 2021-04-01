package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/accounts")
public class AccountsController {

    @Autowired
    private AccountsRepository accountsRepository;

    // get all accounts
    @GetMapping("")
    public Iterable<Accounts> getAll()
    {
        return accountsRepository.findAll();
    }

    //Create account rest api
    @PostMapping("")
    public Accounts transfer(@RequestBody Accounts account)
    {
        return accountsRepository.save(account);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accounts> getaccountById(@PathVariable Long id)
    {
        Accounts account= accountsRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(account);

    }
}
