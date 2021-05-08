import axios from 'axios';
const Transfers_BetweenAccount_Recurring_URL=`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/transfers/recurring`;
// const Transfers_BetweenAccount_URL=`http://localhost:8080/transfers/betweenAccounts`;
class TransferRecurringService{
    createTransferbetweenAccountRecurring(transferrecurring)
    {
        return axios.post(Transfers_BetweenAccount_Recurring_URL, transferrecurring);
    }
}

export default new TransferRecurringService()