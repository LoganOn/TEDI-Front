import React, {useEffect, useState} from 'react';
import Modal from 'react-responsive-modal';
import '../css/EditItems.css';
import axios from "axios";


const modalDefaultStyle = {
    modal:
        {
            borderRadius: '12px',
        }
}

const EditItems = (props) => {

    const [id, setId] = useState(props.id)
    const [itemName, setItemName] = useState(props.itemName)
    const [itemCode, setItemCode] = useState(props.itemCode)
    const [codeBars, setCodeBars] = useState(props.codeBars)
    const [price, setPrice] = useState(props.price)
    const [currency, setCurrency] = useState(props.currency)
    const [discountPrcnt, setDiscountPrcnt] = useState(props.discountPrcnt)
    const [vatPrcnt, setVatPrcnt] = useState(props.vatPrcnt)
    const [onTheWay, setOnTheWay] = useState(props.onTheWay)
    const [availability, setAvailability] = useState(props.availability)
    const [refresh, setRefresh] = useState(props.refreshDetails)
    const [scheduledShipDate, setScheduledShipDate] = useState(props.scheduledShipDate)

    React.useEffect(() => {
        if (props.itemName) {
            setId(props.id)
            setItemName(props.itemName);
            setItemCode(props.itemCode);
            setCodeBars(props.codeBars);
            setPrice(props.price);
            setCurrency(props.currency);
            setDiscountPrcnt(props.discountPrcnt);
            setVatPrcnt(props.vatPrcnt);
            setOnTheWay(props.onTheWay ? "W drodze" : "Nie wysłany");
            setScheduledShipDate(props.scheduledShipDate);
        }
    }, [props.itemName])

    const submit = () => {
        axios
            .patch(`http://localhost:8080/api/items/${id}`,
                {
                    itemName,
                    codeBars,
                    itemCode,
                    price:Number(price),
                    currency,
                    discountPrcnt,
                    vatPrcnt:Number(vatPrcnt),
                    // onTheWay,
                    availability,
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
            <div className="grid-container-items">
                <label className="grid-rows-items">Indeks</label>
                <input className="grid-rows-items-input" value={itemCode}
                       onChange={(e) => setItemCode(e.target.value)}/>
                <label className="grid-rows-items">Nazwa</label>
                <input className="grid-rows-items-input" value={itemName}
                       onChange={(e) => setItemName(e.target.value)}/>
                <label className="grid-rows-items">EAN</label>
                <input className="grid-rows-items-input" value={codeBars}
                       onChange={(e) => setCodeBars(e.target.value)}/>
                <label className="grid-rows-items">Cena</label>
                <input className="grid-rows-items-input" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label className="grid-rows-items">Waluta</label>
                <input className="grid-rows-items-input" value={currency}
                       onChange={(e) => setCurrency(e.target.value)}/>
                <label className="grid-rows-items">Vat</label>
                <input className="grid-rows-items-input" value={vatPrcnt}
                       onChange={(e) => setVatPrcnt(e.target.value)}/>
                {/*<label className="grid-rows-items">Rabat</label>*/}
                {/*<input className="grid-rows-items-input" value={discountPrcnt}*/}
                {/*       onChange={(e) => setDiscountPrcnt(e.target.value)}/>*/}
                <label className="grid-rows-items">Czas dostawy</label>
                <input className="grid-rows-items-input" value={availability}
                       onChange={(e) => setAvailability(e.target.value)}/>
                <button className="grid-rows-items-button-add" onClick={submit}>Zapisz</button>
                <button className="grid-rows-items-button-cancel" onClick={props.closeModel}>Anuluj</button>
            </div>
        </Modal>
    );
};
export default EditItems;
