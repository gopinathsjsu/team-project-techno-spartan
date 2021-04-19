package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.PaymentSchedule;
import org.springframework.data.repository.CrudRepository;

public interface PaymentScheduleRepository extends CrudRepository<PaymentSchedule, Long> {
}
