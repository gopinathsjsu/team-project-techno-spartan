package com.example.bankApplication.backend.payment;

import com.example.bankApplication.backend.controllerModels.BillPaymentModel;

public interface BillPayment {

    Object makePayment(BillPaymentModel billPaymentModel);
}
