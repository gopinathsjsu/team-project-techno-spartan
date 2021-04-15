package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.transfers.ExternalTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
@RequestMapping("/bills")
public class BillPaymentController {

    @Autowired
    private ExternalTransfer externalTransfer;

    @PostMapping("/oneTimeBillPay")
    public ResponseEntity<TransactionsDbModel> oneTimeBillPayment(@RequestBody BillPaymentModel billPaymentModel)
    {
        var transaction = externalTransfer.billPayment(
                billPaymentModel.accountId,
                billPaymentModel.vendor,
                billPaymentModel.amount);
        return ResponseEntity.ok(transaction);
    }

}
