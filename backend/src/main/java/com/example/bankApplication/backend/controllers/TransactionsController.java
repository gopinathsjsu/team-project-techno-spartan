package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.TransactionModel;
import com.example.bankApplication.backend.controllerModels.UserInfoModel;
import com.example.bankApplication.backend.exceptions.IdNotFound;
import com.example.bankApplication.backend.exceptions.TypeNotFound;
import com.example.bankApplication.backend.models.TransactionType;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import com.example.bankApplication.backend.transactions.AccountTransactionsService;
import com.example.bankApplication.backend.transfers.InterAccountTransfer;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.AreaAveragingScaleFilter;
import java.util.ArrayList;
import java.time.LocalDate;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {
    @Autowired
    private UserAccountsRepository userAccountsRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountTransactionsService atService;

    @Autowired
    private InterAccountTransfer interAccountTransfer;

    //2147483647
    public static final long bankAccountId = Integer.MAX_VALUE;

    // get all transactions
    @GetMapping("")
    public Iterable<TransactionsDbModel> getAll() {
        return transactionsRepository.findAll();
    }

    //Create transaction rest api
    @PostMapping("")
    public TransactionsDbModel transfer(@RequestBody TransactionsDbModel transaction) {
        return transactionsRepository.save(transaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionsDbModel> getTransactionById(@PathVariable Long id) {
        TransactionsDbModel transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new IdNotFound(id, "Transaction Not Found "));
        return ResponseEntity.ok(transaction);

    }

    // All transactions for specific user for specific account
    @PostMapping("/account/{id}")
    public ResponseEntity<Iterable<TransactionModel>> getAllByAccountId(@PathVariable Long id, @RequestBody UserInfoModel userInfo, @RequestParam(required = false) String type) {
        TransactionType transactionType;

        if (type == null)
            transactionType = TransactionType.NONE;
        else if (TransactionType.contains(type))
            transactionType = TransactionType.valueOf(type.toUpperCase());
        else
            throw new TypeNotFound(type, "Transaction Type not Found:");

        if (userAccountsRepository.existsByAccountIdAndUserId(id, userInfo.userId)) {
            ArrayList<TransactionModel> transactions = atService.getAllTransactionsByType(id, userInfo.userId, transactionType);
            return ResponseEntity.ok(transactions);
        }
        throw new IdNotFound(id, "Account was not found ");
    }

    // All transactions for specific user by type
    @PostMapping("/me")
    public ResponseEntity<Iterable<TransactionModel>> getAllByType(@RequestBody UserInfoModel userInfo, @RequestParam(required = false) String type) {
        TransactionType transactionType;

        if (type == null)
            transactionType = TransactionType.NONE;
        else if (TransactionType.contains(type))
            transactionType = TransactionType.valueOf(type.toUpperCase());
        else
            throw new TypeNotFound(type, "Transaction Type not Found:");
        if (userAccountsRepository.existsByUserId(userInfo.userId)) {
            ArrayList<TransactionModel> transactions = new ArrayList<>();
            Iterable<UserAccounts> userAccounts = userAccountsRepository.findAllByUserId(userInfo.userId);

            for (UserAccounts account : userAccounts) {
                transactions.addAll(atService.getAllTransactionsByType(account.accountId, userInfo.userId, transactionType));
            }
            return ResponseEntity.ok(transactions);
        }
        throw new IdNotFound(userInfo.userId, "User was not found ");
    }


    @PostMapping("/admin")
    public ResponseEntity<Iterable<TransactionsDbModel>> getFeesTransactions(){

        Iterable<TransactionsDbModel> currentAccountTransactions = transactionsRepository.findByIsFeesAndIsRefunded(true, false);
        return ResponseEntity.ok(currentAccountTransactions);
    }

    @PostMapping("/admin/refund/{tid}")
    public ResponseEntity<Boolean> refund(@PathVariable long tid){

        if (tid > 0) {
            Optional<TransactionsDbModel> transOpt = transactionsRepository.findById(tid);
            if (transOpt.isPresent()) {

                TransactionsDbModel ogTx = transOpt.get();

                TransactionsDbModel refundTx = interAccountTransfer.transferBetweenAccount(bankAccountId,
                    ogTx.accountId, ogTx.amount,
                    "manual refundTx");
                log.info("refundTx tx : " + refundTx);

                ogTx.setRefunded(true);
                TransactionsDbModel savedTx = transactionsRepository.save(ogTx);
                log.info("refundTx tx saved : " + savedTx);
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.badRequest().build();
    }

}
