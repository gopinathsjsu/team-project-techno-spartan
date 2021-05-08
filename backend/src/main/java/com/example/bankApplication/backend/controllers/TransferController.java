package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.RecurringBetweenAccountsModel;
import com.example.bankApplication.backend.controllerModels.TransactionBetweenAccountsModel;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.scheduler.ThreadPoolTaskSchedulerConfig;
import com.example.bankApplication.backend.transfers.InterAccountTransfer;
import com.example.bankApplication.backend.transfers.InterAccountTransferRunnableTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.Locale;

@Controller
@CrossOrigin
@RequestMapping("/transfers")
public class TransferController {

    @Autowired
    private InterAccountTransfer interAccountTransfer;

    @PostMapping("/betweenAccounts")
    public ResponseEntity<TransactionsDbModel> transferBetweenAccounts(@RequestBody TransactionBetweenAccountsModel transactionBetweenAccountsModel)
    {
        var transaction = interAccountTransfer.transferBetweenAccount(
            transactionBetweenAccountsModel.accountId,
            transactionBetweenAccountsModel.receiverAccountId,
            transactionBetweenAccountsModel.amount,
            transactionBetweenAccountsModel.memo);
        return ResponseEntity.ok(transaction);
    }

    @Autowired
    ThreadPoolTaskSchedulerConfig threadPoolTaskSchedulerConfig;

    @PostMapping("/recurring")
    public ResponseEntity recurringBetweenAccounts(@RequestBody RecurringBetweenAccountsModel recurringBetweenAccountsModel)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyy-MM-dd", Locale.ENGLISH);


        var recurringUid = java.util.UUID.randomUUID().toString();

        ThreadPoolTaskScheduler threadPoolTaskScheduler=threadPoolTaskSchedulerConfig.threadPoolTaskScheduler();
        //demo purposes
        int transferRecurringDurationInS =
            recurringBetweenAccountsModel.transactionRecurringType == "ANNUALLY"?
                30*12*1000 :
                30*1000;

        threadPoolTaskScheduler.scheduleAtFixedRate(
        new InterAccountTransferRunnableTask(
            interAccountTransfer,
            recurringBetweenAccountsModel.accountId,
            recurringBetweenAccountsModel.accountIdTo,
            recurringBetweenAccountsModel.amount,
            recurringBetweenAccountsModel.memo,
            recurringBetweenAccountsModel.transactionRecurringType,
            recurringBetweenAccountsModel.transactionRepeatTimes,
            recurringUid),
        new Date(System.currentTimeMillis() + 10000),
            transferRecurringDurationInS);
        return ResponseEntity.ok("");
    }


}
