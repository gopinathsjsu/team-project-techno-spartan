package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;
import com.example.bankApplication.backend.payment.BillPayment;
import com.example.bankApplication.backend.payment.PaymentFactory;
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
    private PaymentFactory paymentFactory;


    @PostMapping("/billPayment")
    public ResponseEntity billPayment(@RequestBody BillPaymentModel billPaymentModel){

       BillPayment billPay =  paymentFactory.getPaymentType(billPaymentModel.recurr);

      var payment = billPay.makePayment(billPaymentModel);

        return ResponseEntity.ok(payment);
    }


}
