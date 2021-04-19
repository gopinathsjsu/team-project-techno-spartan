package com.example.bankApplication.backend.payment;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;
import com.example.bankApplication.backend.manager.PaymentManager;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;

@Component("OneTimeBillPayment")
@NoRepositoryBean
public class OneTimeBillPayment implements BillPayment{


    @Autowired
    private PaymentManager paymentManager;

    @Override
    public Object makePayment(BillPaymentModel billPaymentModel) {

        return paymentManager.billPayment(billPaymentModel.accountId, billPaymentModel.vendor, billPaymentModel.amount);

    }
}
