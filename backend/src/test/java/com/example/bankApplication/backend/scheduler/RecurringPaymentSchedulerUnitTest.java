package com.example.bankApplication.backend.scheduler;

import com.example.bankApplication.backend.manager.PaymentManager;
import com.example.bankApplication.backend.models.*;
import com.example.bankApplication.backend.payment.BillPayment;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RecurringPaymentSchedulerUnitTest {

    @Mock
    private PaymentScheduleRepository paymentScheduleRepository;

    @InjectMocks
    private RecurringPaymentScheduler rps;

    @Mock
    private AccountsRepository accountsRepository;

    @Mock
    private PaymentManager pm;

    @BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testRunSchedulerLowBalance(){
        List<PaymentSchedule> payList = new ArrayList<>();

        payList.add(getPaymentSchedule(1000L, 40, Vendor.PGE, "Monthly"));

        when(paymentScheduleRepository.findAll()).thenReturn(payList);
        when(accountsRepository.findById(1000L)).thenReturn
                (Optional.of(getAccounts(1000L, 5555, AccountType.CHECKING, 20)));

        rps.runScheduler();

        verify(paymentScheduleRepository).findAll();
        verify(accountsRepository).findById(1000L);

    }

    @Test
    public void testRunScheduler(){

        List<PaymentSchedule> payList = new ArrayList<>();

        payList.add(getPaymentSchedule(1000L, 40, Vendor.PGE, "Monthly"));

        when(paymentScheduleRepository.findAll()).thenReturn(payList);
        when(accountsRepository.findById(1000L)).thenReturn
                (Optional.of(getAccounts(1000L, 5555, AccountType.CHECKING, 2000)));
        when(pm.billPayment(1000L, Vendor.PGE, 40)).thenReturn(new TransactionsDbModel());

        //setting day as today's day of the month for test
        LocalDate date = LocalDate.now();
        rps.setDayOfMonth(date.getDayOfMonth());

        rps.runScheduler();

        verify(paymentScheduleRepository).findAll();
        verify(accountsRepository).findById(1000L);
        verify(pm).billPayment(1000L, Vendor.PGE, 40);

    }


    private PaymentSchedule getPaymentSchedule(long accountId, long amount, Vendor vendor, String selectedOption){

        PaymentSchedule ps = new PaymentSchedule();
        ps.date = new Date();
        ps.amount = amount;
        ps.vendor = vendor;
        ps.accountId = accountId;
        ps.selectedOption = selectedOption;

        return ps;
    }

    private Accounts getAccounts(long id, long userId, AccountType type, long balance){

        Accounts acc = new Accounts();
        acc.id = id;
        acc.userId = userId;
        acc.type = type;
        acc.balance = balance;

        return acc;
    }
}
