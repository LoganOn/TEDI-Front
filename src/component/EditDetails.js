import React, {useEffect, useState} from 'react';
import Modal from 'react-responsive-modal';
import '../css/Confiramtion.scss';


const modalDefaultStyle = {
    modal:
        {
            borderRadius: '12px',
            // fontFamily: "Poppins",
        }
}

const EditDetails = (props) => {

    const [name, setName] = useState(props.name)
    const [barCode, setBarCode] = useState(props.barCode)
    const [valueNet, setValueNet] = useState(props.valueNet)

    React.useEffect(() => {
        if(props.name ){
            setName(props.name);
            setValueNet(props.valueNet);
            setBarCode(props.barCode);
        }
        // console.log(name)
        // console.log(barCode)
        // console.log(valueNet)
    }, [name, barCode, valueNet])
    return (
        <Modal
            animationDuration={50}
            showCloseIcon={false}
            styles={modalDefaultStyle}
            open={props.isModalOpen}
            onClose={props.closeModel}
            center>
            <div className="confirmatory--modal">
                <form>
                    <div>
                        <label>Nazwa</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div><
                        label>EAN</label>
                        <input value={barCode} onChange={(e) => setBarCode(e.target.value)}/>
                    </div>
                    <div>
                        <label>Cena netto</label>
                        <input value={valueNet} onChange={(e) => setValueNet(e.target.value)}/>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
export default EditDetails;
