package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.UserInfoModel;
import com.example.bankApplication.backend.exceptions.IdNotFound;
import com.example.bankApplication.backend.models.AccountType;
import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import com.example.bankApplication.backend.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/accounts")
public class AccountsController {

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private UserAccountsRepository userAccountsRepository;

    @Autowired
    private UsersRepository usersRepository;

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
    public ResponseEntity<Accounts> getAccountById(@PathVariable Long id)
    {
        Accounts account= accountsRepository.findById(id)
                .orElseThrow(() -> new IdNotFound(id, "Account Id Not Found "));
        return ResponseEntity.ok(account);

    }

    @PostMapping("/me/close/{id}")
    public ResponseEntity<Boolean> closeAccount(@PathVariable Long id, @RequestBody UserInfoModel userInfo) {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/me/{id}")
    public ResponseEntity<Accounts> getUserAccountById(@PathVariable Long id, @RequestBody UserInfoModel userInfo)
    {
        Accounts account= accountsRepository.findByIdAndUserId(id, userInfo.userId)
                .orElseThrow(() -> new IdNotFound(id, "Account Id Not Found "));
        return ResponseEntity.ok(account);

    }

    @PostMapping("/me")
    public ResponseEntity<Iterable<Accounts>> getAllByUser(@RequestBody UserInfoModel userInfo)
    {
        Stream<Accounts> accounts= StreamSupport.stream(accountsRepository.findByUserId(userInfo.userId).spliterator(), false)
                .filter(elem -> elem.type != AccountType.NONE);
        return ResponseEntity.ok(accounts.collect(Collectors.toList()));
    }

    @PostMapping("/me/create/{type}")
    public ResponseEntity<Accounts> createAccount(@RequestBody UserInfoModel userInfo, @PathVariable String type)
    {
        AccountType accountType = AccountType.valueOf(type.toUpperCase());

        if (userInfo.userId > 0 && accountType != AccountType.NONE && usersRepository.existsById(userInfo.userId)) {

            Accounts accountToSave = Accounts.builder()
                .balance(0.0)
                .monthlyFee(0.0)
                .userId(userInfo.userId)
                .type(accountType)
                .build();

            log.info("To Save : " + accountToSave);

            Accounts saved = accountsRepository.save(accountToSave);

            log.info("Saved : " + saved);

            UserAccounts userAccountToSave = UserAccounts.builder()
                .accountId(accountToSave.id)
                .userId(accountToSave.userId)
                .build();

            log.info("To Save : " + userAccountToSave);

            UserAccounts userAccounts = userAccountsRepository.save(userAccountToSave);

            log.info("Saved : " + userAccounts);

            return ResponseEntity.ok(saved);
        }


        return ResponseEntity.badRequest().build();
    }
}
