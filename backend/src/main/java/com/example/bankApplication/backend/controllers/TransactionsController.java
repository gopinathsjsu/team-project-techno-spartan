package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.TransactionModel;
import com.example.bankApplication.backend.controllerModels.UserInfoModel;
import com.example.bankApplication.backend.exceptions.IdNotFound;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.AreaAveragingScaleFilter;
import java.util.ArrayList;


@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {
    @Autowired
    private UserAccountsRepository userAccountsRepository;

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
    public ResponseEntity<TransactionsDbModel> getTransactionById(@PathVariable Long id)
    {
        TransactionsDbModel transaction= transactionsRepository.findById(id)
                .orElseThrow(() -> new IdNotFound(id, "Transaction Not Found "));
        return ResponseEntity.ok(transaction);

    }

    @PostMapping("/me")
    public ResponseEntity<Iterable<TransactionModel>> getAllByUser(@RequestBody UserInfoModel userInfo)
    {
        if (userAccountsRepository.existsByUserId(userInfo.userId)) {
            Iterable<UserAccounts> userAccounts = userAccountsRepository.findAllByUserId(userInfo.userId);
            ArrayList<TransactionModel> transactions = new ArrayList<>();
            for (UserAccounts account : userAccounts) {
                Iterable<TransactionsDbModel> currentAccountTransactions = transactionsRepository.findByAccountIdOrReceiverAccountId(account.accountId, account.accountId);
                for (TransactionsDbModel transaction : currentAccountTransactions) {
                    transactions.add(new TransactionModel(transaction, account.accountId, userInfo.userId));
                }
            }
            return ResponseEntity.ok(transactions);
        }
        throw new IdNotFound(userInfo.userId, "User was not found ");
    }

    @PostMapping("/account/{id}")
    public ResponseEntity<Iterable<TransactionModel>> getAllByAccountId(@PathVariable Long id, @RequestBody UserInfoModel userInfo)
    {
        if (userAccountsRepository.existsByAccountIdAndUserId(id, userInfo.userId)) {
            Iterable<TransactionsDbModel> transactionsFromDb = transactionsRepository.findByAccountIdOrReceiverAccountId(id, id);
            ArrayList<TransactionModel> transactions = new ArrayList<>();
            for (TransactionsDbModel transaction: transactionsFromDb) {
                transactions.add(new TransactionModel(transaction, id, userInfo.userId));
            }
            return ResponseEntity.ok(transactions);
        }
        throw new IdNotFound(id, "Account was not found ");
    }

    @PostMapping("/admin")
    public ResponseEntity<Iterable<TransactionsDbModel>> getFeesTransactions(){

        Iterable<TransactionsDbModel> currentAccountTransactions = transactionsRepository.findByIsFeesAndIsRefunded(true, false);
        return ResponseEntity.ok(currentAccountTransactions);
    }

}
