package com.example.bankApplication.backend.transfers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;

public class InterAccountTransferRunnableTask implements Runnable{
    long account1Id;
    long account2Id;
    double amount;
    String memo;
    InterAccountTransfer interAccountTransfer;

    public InterAccountTransferRunnableTask(InterAccountTransfer interAccountTransfer, long account1Id, long account2Id, double amount, String memo)
    {
        this.interAccountTransfer = interAccountTransfer;
        this.account1Id=account1Id;
        this.account2Id=account2Id;
        this.amount =amount;
        this.memo =memo;
    }
    @Override
    public void run() {
            interAccountTransfer.transferBetweenAccount(account1Id,account2Id,amount,memo);

    }
}
