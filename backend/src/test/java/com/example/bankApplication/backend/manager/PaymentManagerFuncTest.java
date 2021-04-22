package com.example.bankApplication.backend.manager;

import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.PaymentSchedule;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import com.example.bankApplication.backend.models.Vendor;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import com.example.bankApplication.backend.repositories.TransactionsRepository;

import org.assertj.core.util.Lists;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class PaymentManagerFuncTest {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private PaymentScheduleRepository paymentScheduleRepository;


    @Test
    public void insertPaymentTest(){
        //create test account
        Accounts account = new Accounts();
        account.balance = 1000;
        account.userId = 5555;

        accountsRepository.save(account);

        Iterable<Accounts> accounts = accountsRepository.findByUserId(5555);
        List<Accounts> accountsList = Lists.newArrayList(accounts);

        assertThat(accountsList, hasSize(1));


        List<TransactionsDbModel> transactions = transactionsRepository.findAccountById(accountsList.get(0).id);
        //check no transactions present
        assertThat(transactions, hasSize(0));

        //insert transaction
        TransactionsDbModel transactionNew = new TransactionsDbModel();
        transactionNew.accountId = accountsList.get(0).id;
        transactionNew.vendor = Vendor.COMCAST;
        transactionNew.amount = 50;
        transactionNew.date = new Date();

        transactionsRepository.save(transactionNew);

        transactions = transactionsRepository.findAccountById(accountsList.get(0).id);

        //check 1 transaction present
        assertThat(transactions, hasSize(1));

        //check transaction values
        assertThat(transactions.get(0).accountId, is(accountsList.get(0).id));
        assertThat(transactions.get(0).vendor, is(Vendor.COMCAST));

        //cleanup
        accountsRepository.deleteAll(accounts);
        transactionsRepository.deleteAll(transactions);

    }

    @Test
    public void insertScheduleTest(){
        //create test account
        Accounts account = new Accounts();
        account.balance = 1000;
        account.userId = 5555;

        accountsRepository.save(account);

        Iterable<Accounts> accounts = accountsRepository.findByUserId(5555);
        List<Accounts> accountsList = Lists.newArrayList(accounts);
        //check account exists
        assertThat(accountsList, hasSize(1));

        Iterable<PaymentSchedule> schedules = paymentScheduleRepository.findByAccountId(accountsList.get(0).id);
       List<PaymentSchedule> schedulesList = Lists.newArrayList(schedules);

        //check no schedule present
        assertThat(schedulesList, hasSize(0));

        PaymentSchedule paymentSchedule =  new PaymentSchedule();
        paymentSchedule.accountId = accountsList.get(0).id ;
        paymentSchedule.vendor = Vendor.SOLAR;
        paymentSchedule.amount = 30 ;
        paymentSchedule.selectedOption = "Monthly";
        paymentSchedule.date = new Date();

        paymentScheduleRepository.save(paymentSchedule);
        schedules = paymentScheduleRepository.findByAccountId(accountsList.get(0).id);
        schedulesList = Lists.newArrayList(schedules);

        assertThat(schedulesList, hasSize(1));

        //check schedule values
        assertThat(schedulesList.get(0).accountId, is(accountsList.get(0).id));
        assertThat(schedulesList.get(0).vendor, is(Vendor.SOLAR));

        //cleanup
        accountsRepository.deleteAll(accounts);
        paymentScheduleRepository.deleteAll(schedules);


    }
}
