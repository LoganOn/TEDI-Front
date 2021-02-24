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
    const [itemName, setItemName] = useState(props.itemName)
    const [itemCode, setItemCode] = useState(props.itemCode)
    const [quantity, setQuantity] = useState(props.quantity)
    const [codeBars, setCodeBars] = useState(props.codeBars)
    const [lineNet, setLineNet] = useState(props.lineNet)
    const [price, setPrice] = useState(props.price)
    const [currency, setCurrency] = useState(props.currency)
    const [lineTotal, setLineTotal] = useState(props.lineTotal)
    const [lineVat, setLineVat] = useState(props.lineVat)
    const [discountPrcnt, setDiscountPrcnt] = useState(props.discountPrcnt)
    const [vatPrcnt, setVatPrcnt] = useState(props.vatPrcnt)
    const [onTheWay, setOnTheWay] = useState(props.onTheWay)
    const [refresh, setRefresh] = useState(props.refreshDetails)
    const [scheduledShipDate, setScheduledShipDate] = useState(props.scheduledShipDate)

    React.useEffect(() => {
        if (props.itemName) {
            setId(props.id)
            setItemName(props.itemName);
            setItemCode(props.itemCode);
            setQuantity(props.quantity);
            setCodeBars(props.codeBars);
            setLineNet(props.lineNet);
            setPrice(props.price);
            setCurrency(props.currency);
            setLineTotal(props.lineTotal);
            setLineVat(props.lineVat);
            setDiscountPrcnt(props.discountPrcnt);
            setVatPrcnt(props.vatPrcnt);
            setOnTheWay(props.onTheWay ? "W drodze" : "Nie wysłany");
            setScheduledShipDate(props.scheduledShipDate);
        }
    }, [props.itemName])

    const submit = () => {
        axios
            .patch(`http://localhost:8080/api/details/${id}`,
                {
                    itemName,
                    codeBars,
                    lineNet:Number (lineNet),
                    itemCode,
                    quantity:Number(quantity),
                    price:Number(price),
                    currency,
                    lineTotal:Number(lineTotal),
                    lineVat:Number(lineVat),
                    discountPrcnt,
                    vatPrcnt:Number(vatPrcnt),
                    // onTheWay,
                    scheduledShipDate,
                })
            .then((response) => {
                props.closeModel()
                props.refreshDetails(true)
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
                       onChange={(e) => setItemCode(e.target.value)}/>
                <label className="grid-rows-order">Numer zamówienia</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setItemName(e.target.value)}/>
                <label className="grid-rows-order">Numer klienta</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setCodeBars(e.target.value)}/>
                <label className="grid-rows-order">Wartość</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setQuantity(e.target.value)}/>
                <label className="grid-rows-order">Wartość netto</label>
                <input className="grid-rows-order-input"
                       onChange={(e) => setLineNet(e.target.value)}/>
                <label className="grid-rows-order">Wartość Vat</label>
                <input className="grid-rows-order-input" value={lineVat}
                       onChange={(e) => setLineVat(e.target.value)}/>
                <label className="grid-rows-order">Opis</label>
                <textarea className="grid-rows-order-input"
                       onChange={(e) => setOnTheWay(e.target.value)}/>
                <button className="grid-rows-order-button-add" onClick={submit}>Zapisz</button>
                <button className="grid-rows-order-button-cancel" onClick={props.closeModel}>Anuluj</button>
            </div>
        </Modal>
    );
};
export default AddOrder;
