"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { getPaymentRequest } from "@/services/withdrawApi";
import { getUpiDetailes } from "@/services/upiApiCall";
import { getBankDetailes } from "@/services/bankApiCall";
import { savePaymentRequest } from "@/services/withdrawApi";
import LoadingSpin from "@/components/LoadingSpin";
import { getEarnings } from '@/services/networkApiCall';

const Withdrawal = () => {
  const [isPlanBuy, setIsPlanBuy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [radio, setRadio] = useState({ upi: false, bank: false });
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMode: "",
    payment: "",
  });

  const [upiData, setUpiData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [isBank, setisBank] = useState(false);
  const [isReq, setIsReq] = useState(false);
  const [isUpi, setisUpi] = useState(false);
  const [requestData, setRequestData] = useState(false);

  useEffect(() => {
    async function getData() {
      const paymentRequests = await getPaymentRequest();
      const fatchUpi = await getUpiDetailes();
      const fatchBank = await getBankDetailes();
      const fatchEarn = await getEarnings();
      if (fatchUpi.success) {
        const deta = fatchUpi.data;
        setUpiData([
          { Name: deta.name },
          { Phone: deta.phone },
          { UPI: deta.upi },
        ]);
        setisUpi(true);
      } else {
        const noUpi = fatchUpi.data || fatchUpi.error;
        if (!noUpi) {
          setUpiData("Server Error Try Again!");
        } else {
          setUpiData(noUpi.toString());
          setisUpi(false);
        }
      }
      if (fatchBank.success) {
        const deta = fatchBank.data;
        setBankData([
          { "Bank Holder": deta.holder_name },
          { Bank: deta.bank_name },
          { "Account Number": deta.account_number },
          { IFSC: deta.ifsc_code },
        ]);
        setisBank(true);
      } else {
        const noBank = fatchBank.data || fatchBank.error;
        if (!noBank) {
          setBankData("Server Error Try Again!");
        } else {
          setBankData(noBank.toString());
          setisBank(false);
        }
      }
      if (paymentRequests.success) {
        const deta = paymentRequests.data;
        setRequestData(deta);
        setIsReq(true);
      } else {
        const norequest = paymentRequests.data || paymentRequests.error;
        if (!norequest) {
          setRequestData({ msg: "Server Error Try Again!" });
        } else {
          setRequestData({ msg: norequest.toString()});
        }
      }
      
      if(fatchEarn.success){
        const deta = fatchEarn.data;
        setIsPlanBuy(deta);
      }else{
        const noCode = fatchEarn.data || fatchEarn.error;
        if(!noCode){
          toast.warning("Server Error Try Again!");
          return
        }
        toast.warning(noCode);
      }
      setIsLoading(false);
    }
    getData();
  }, []);

  

  const radioHandle = (e) => {
    if (e.target.value === "UPI") {
      setRadio({ upi: true, bank: false });
      setPaymentInfo({ ...paymentInfo, paymentMode: "UPI" });
    }
    if (e.target.value === "BANK") {
      setRadio({ upi: false, bank: true });
      setPaymentInfo({ ...paymentInfo, paymentMode: "BANK" });
    }
  };

  const onClickWithdraw = async (e) => {
    e.preventDefault();
    const payMode = paymentInfo.paymentMode;
    const rpayment = paymentInfo.payment;
    if (rpayment.trim() === "" || rpayment == null || rpayment < 500) {
      toast.warning("You min withdrawl 500/- !");
      return;
    }
    if (payMode.trim() === "" || payMode == null) {
      toast.warning("Selecte Payment Methode!");
      return;
    }
    let res;
    try {
      setIsLoading(true);
      res = await savePaymentRequest(paymentInfo);
    } catch (error) {
      console.log(error);
      res = { message: "something went wrog Try-again!", success: false };
    } finally {
      setIsLoading(false);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        toast.warning(res.message);
      }
    }
  };

  return (
    <>
      <LoadingSpin isload={isLoading} />
      <Navbar title={"Withdrawl"} />
      <div className="container mb-20 px-1 py-3 mx-auto md:w-1/2">
        <div>
          <div className="rounded-lg p-2 bg-gray-50 m-1 shadow-lg ">
            <div className="text-blue-500 text-center font-semibold text-lg">
              Wallet
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-500"></hr>
            <div>
            <div className="flex justify-between p-1 mt-1">
              <span className="font-semibold">Total Earning</span>
              <span>₹ {isPlanBuy ? isPlanBuy.total_earning : " 0.0"} </span>
            </div>
            <div className="flex justify-between p-1 mt-1">
              <span className="font-semibold">Total withdraw</span>
              <span>₹ {isPlanBuy ? isPlanBuy.total_withdraw : "0.0"} </span>
            </div>
            <div className="flex justify-between p-1 mt-1">
              <span className="font-semibold">Current amount</span>
              <span className="relative">₹ {isPlanBuy ? isPlanBuy.current_amount : "0.0"} 
              <div className="h-2 w-2 rounded-full absolute top-1 -left-3 bg-green-400"></div>
              </span>
            </div>
            </div>
          </div>
        </div>

        {/* payment withdraw */}
        <div className="rounded-lg p-3 bg-gray-50 mt-4 shadow-lg ">
          <div className="mb-2">
            <div>
              <span className="border-2 border-blue-300 rounded-full py-1 px-2">
                Tax 10%
              </span>
            </div>
            <div className="m-2 mb-1 flex items-center border-b-2 border-gray-400 font-semibold">
              <span>₹-</span>
              <input
                type="number"
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, payment: e.target.value })}
                placeholder="Enter amount"
                value={paymentInfo.payment}
                className="bg-transparent w-full p-2 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            {/* <div className='text-red-500 text-sm  ml-3'>*Plese enter amount</div> */}
          </div>

          {/* payment modes */}
          <div className="mt-4">
            <div className="ml-1 font-semibold text-blue-500 mb-0.5">
              Payment Mode{" "}
            </div>

            {/* upi mode */}

            <div className=" px-3 border border-gray-700 rounded mb-4">
              <div className="flex items-center">
                <input
                  id="radio-1"
                  type="radio"
                  value="UPI"
                  name="payment-mode"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  onChange={radioHandle}
                />
                <label
                  htmlFor="radio-1"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                >
                  UPI
                </label>
              </div>
              {radio.upi && (
                <div>
                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-500"></hr>
                  {isUpi &&
                    upiData.map((val, i) => {
                      return (
                        <div key={i} className="flex justify-between p-1 mt-1">
                          <span className="font-semibold">
                            {Object.keys(val)[0]}
                          </span>
                          <span className="text-sm">{Object.values(val)[0]}</span>
                        </div>
                      );
                    })}
                  {!isUpi && (
                    <div className="flex justify-end items-center gap-5 my-2">
                      <span className="text-sm">{upiData}</span>
                      <Link
                        href={"./mybank/upiform"}
                        className="duration-200 ease inline-flex items-center m-1 transition py-2 px-5 rounded text-white bg-blue-500 hover:bg-blue-600 text-sm"
                      >
                        <span>Add UPI</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* bank mode */}
            <div className=" px-3 border border-gray-700 rounded mb-4">
              <div className="flex items-center">
                <input
                  id="radio-2"
                  type="radio"
                  value="BANK"
                  name="payment-mode"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  onChange={radioHandle}
                />
                <label
                  htmlFor="radio-2"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                >
                  BANK
                </label>
              </div>
              {radio.bank && (
                <div>
                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-500"></hr>
                  {isBank &&
                    bankData.map((val, i) => {
                      return (
                        <div key={i} className="flex justify-between p-1 mt-1">
                          <span className="font-semibold">
                            {Object.keys(val)[0]}
                          </span>
                          <span className="text-sm">{Object.values(val)[0]}</span>
                        </div>
                      );
                    })}
                    
                  {!isBank && (
                    <div className="flex justify-end items-center gap-5 my-2">
                      <span className="text-sm">{bankData}</span>
                      <Link
                        href={"./mybank/bankdetailsform"}
                        className="duration-200 ease inline-flex items-center m-1 transition py-2 px-5 rounded text-white bg-blue-500 hover:bg-blue-600 text-sm"
                      >
                        <span>Add Bank</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={(e) => onClickWithdraw(e)}
              className="duration-200 ease inline-flex items-center m-1 transition py-2 px-5 rounded-full text-white bg-green-500 hover:bg-green-600 text-sm"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Payment Request */}
        <div className="rounded-lg p-2 bg-gray-50 m-1 shadow-lg mt-3">
          <div className="text-blue-500 text-center font-semibold text-lg">
            Payment Request
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-500"></hr>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isReq && <tr>
                  <td colSpan={3}>
                <div className="text-center">{requestData.msg}</div>
                </td>
                  </tr>}
                {isReq && requestData &&
                  requestData.map((val, i) => {
                    return (
                      <tr key={i} className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          ₹ {val.requested_payment} 
                        </th>
                        <td className="px-6 py-4">{val.payment_mode}</td>
                        <td className="px-6 py-4 ">
                          <span
                            className={`${
                              val.payment_status == "Complete"
                                ? " bg-blue-400 "
                                : " bg-orange-400 "
                            }text-white px-2 py-1 rounded-xl`}
                          >
                            {val.payment_status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
