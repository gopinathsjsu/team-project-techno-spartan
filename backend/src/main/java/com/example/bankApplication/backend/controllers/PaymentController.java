package com.example.bankApplication.backend.controllers;

import com.example.bankApplication.backend.controllerModels.UserInfoModel;
import com.example.bankApplication.backend.exceptions.IdNotFound;
import com.example.bankApplication.backend.models.PaymentSchedule;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.UserAccounts;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import com.example.bankApplication.backend.repositories.UserAccountsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private UserAccountsRepository userAccountsRepository;

    @Autowired
    private PaymentScheduleRepository paymentScheduleRepository;

    @PostMapping("/me/account/{id}")
    public ResponseEntity<Iterable<PaymentSchedule>> getAllByUserByAccount(@RequestBody UserInfoModel userInfo, @PathVariable Long id)
    {
        if (userAccountsRepository.existsByAccountIdAndUserId(id, userInfo.userId)) {
            return ResponseEntity.ok(paymentScheduleRepository.findByAccountId(id));
        }
        throw new IdNotFound(id, "Account was not found ");
    }

}
