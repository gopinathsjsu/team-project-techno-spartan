package com.example.bankApplication.backend.scheduler;

import com.example.bankApplication.backend.manager.PaymentManager;
import com.example.bankApplication.backend.models.Accounts;
import com.example.bankApplication.backend.models.PaymentSchedule;
import com.example.bankApplication.backend.repositories.AccountsRepository;
import com.example.bankApplication.backend.repositories.PaymentScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Optional;

@Component
public class RecurringPaymentScheduler {

    @Autowired
    private PaymentScheduleRepository paymentScheduleRepository;

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
   // private ExternalTransfer externalTransfer;
    private PaymentManager paymentManager;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-YYYY");

    //@Scheduled(cron = "0 0 0 1 * ?")  //once a month at midnight
    //@Scheduled(fixedRate = 86400000)  //once a day
    @Scheduled(cron = "0 * * * * ?")
    //@Scheduled(cron = "0 15 20 14 * ?") //14th of every Month at 20:15
    public void runScheduler(){
        //System.out.println("Day is " + dateFormat.format(new Date()));
        Iterable<PaymentSchedule> schedules = paymentScheduleRepository.findAll();

        for (PaymentSchedule schedule : schedules){
            System.out.println("Schedule: " + schedule.amount + " ; " + schedule.accountId);
            Optional<Accounts> account = accountsRepository.findById(schedule.accountId);
            if(account.isPresent()){
                double bal = account.get().balance;

                if(bal < schedule.amount){
                    System.out.println("Amount " + schedule.amount + " ; " + bal);
                }
                else{
                    if("Monthly".equals(schedule.selectedOption)){
                        LocalDate date = LocalDate.now();
                        if(date.getDayOfMonth() == 1){
                            paymentManager.billPayment(
                                    schedule.accountId,
                                    schedule.vendor,
                                    schedule.amount);
                        }
                    }
                    //Yearly payment
                    else{
                        LocalDate date = LocalDate.now();
                        if(date.getMonthValue() == 1 && date.getDayOfMonth() == 1){
                            paymentManager.billPayment(
                                    schedule.accountId,
                                    schedule.vendor,
                                    schedule.amount);
                        }
                    }

                }
            }
            else{
                throw new ResourceAccessException("Account not found");
            }
        }

    }
}
