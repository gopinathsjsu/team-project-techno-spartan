package com.example.bankApplication.backend.payment;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;
import com.example.bankApplication.backend.manager.PaymentManager;
import com.example.bankApplication.backend.models.PaymentSchedule;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

import java.util.Date;

@Component("RecurringBillPayment")
@NoRepositoryBean
public class RecurringBillPayment implements BillPayment{

    @Autowired
    private PaymentManager paymentManager;

    @Override
    public Object makePayment(BillPaymentModel billPaymentModel) {

      return paymentManager.recurringBillPayment(billPaymentModel);

    }
}
