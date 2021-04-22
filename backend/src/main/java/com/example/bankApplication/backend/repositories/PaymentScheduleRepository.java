package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.PaymentSchedule;
import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentScheduleRepository extends CrudRepository<PaymentSchedule, Long> {

    //for JUnit tests
    @Query("SELECT t FROM PaymentSchedule t where t.accountId = :accId")
    List<PaymentSchedule> findScheduleByAccountId(@Param("accId") long accId);
    Iterable<PaymentSchedule> findByAccountId(Long id);
}
