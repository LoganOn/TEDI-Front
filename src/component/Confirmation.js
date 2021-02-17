import React from 'react';
import Modal from 'react-responsive-modal';
import '../css/Confiramtion.scss';


const modalDefaultStyle = {
    modal:
        {
            borderRadius: '12px',
            // fontFamily: "Poppins",
        }
}

const Conrifmation = (props) => {

    return (
        <Modal
            animationDuration={50}
            showCloseIcon={false}
            styles={modalDefaultStyle}
            open={props.isModalOpen}
            onClose={props.closeModel}
            center>
            <div className="confirmatory--modal">
                <p>Czy na pewno chcesz usunąć ?</p>
                <div>
                    <button className="confirmation__Yes" onClick={props.deleteRelation} >Tak</button>
                    <button className="confirmation__No" onClick={props.closeModel}>Nie</button>
                </div>

            </div>

        </Modal>
    );
};

export default Conrifmation;
