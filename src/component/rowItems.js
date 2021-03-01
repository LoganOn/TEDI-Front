import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import '../css/Relation.css'
import Confirmation from "./Confirmation";
import EditItems from "./EditItems";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

RowItems.propTypes = {
    row: PropTypes.shape({
        supplier: PropTypes.number.isRequired,
        baseRef: PropTypes.number.isRequired,
        numberOrderCustomer: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        date: PropTypes.string.isRequired,
        docNet: PropTypes.number.isRequired,
        docVatSum: PropTypes.number.isRequired,
        docTotal: PropTypes.number.isRequired,
    }).isRequired,
};


function RowItems(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [details, setDetails] = React.useState([]);
    const [text, setText] = React.useState(props.text);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpen1, setIsModalOpen1] = React.useState(false);
    const [itemName, setItemName] = useState()
    const [itemCode, setItemCode] = useState()
    const [codeBars, setCodeBars] = useState()
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState()
    const [vatPrcnt, setVatPrcnt] = useState()
    const [availability, setAvailability] = useState()

    const classes = useRowStyles();

    const closeModel = () => {
        setIsModalOpen(false)
    }

    const closeModel1 = () => {
        setIsModalOpen1(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const edit = (row) => {
        setItemCode(row.itemCode);
        setItemName(row.itemName);
        setCodeBars(row.codeBars);
        setPrice(row.price);
        setCurrency(row.currency);
        setVatPrcnt(row.vatPrcnt);
        setAvailability(row.availability);
        setIsModalOpen1(true);
    }

    const deleteRelation = () => {
        axios
            .delete(`http://localhost:8080/api/items/${row.itemId}`)
            .then((response) => {
                setDetails(response.data)
                props.text(!text)
            })
    }

    React.useEffect(() => {
    }, [isModalOpen])
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                {/*<TableCell component="th" scope="row">*/}
                {/*    {Moment(row.creationDate).format('DD-MM-YYYY hh:mm:ss')}*/}
                {/*</TableCell>*/}
                <TableCell align="center">{row.itemCode}</TableCell>
                <TableCell align="center">{row.itemName}</TableCell>
                <TableCell align="center">{row.codeBars}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.currency}</TableCell>
                <TableCell align="center">{row.vatPrcnt}</TableCell>
                <TableCell align="center">{row.availability}</TableCell>
                {/*<TableCell align="center">{row.active}</TableCell>*/}
                <TableCell align="center">
                    <button className="details-container-buttons-row-edit"  onClick={() => edit(row)}>Edytuj</button>
                    <button className="details-container-buttons-row-delete" onClick={openModal}>Usuń</button>
                    {/*<Switch onClick={toggler}></Switch>*/}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Confirmation
                isModalOpen={isModalOpen}
                deleteRelation={deleteRelation}
                closeModel={closeModel}
            >
            </Confirmation>
            <EditItems
                id={row.itemId}
                itemCode={itemCode}
                itemName={itemName}
                codeBars={codeBars}
                price={price}
                currency={currency}
                vatPrcnt={vatPrcnt}
                availability={availability}
                // refreshDetails={refreshDetails}
                // refreshDetails={(refresh) => setRefresh(refresh)}
                isModalOpen={isModalOpen1}
                closeModel={closeModel1}
                />
        </React.Fragment>
    );
}

export default RowItems