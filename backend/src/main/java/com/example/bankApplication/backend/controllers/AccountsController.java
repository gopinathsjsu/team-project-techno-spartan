package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.models.AccountType;
import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import com.example.bankApplication.backend.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

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
    public ResponseEntity<Accounts> getaccountById(@PathVariable Long id)
    {
        Accounts account= accountsRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        return ResponseEntity.ok(account);

    }

    @PostMapping("/create/{uid}/{type}")
    public ResponseEntity<Accounts> createAccount(@PathVariable long uid, @PathVariable String type)
    {
        AccountType accountType = AccountType.valueOf(type.toUpperCase());

        if (uid > 0 && accountType != AccountType.NONE && usersRepository.existsById(uid)) {

            Accounts accountToSave = Accounts.builder()
                .balance(0.0)
                .monthlyFee(0.0)
                .userId(uid)
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

    @PostMapping("/close/{uid}/{aid}")
    public ResponseEntity<Boolean> closeAccount(@PathVariable long uid, @PathVariable long aid)
    {
        log.info("account close req " + uid + " " + aid);
        if (uid > 0 && aid > 0 && usersRepository.existsById(uid) && accountsRepository.existsById(aid)) {


            Accounts account= accountsRepository.findById(aid)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
            log.info(account.toString());
            if (account.type == AccountType.SAVINGS || account.type == AccountType.CHECKING) {
                account.setBalance(0.0);
                account.setType(AccountType.NONE);

                log.info("To Save : " + account);
                Accounts saved  = accountsRepository.save(account);
                log.info("Saved : " + saved);

                return ResponseEntity.ok(true);
            }
        }

        return ResponseEntity.badRequest().build();
    }
}
