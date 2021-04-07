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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

@Controller
@RequestMapping("/transfers")
public class TransferController {

    @Autowired
    private InterAccountTransfer interAccountTransfer;

    @PostMapping("/betweenAccounts")
    public ResponseEntity<TransactionsDbModel> transferBetweenAccounts(@RequestBody TransactionBetweenAccountsModel transactionBetweenAccountsModel)
    {
        var transaction = interAccountTransfer.transferBetweenAccount(
            transactionBetweenAccountsModel.accountId,
            transactionBetweenAccountsModel.participantId,
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

        Date date = formatter.parse(recurringBetweenAccountsModel.startDate,new ParsePosition(0));
        long dateinSeconds= Duration.ofDays(recurringBetweenAccountsModel.durationInDays).getSeconds();

        ThreadPoolTaskScheduler threadPoolTaskScheduler=threadPoolTaskSchedulerConfig.threadPoolTaskScheduler();
        threadPoolTaskScheduler.scheduleAtFixedRate(
                new InterAccountTransferRunnableTask(
                    interAccountTransfer,
                    recurringBetweenAccountsModel.accountId,
                    recurringBetweenAccountsModel.accountIdTo,
                    recurringBetweenAccountsModel.amount,
                    recurringBetweenAccountsModel.memo),
                new Date(System.currentTimeMillis() + 30000),
                30000);
        return ResponseEntity.ok("");
    }


}