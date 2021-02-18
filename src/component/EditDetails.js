import React, {useEffect, useState} from 'react';
import Modal from 'react-responsive-modal';
import '../css/EditDetails.css';
import axios from "axios";


const modalDefaultStyle = {
    modal:
        {
            borderRadius: '12px',
        }
}

const EditDetails = (props) => {

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
            console.log(typeof lineNet)
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
            <div className="grid-container-details">
                <label className="grid-rows-details">Indeks</label>
                <input className="grid-rows-details-input" value={itemCode}
                       onChange={(e) => setItemCode(e.target.value)}/>
                <label className="grid-rows-details">Nazwa</label>
                <input className="grid-rows-details-input" value={itemName}
                       onChange={(e) => setItemName(e.target.value)}/>
                <label className="grid-rows-details">EAN</label>
                <input className="grid-rows-details-input" value={codeBars}
                       onChange={(e) => setCodeBars(e.target.value)}/>
                <label className="grid-rows-details">Ilość</label>
                <input className="grid-rows-details-input" value={quantity}
                       onChange={(e) => setQuantity(e.target.value)}/>
                <label className="grid-rows-details">Cena</label>
                <input className="grid-rows-details-input" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label className="grid-rows-details">Waluta</label>
                <input className="grid-rows-details-input" value={currency}
                       onChange={(e) => setCurrency(e.target.value)}/>
                <label className="grid-rows-details">Wartość</label>
                <input className="grid-rows-details-input" value={lineTotal}
                       onChange={(e) => setLineTotal(e.target.value)}/>
                <label className="grid-rows-details">Wartość netto</label>
                <input className="grid-rows-details-input" value={lineNet}
                       onChange={(e) => setLineNet(e.target.value)}/>
                <label className="grid-rows-details">Wartość Vat</label>
                <input className="grid-rows-details-input" value={lineVat}
                       onChange={(e) => setLineVat(e.target.value)}/>
                <label className="grid-rows-details">Vat</label>
                <input className="grid-rows-details-input" value={vatPrcnt}
                       onChange={(e) => setVatPrcnt(e.target.value)}/>
                <label className="grid-rows-details">Rabat</label>
                <input className="grid-rows-details-input" value={discountPrcnt}
                       onChange={(e) => setDiscountPrcnt(e.target.value)}/>
                <label className="grid-rows-details">Czas dostawy</label>
                <input className="grid-rows-details-input" value={scheduledShipDate}
                       onChange={(e) => setScheduledShipDate(e.target.value)}/>
                <label className="grid-rows-details">Status</label>
                <input className="grid-rows-details-input" value={onTheWay}
                       onChange={(e) => setOnTheWay(e.target.value)}/>
                <button className="grid-rows-details" onClick={submit}>Zapisz</button>
                <button className="grid-rows-details" onClick={props.closeModel}>Anuluj</button>
            </div>
        </Modal>
    );
};
export default EditDetails;
