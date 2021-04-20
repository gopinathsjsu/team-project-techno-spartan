package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.UserInfoModel;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashSet;
import java.util.Set;


@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {
    @Autowired
    private UserAccountsRepository userAccountsRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountsRepository accountsRepository;

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
    public ResponseEntity<TransactionsDbModel> getTransactionById(@PathVariable Long id)
    {
        TransactionsDbModel transaction= transactionsRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(transaction);

    }

    @GetMapping("/me")
    public Iterable<TransactionsDbModel> getAllByUser(@RequestBody UserInfoModel userInfo)
    {
        if (userAccountsRepository.existsByUserId(userInfo.userId)) {
            Iterable<UserAccounts> userAccounts = userAccountsRepository.findAllByUserId(userInfo.userId);
            Set<TransactionsDbModel> transactions = new HashSet<>();
            for (UserAccounts account : userAccounts) {
                Iterable<TransactionsDbModel> currentAccountTransactions = this.getAllByAccountId(account.accountId, userInfo);
                for (TransactionsDbModel transaction: currentAccountTransactions) {
                    transactions.add(transaction);
                }
            }
            return transactions;
        }
        return null;
    }

    @GetMapping("/account/{id}")
    public Iterable<TransactionsDbModel> getAllByAccountId(@PathVariable Long id, @RequestBody UserInfoModel userInfo)
    {
        if (userAccountsRepository.existsByAccountIdAndUserId(id, userInfo.userId)) {
            return transactionsRepository.findByAccountIdOrReceiverAccountId(id, id);
        }
        return null;
    }

}
