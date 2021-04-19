package com.example.bankApplication.backend.manager;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;
import com.example.bankApplication.backend.models.*;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

import java.util.Date;

@Component("PaymentManager")
@NoRepositoryBean
public class PaymentManager {
    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountsRepository accountRepository;

    @Autowired
    private PaymentScheduleRepository scheduleRepository;

    public TransactionsDbModel billPayment(long accountId, Vendor vendor, double incomingAmount)
    {
        //save bill pay transaction
        var transaction = new TransactionsDbModel();
        transaction.accountId = accountId;
        transaction.amount = incomingAmount;
        transaction.vendor = vendor;
        transaction.isCredit = false;
        transaction.participantType = ParticipantType.EXTERNAL;
        transaction.date = new Date();

        transactionsRepository.save(transaction);

        //update account
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));
        account.balance -= incomingAmount;
        accountRepository.save(account);

        return transaction;

    }

    public PaymentSchedule recurringBillPayment (BillPaymentModel billPaymentModel){

        accountRepository.findById(billPaymentModel.accountId)
                .orElseThrow(() -> new ResourceAccessException("Id not found"));

        var schedule = new PaymentSchedule();
        schedule.accountId = billPaymentModel.accountId;
        schedule.amount = billPaymentModel.amount;
        schedule.vendor = billPaymentModel.vendor;
        schedule.selectedOption = billPaymentModel.selectedOption;
        schedule.date = new Date();

        //saving schedule info in database
        scheduleRepository.save(schedule);

        return schedule;
    }
}
