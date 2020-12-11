import React, { useEffect, useState } from "react";
import { selectId } from "../features/previewSilce";
import { useSelector, useDispatch } from "react-redux";
import db from "../firebase";
import { navbar } from "../features/navbarSlice";

function Preview() {
  const invoiceId = useSelector(selectId);
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    var docRef = db.collection("invoices").doc(invoiceId);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setInvoice(doc.data().invoice);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    dispatch(navbar(false));
  }, [invoiceId, dispatch]);
  return (
    <div className="invoiceCopy">
      {invoice.length > 0 ? (
        <div className="invoiceCopy_container shadow-lg ">
          <div className="invoiceCopy_header container  ">
            <div style={{ textAlign: "left" }} className="pt-3">
              <p style={{ textTransform: "capitalize" }}>
                <strong>{invoice[0].senderName}</strong>
              </p>
              <p>{invoice[0].senderEmail}</p>
              <p>{invoice[0].senderAddress}</p>
              <p>{invoice[0].senderPhone}</p>
            </div>
            <div style={{ textAlign: "right" }} className="pt-3">
              <p style={{ textTransform: "capitalize" }}>
                <strong>{invoice[0].recName}</strong>
              </p>
              <p>{invoice[0].recEmail}</p>
              <p>{invoice[0].recAddress}</p>
              <p>{invoice[0].recPhone}</p>
              <p>
                <strong>Date : </strong>
                {invoice[0].date}
              </p>
              <p>
                <strong>DueDate :</strong> {invoice[0].dueDate}
              </p>
            </div>
          </div>
          <div>
            <table className=" table  container mt-5 mb-0">
              <thead>
                <th>S.no</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>UnitPrice</th>
                <th>Discount</th>
                <th>Tax</th>
                <th>Amount</th>
              </thead>
              <tbody>
                {invoice.map((data, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: "1px solid lightgrey" }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <p>{data.itemName}</p>
                      <p>{data.itemDesc}</p>
                    </td>
                    <td>{data.quantity}</td>
                    <td>{data.unitPrice}</td>
                    <td>{data.discount}</td>
                    <td>{data.tax}</td>
                    <td>{data.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-4  invoice_total row">
              <div
                style={{ textALign: "left" }}
                className="col-md-8 offset-md-4"
              >
                <p
                  className="row py-2"
                  style={{ borderBottom: "1px solid lightgrey" }}
                >
                  <span className="col-md-7 ">
                    <strong>Sub Total: </strong>
                  </span>
                  <span style={{ textAlign: "right" }} className="col-md-5">
                    ₹ {Math.round(invoice[0].subTotal)}
                  </span>
                </p>
                <p
                  className="row py-2"
                  style={{ borderBottom: "1px solid lightgrey" }}
                >
                  <span className="col-md-8">
                    <strong>Amount Paid: </strong>
                  </span>
                  <span style={{ textAlign: "right" }} className="col-md-4">
                    ₹ {invoice[0].amountPaid}
                  </span>
                </p>
                <p
                  className="row py-2"
                  style={{ borderBottom: "1px dashed lightgrey" }}
                >
                  <span className="col-md-7">
                    <strong>Balance Due: </strong>
                  </span>
                  <span style={{ textAlign: "right" }} className="col-md-5">
                    {" "}
                    ₹ {invoice[0].balanceDue}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Preview;
