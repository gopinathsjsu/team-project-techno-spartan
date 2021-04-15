package com.example.bankApplication.backend.transfers;

import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.ParticipantType;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.Vendor;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

@Component("ExternalTransfer")
@NoRepositoryBean
public class ExternalTransfer {
    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountsRepository accountRepository;

    public TransactionsDbModel billPayment(long accountId, Vendor vendor, double incomingAmount)
    {
        //save bill pay transaction
        var transaction = new TransactionsDbModel();
        transaction.accountId = accountId;
        transaction.amount = incomingAmount;
        transaction.vendor = vendor;
        transaction.isCredit = false;
        transaction.participantType = ParticipantType.EXTERNAL;

        transactionsRepository.save(transaction);

        //update account
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account.balance -= incomingAmount;
        accountRepository.save(account);

        return transaction;

    }
}
