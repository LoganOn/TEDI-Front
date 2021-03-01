import React, {useEffect, useState} from 'react';
import Modal from 'react-responsive-modal';
import '../css/AddOrder.css';
import axios from "axios";


const modalDefaultStyle = {
    modal:
        {
            borderRadius: '12px',
        }
}

const AddOrder = (props) => {

    const [id, setId] = useState(props.id)
    const [deliverOrderID, setDeliverOrderID] = useState(10)
    const [detailsDeliveryOrders, setDetailsDeliveryOrders] = useState([])
    const [baseRef, setBaseRef] = useState()
    const [numberOrderCustomer, setNumberOrderCustomer] = useState()
    const [supplierId, setSupplierId] = useState()
    const [customerId, setCustomerId] = useState()
    const [docTotal, setDocTotal] = useState()
    const [docNet, setDocNet] = useState()
    const [docVatSum, setDocVatSum] = useState()
    const [lineVat, setLineVat] = useState()
    const [description, setDescription] = useState()
    const [refresh, setRefresh] = useState(props.refreshDetails)
    const [isModalOpen, setIsModalOpen] = useState(false);

    React.useEffect(() => {
        if (props.itemName) {
            // deliverOrderID,
            // detailsDeliveryOrders:{
            //     setId(props.id)
            //     setItemName(props.itemName);
            //     setItemCode(props.itemCode);
            //     setQuantity(props.quantity);
            //     setCodeBars(props.codeBars);
            //     setLineNet(props.lineNet);
            //     setPrice(props.price);
            //     setCurrency(props.currency);
            //     setLineTotal(props.lineTotal);
            //     setLineVat(props.lineVat);
            //     setDiscountPrcnt(props.discountPrcnt);
            //     setVatPrcnt(props.vatPrcnt);
            //     setOnTheWay(props.onTheWay ? "W drodze" : "Nie wysłany");
            //     setScheduledShipDate(props.scheduledShipDate);
            }
        // }
    }, [props.itemName])


    const submit = () => {
        // setSupplierId()

        axios
            .post(`http://localhost:8080/api/delivery`,
                {
                    baseRef,
                    numberOrderCustomer,
                    "docStatus": "C",
                    "supplier": {
                        "userId": localStorage.getItem("userId")
                    },
                    "customer": {
                        "userId": customerId
                    },
                    docTotal,
                    docNet,
                    docVatSum,
                    description,
                    "detailsDeliveryOrdersList": [
                    ]

                })
            .then((response) => {
              // closeModel()
                 props.closeModel()
                 // props.refreshDetails(true)
            })
    }
    return (
        <Modal
            animationDuration={50}
            showCloseIcon={false}
            styles={modalDefaultStyle}
            open={props.isModalOpen}
            onClose={props.closeModel}
            center>
            <div className="grid-container-order">
                <label className="grid-rows-order">Klient</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setCustomerId(e.target.value)}/>
                <label className="grid-rows-order">Numer zamówienia</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setBaseRef(e.target.value)}/>
                <label className="grid-rows-order">Numer klienta</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setNumberOrderCustomer(e.target.value)}/>
                <label className="grid-rows-order">Wartość</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setDocTotal(e.target.value)}/>
                <label className="grid-rows-order">Wartość netto</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setDocNet(e.target.value)}/>
                <label className="grid-rows-order">Wartość Vat</label>
                <input className="grid-rows-order-input" value={lineVat}
                       onChange={(e) => setDocVatSum(e.target.value)}/>
                <label className="grid-rows-order">Opis</label>
                <textarea className="grid-rows-order-input"
                       onChange={(e) => setDescription(e.target.value)}/>
                <button className="grid-rows-order-button-add" onClick={submit}>Zapisz</button>
                <button className="grid-rows-order-button-cancel" onClick={props.closeModel}>Anuluj</button>
            </div>
        </Modal>
    );
};
export default AddOrder;
