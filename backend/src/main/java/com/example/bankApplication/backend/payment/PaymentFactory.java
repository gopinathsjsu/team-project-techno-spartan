package com.example.bankApplication.backend.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;

@Component("PaymentFactory")
@NoRepositoryBean
public class PaymentFactory {

    @Autowired
    private OneTimeBillPayment oneTimeBillPayment;

    @Autowired
    private RecurringBillPayment recurringBillPayment;

    public BillPayment getPaymentType(String recurr){
        if("false".equalsIgnoreCase(recurr)){
            return oneTimeBillPayment;
        }
        else{
            //give recurring object
            return recurringBillPayment;
        }
    }
}
