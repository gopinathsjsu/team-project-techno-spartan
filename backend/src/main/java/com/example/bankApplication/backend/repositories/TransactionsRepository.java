package com.example.bankApplication.backend.repositories;

import com.example.bankApplication.backend.models.TransactionsDbModel;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<TransactionsDbModel, Long> {
    Iterable<TransactionsDbModel> findByAccountIdOrReceiverAccountId(Long id, Long id1);

    Iterable<TransactionsDbModel> findByIsFeesAndIsRefunded(boolean isFees, boolean isRefunded);
}