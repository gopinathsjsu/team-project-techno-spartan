package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.TransactionBetweenAccountsModel;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.transfers.InterAccountTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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


}
