package com.example.bankApplication.backend.transactions;

import com.example.bankApplication.backend.controllerModels.TransactionModel;
import com.example.bankApplication.backend.models.TransactionType;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;

@Service
public class AccountTransactionsService {
    private TransactionsRepository tr;

    @Autowired
    public void setTransactionsRepository(TransactionsRepository tr) {
           this.tr = tr;
    }

    private Date getDate18MonthAgo() {
        LocalDate currentDate = LocalDate.now();
        LocalDate localDate18MonthAgo = currentDate.minusMonths(18);
        return Date.from(localDate18MonthAgo.atStartOfDay( ZoneId.of( "America/Montreal" ) ).toInstant());
    }

    public ArrayList<TransactionModel> getAllTransactionsByType(long id, long userId, TransactionType type) {
        Date date = getDate18MonthAgo();
        ArrayList<TransactionModel> transactions = new ArrayList<>();
        Iterable<TransactionsDbModel> currentAccountTransactions;
        if (type == TransactionType.FEES) {
            currentAccountTransactions = tr.findByAccountIdAndIsFeesAndDateAfter(id, true, date);
        } else if (type == TransactionType.CREDIT) {
            currentAccountTransactions = tr.findByAccountIdAndDateAfter(id, date);
        } else if (type == TransactionType.DEBIT) {
            currentAccountTransactions = tr.findByReceiverAccountIdAndDateAfter(id, date);
        } else if (type == TransactionType.NONE) {
            currentAccountTransactions = tr.findByAccountIdOrReceiverAccountIdAndDateAfter(id, id, date);
        }
        else {
            currentAccountTransactions = Collections.emptyList();
        }
        for (TransactionsDbModel transaction : currentAccountTransactions) {
            transactions.add(new TransactionModel(transaction, id, userId));
        }
        return transactions;
    }




}
