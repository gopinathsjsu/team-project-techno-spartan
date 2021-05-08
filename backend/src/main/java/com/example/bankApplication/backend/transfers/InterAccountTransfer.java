package com.example.bankApplication.backend.transfers;

import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.ParticipantType;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

import java.util.Date;
import java.util.HashMap;

@Component("InterAccountTransfer")
@NoRepositoryBean
public class InterAccountTransfer {

    @Autowired
    private TransactionsRepository transactionsRepository;
    private static HashMap<String, Integer> recurringTransferCounter = new HashMap<String, Integer>();

    @Autowired
    private AccountsRepository accountRepository;

    public TransactionsDbModel transferBetweenAccount(long account1Id, long account2Id, double incomingAmount, String incomingMemo)
    {
        //save the transaction
        var transaction = new TransactionsDbModel();
        transaction.accountId = account1Id;
        transaction.amount = incomingAmount;
        transaction.isCredit = false;
        transaction.memo = incomingMemo;

        transaction.participantType = ParticipantType.ACCOUNT;
        transaction.receiverAccountId = account2Id;
        transaction.date = new Date();
        transactionsRepository.save(transaction);

        //update src account
        Accounts account1 = accountRepository.findById(account1Id)
            .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account1.balance -= incomingAmount;
        accountRepository.save(account1);


        //update dest account
        Accounts account2 = accountRepository.findById(account2Id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account2.balance += incomingAmount;
        accountRepository.save(account2);

        return transaction;

    }

    public TransactionsDbModel transferBetweenAccountsRecurring(
            long account1Id,
            long account2Id,
            double incomingAmount,
            String incomingMemo,
            String transactionRecurringType,
            int transactionRepeatTimes,
            String recurringUid)
    {
        if(recurringTransferCounter.containsKey(recurringUid))
        {
            var count = recurringTransferCounter.get(recurringUid);
            if(count >= 1)
            {
                recurringTransferCounter.put(recurringUid, count - 1);
            }
            else
            {
                return null;
            }
        }
        else
        {
            recurringTransferCounter.put(recurringUid, transactionRepeatTimes - 1);
        }

        //save the transaction
        var transaction = new TransactionsDbModel();
        transaction.accountId = account1Id;
        transaction.amount = incomingAmount;
        transaction.isCredit = false;
        transaction.memo = incomingMemo;
        transaction.recurringType = transactionRecurringType;

        transaction.participantType = ParticipantType.ACCOUNT;
        transaction.receiverAccountId = account2Id;
        transaction.date = new Date();
        transactionsRepository.save(transaction);

        //update src account
        Accounts account1 = accountRepository.findById(account1Id)
            .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account1.balance -= incomingAmount;
        accountRepository.save(account1);

        //update dest account
        Accounts account2 = accountRepository.findById(account2Id)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account2.balance += incomingAmount;
        accountRepository.save(account2);

        return transaction;
    }}
