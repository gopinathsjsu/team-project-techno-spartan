import axios from 'axios';
const Base_URL=`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/transactions`
// const Base_URL=`http://localhost:8080/transactions`

class TransactionService{
  getUserTransactions(userId) {
    return axios.post(Base_URL + '/me', {userId})
  }

  getAccountTransactions(userId, accountId) {
    return axios.post(Base_URL + '/account/' + accountId, {userId})
  }

  getFeesTransactions(){
    return axios.post(Base_URL + '/admin')
  }
  
  getRefund(id) {
    return axios.post(Base_URL + '/admin/refund/' + id)
  }
  getAccountTransactionsByType(userId, accountId, type) {
    return axios.post(Base_URL + '/account/' + accountId + '?type=' + type, {userId})
  }

  getUserTransactionsByType(userId, type) {
    return axios.post(Base_URL + '/me?type=' + type, {userId})
  }
}

export default new TransactionService()
