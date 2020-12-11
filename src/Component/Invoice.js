import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import "./Invoice.scss";
import { withRouter } from "react-router-dom";
import db from "../firebase";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
// import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import { id } from "../features/previewSilce";
import { useDispatch } from "react-redux";
import { navbar } from "../features/navbarSlice";

function Invoice(props) {
  const dispatch = useDispatch();
  const navDispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("invoices").onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    navDispatch(navbar(true));
  }, [navDispatch]);

  const deleteInvoiceHandler = (id) => {
    db.collection("invoices")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const selectPreviewHandler = (invoiceid) => {
    dispatch(id(invoiceid));
    props.history.push("/preview");
  };

  const dueDateHandler = (dueDate) => {
    let date = new Date(dueDate);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = date.getMonth().toString();
    let duedate = date.getDate().toString();
    let year = date.getFullYear().toString();
    let fullyear = duedate + " " + months[month] + " " + year;
    return fullyear;
  };

  return (
    <div className="invoice container ">
      <div
        className="shadow invoice_new"
        onClick={() => props.history.push("/basicInfo")}
      >
        <AddIcon
          // style={{ width: "100%", height: "100%" }}
          className="newinvoice"
        />
        <span className="newinvoice_text">Create New Invoice</span>
      </div>
      {data.map((inv, index) => (
        <div key={index} className="container shadow">
          <div className="content">
            <div className="content-overlay"></div>
            <h3 className="recName">{inv.data.invoice[0].recName}</h3>
            <h2>
              <strong>{dueDateHandler(inv.data.invoice[0].dueDate)}</strong>
            </h2>
            <div className="content-details fadeIn-top">
              <div>
                <Tooltip title="Preview">
                  <VisibilityIcon
                    className="invoice_option"
                    onClick={() => selectPreviewHandler(inv.id)}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteIcon
                    className="invoice_option"
                    onClick={() => deleteInvoiceHandler(inv.id)}
                  />
                </Tooltip>
                {/* <Tooltip title="Download">
                  <GetAppIcon className="invoice_option" />
                </Tooltip> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withRouter(Invoice);
