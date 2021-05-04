package com.example.bankApplication.backend.controllerModels;

import com.example.bankApplication.backend.models.ParticipantType;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.Vendor;

import java.util.Date;
import java.util.Objects;

public class TransactionModel {
    public long id;
    public long account;
    public long userId;
    public boolean isCredit;
    public double amount;
    public String memo;
    public Date date;
    public Date startDate;
    public long durationInDays;
    public Vendor vendor;
    public boolean isRefunded;
    public boolean isFee;

    public TransactionModel(TransactionsDbModel transaction, Long accountId, Long userId) {
        id = transaction.id;
        account = (transaction.accountId == accountId) ? accountId: transaction.receiverAccountId;
        this.userId = userId;
        isCredit = (transaction.accountId == accountId);
        amount = transaction.amount;
        memo = transaction.memo;
        date = transaction.date;
        startDate = transaction.startDate;
        durationInDays = transaction.durationInDays;
        vendor = transaction.vendor;
        isRefunded = transaction.isRefunded;
        isFee = transaction.isFees;
    }
}