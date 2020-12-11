import React, { useState, useEffect } from "react";
import "./InvoiceBasicInfo.scss";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { invoicesData } from "../features/invoiceSlice";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { navbar } from "../features/navbarSlice";

const InputFields = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter CompanyName",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter EmailId",
  },
  {
    label: "Address",
    type: "text",
    placeholder: "Enter Registered Address",
  },
  {
    label: "Phone",
    type: "number",
    placeholder: "Enter Registered Num",
  },
];

let tax = 0;
let discount = 0;
let unitPrice = 0;
let quantity = 1;

function InvoiceBasicInfo(props) {
  const dispatch = useDispatch();
  const navDispatch = useDispatch();
  const [values, setValues] = useState({
    senderName: "",
    senderEmail: "",
    senderAddress: "",
    senderPhone: "",
    recName: "",
    recEmail: "",
    recAddress: "",
    recPhone: "",
    date: "",
    dueDate: "",
    amount: "",
    totalAmount: "",
    tax: "",
    discount: "",
    itemName: "",
    itemDesc: "",
    quantity: "",
    unitPrice: "",
  });
  const [data, setData] = useState([{}]);
  const [amt, setAmt] = useState(0);
  const [amtColl, setamtColl] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [amtPaid, setAmtPaid] = useState(0);

  useEffect(() => {
    navDispatch(navbar(false));
  });

  const onchangeHandler = (e, type) => {
    if (
      type === "tax" ||
      type === "discount" ||
      type === "itemName" ||
      type === "itemDesc" ||
      type === "quantity" ||
      type === "unitPrice"
    ) {
      if (
        values.senderName &&
        values.senderEmail &&
        values.senderAddress &&
        values.senderPhone &&
        values.recName &&
        values.recEmail &&
        values.recAddress &&
        values.recPhone &&
        values.date &&
        values.dueDate
      ) {
        setValues({ ...values, [type]: e.target.value });
      } else {
        setValues({
          ...values,
          tax: "",
          discount: "",
          itemName: "",
          itemDesc: "",
          quantity: "",
          unitPrice: "",
        });
        alert("Please Enter Crendentials first");
      }
    } else {
      setValues({ ...values, [type]: e.target.value });
    }
    if (type === "amountPaid") {
      setAmtPaid(e.target.value);
    }
    if (
      type === "tax" ||
      type === "discount" ||
      type === "quantity" ||
      type === "unitPrice"
    ) {
      switch (type) {
        case "tax":
          tax = e.target.value;
          break;
        case "discount":
          discount = e.target.value;
          break;
        case "quantity":
          quantity = e.target.value;
          break;
        default:
          unitPrice = e.target.value;
      }
      let calcDiscount = (unitPrice * quantity * discount) / 100;
      let calcTax = ((unitPrice * quantity - calcDiscount) * tax) / 100;
      setAmt(unitPrice * quantity - calcDiscount + calcTax);
    }
  };

  const addItemHandler = (type) => {
    let invoiceData = JSON.parse(JSON.stringify(data));
    let amtCollection = [...amtColl];
    amtCollection.push(amt);
    setamtColl(amtCollection);

    setSubTotal(amtCollection.reduce((total, num) => total + num, 0));
    let subTotal = amtCollection.reduce((total, num) => total + num, 0);

    setBalanceDue(Math.round(subTotal - amtPaid));
    let obj = {
      senderName: values.senderName,
      senderEmail: values.senderEmail,
      senderAddress: values.senderAddress,
      senderPhone: values.senderPhone,
      recName: values.recName,
      recEmail: values.recEmail,
      recAddress: values.recAddress,
      recPhone: values.recPhone,
      date: values.date,
      dueDate: values.dueDate,
      amount: Math.round(amt),
      tax: values.tax,
      discount: values.discount,
      itemName: values.itemName,
      itemDesc: values.itemDesc,
      quantity: values.quantity,
      unitPrice: values.unitPrice,
      balanceDue: Math.round(subTotal - amtPaid),
      subTotal: subTotal,
      amountPaid: amtPaid,
    };
    invoiceData.push(obj);
    setValues({
      ...values,
      tax: "",
      discount: "",
      itemName: "",
      itemDesc: "",
      quantity: "",
      unitPrice: "",
    });

    setData(invoiceData);
    setAmt(0);
    tax = 0;
    discount = 0;
    quantity = 1;
    unitPrice = 0;
    if (type === "save") {
      invoiceData.shift();
      dispatch(invoicesData(JSON.parse(JSON.stringify(invoiceData))));
      props.history.push("/invoice");
    }
    console.log(balanceDue);
  };

  return (
    <div className="invoicebasicinfo ">
      <div className="userInfopage shadow-lg ">
        <div className="invoiceheading container">
          <h2
            className="ml-2"
            style={{
              display: "inline",
              fontSize: "40px",
            }}
          >
            Invoice
          </h2>
        </div>
        <div className="container">
          <div className="invoiceDetails mb-4">
            <span>
              <strong>From</strong>
            </span>
            <span className="ml-3">
              <strong>Bill To</strong>
            </span>
          </div>
          <div className="row">
            <div className="col-md-6">
              {InputFields.map((data, index) => (
                <div key={index} className="row mt-2">
                  <div className="col-md-3 pr-0 inputlabels">
                    <label>{data.label}</label>
                  </div>
                  <div className="col-md-9 pl-0 inputbox">
                    <input
                      type={data.type}
                      className="form-control"
                      placeholder={data.placeholder}
                      onChange={(e) =>
                        onchangeHandler(e, `sender${data.label}`)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-md-6 "
              style={{ borderLeft: "1px solid lightgrey" }}
            >
              {InputFields.map((data, index) => (
                <div key={index} className="row mt-2">
                  <div className="col-md-3 pr-0 inputlabels">
                    <label>{data.label}</label>
                  </div>
                  <div className="col-md-9 pl-0 inputbox">
                    <input
                      type={data.type}
                      className="form-control"
                      placeholder={data.placeholder}
                      onChange={(e) => onchangeHandler(e, `rec${data.label}`)}
                    />
                  </div>
                </div>
              ))}
              <div className="row mt-3">
                <div className="col-md-3 pr-0 inputlabels">
                  <label>Date</label>
                </div>
                <div className="col-md-9 pl-0 inputbox">
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="yyyy-mm-dd"
                    className="datepicker"
                    onChange={(e) => onchangeHandler(e, "date")}
                  />
                </div>
                <div className="col-md-3 mt-3 pr-0 inputlabels">
                  <label>Due Date</label>
                </div>
                <div className="col-md-9 mt-3 pl-0 inputbox">
                  <TextField
                    id="duedate"
                    type="date"
                    defaultValue="yyyy-mm-dd"
                    className="datepicker"
                    onChange={(e) => onchangeHandler(e, "dueDate")}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <hr className="mt-5" /> */}
          <div className="invoice_items mt-5">
            <div className="invoiceitems_heading">
              <div className="pl-2">
                <span>Sno.</span>
              </div>
              <div>
                <span>Items</span>
              </div>
              <div>
                <span>Quantity</span>
              </div>
              <div>
                <span>Unit Price</span>
              </div>
              <div>
                <span>Discount</span>
              </div>
              <div>
                <span>Tax</span>
              </div>
              <div>
                <span>Amount</span>
              </div>
            </div>
            <div className="mt-3">
              {data.map((data, index) => (
                <div key={index} className="invoiceitem mt-2">
                  <div>
                    <span>{index + 1}.</span>
                  </div>
                  <div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        onChange={(e) => onchangeHandler(e, "itemName")}
                      />
                    </div>
                    <div className="mt-1">
                      <textarea
                        className="form-control"
                        placeholder="Product Description ...."
                        rows="2"
                        onChange={(e) => onchangeHandler(e, "itemDesc")}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quan"
                      onChange={(e) => onchangeHandler(e, "quantity")}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="U.P"
                      onChange={(e) => onchangeHandler(e, "unitPrice")}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Dis %"
                      onChange={(e) => onchangeHandler(e, "discount")}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Tax %"
                      onChange={(e) => onchangeHandler(e, "tax")}
                    />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "14px" }} className="mt-5">
                      ₹{amtColl[index] ? Math.round(amtColl[index]) : null}
                    </span>
                  </div>
                  <div className="remove_btn">
                    <span>X</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="addnewItem mt-2">
              <button
                className="btn btn-primary"
                disabled={
                  !(values.itemName && values.quantity && values.unitPrice)
                }
                onClick={addItemHandler}
              >
                <AddIcon />
                Add new Item
              </button>

              <div className="invoice_footer mt-5">
                <div className="invoice_note">
                  <p className="m-0">Notes</p>
                  <textarea
                    className="form-control"
                    placeholder="Any relvenat Info Not covered"
                    // placeholder="Product Description ...."
                    rows="2"
                  ></textarea>
                </div>
                <div className="invoice_calc container">
                  <div className="ml-5">
                    <p className="mb-2 ml-5">
                      <strong>SubTotal</strong> ₹ {Math.round(subTotal)}
                    </p>
                    <div
                      className="ml-5"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span className="mr-4">
                        <strong>Amount Paid:</strong>
                      </span>
                      <span style={{ width: "30%" }}>
                        <input
                          onChange={(e) => onchangeHandler(e, "amountPaid")}
                          // className="amount_paid"
                          type="number"
                          className="form-control"
                        />
                      </span>
                    </div>
                    <p className="mt-2 ml-5">
                      {/* {balanceDue} */}
                      <strong>Balance Due:</strong> ₹{" "}
                      {Math.round(subTotal - amtPaid)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3">
            <button
              disabled={
                !(
                  values.senderName &&
                  values.senderEmail &&
                  values.senderPhone &&
                  data.length > 0
                )
              }
              className="btn btn-primary"
              onClick={() => addItemHandler("save")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(InvoiceBasicInfo);
