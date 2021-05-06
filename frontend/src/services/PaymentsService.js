import axios from 'axios';
const Base_URL=`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/payments`
// const Base_URL="http://localhost:8080/payments"
class PaymentsService{

  getRecurringTransactionsByAccount(userId, accountId) {
    return axios.post(Base_URL + '/me/account/' + accountId, {userId})
  }
}

export default new PaymentsService()
