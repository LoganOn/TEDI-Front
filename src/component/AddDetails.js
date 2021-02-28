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

const AddDetails = (props) => {

    const [id, setId] = useState(props.id)
    const [itemName, setItemName] = useState('')
    const [itemCode, setItemCode] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [codeBars, setCodeBars] = useState('')
    const [lineNet, setLineNet] = useState(0)
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState()
    const [lineTotal, setLineTotal] = useState(0)
    const [lineVat, setLineVat] = useState(0)
    const [discountPrcnt, setDiscountPrcnt] = useState('')
    const [vatPrcnt, setVatPrcnt] = useState(0)
    const [onTheWay, setOnTheWay] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [scheduledShipDate, setScheduledShipDate] = useState('')

    React.useEffect(() => {
        // if (props.itemName) {
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
        // }
    }, [props.itemName])

    const submit = () => {
        axios
            .post(`http://localhost:8080/api/details`,
                {
                    deliverOrderID: id,
                    detailsDeliveryOrders:[{
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
                    }]
                })
            .then((response) => {
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
                <button className="grid-rows-details-button-add" onClick={submit}>Zapisz</button>
                <button className="grid-rows-details-button-cancel" onClick={props.closeModel}>Anuluj</button>
            </div>
        </Modal>
    );
};
export default AddDetails;
