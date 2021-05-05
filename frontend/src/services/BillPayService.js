import axios from 'axios';
const Bill_Payment_URL=`https://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/bills/billPayment`;
// const Bill_Payment_URL=`http://localhost:8080/bills/billPayment`;

class BillPayService{
    createBillPayment(payment)
    {
        return axios.post(Bill_Payment_URL, payment);
    }

}

export default new BillPayService()