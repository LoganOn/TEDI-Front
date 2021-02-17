import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from 'moment';
import EditDetails from "./EditDetails";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

Row.propTypes = {
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

function Row(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState([]);
    const classes = useRowStyles();
    const [name, setName] = useState()
    const [barCode, setBarCode] = useState()
    const [valueNet, setValueNet] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShow = () => {
        if (!open) {
            axios
                .get(`http://localhost:8080/api/details/${row.deliveryOrderId}`)
                .then((response) => {
                    // console.log(response.data)
                    setDetails(response.data)
                })
        }
        setOpen(!open)
    }

    //TODO do poprawy valuenet
    const edit = (detail) =>{
        setName(detail.itemName);
        setBarCode(detail.codeBars);
        setValueNet(detail.price);
        setIsModalOpen(true);
        console.log(detail.itemName)
    }

    const closeModel = () => {
        setIsModalOpen(false)
    }
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleShow()}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {Moment(row.creationDate).format('DD-MM-YYYY hh:mm:ss')}
                </TableCell>
                <TableCell
                    align="left">{localStorage.getItem("role") == "customer" ? row.supplier : row.customer}</TableCell>
                <TableCell align="left">{row.baseRef}</TableCell>
                <TableCell align="left">{row.numberOrderCustomer}</TableCell>
                <TableCell align="right">{row.docNet}</TableCell>
                <TableCell align="right">{row.docVatSum}</TableCell>
                <TableCell align="right">{row.docTotal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Szczegóły
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Powiadomienie</TableCell>
                                        <TableCell>Nr&nbsp;kat</TableCell>
                                        <TableCell align="right">Nazwa</TableCell>
                                        <TableCell align="right">EAN</TableCell>
                                        <TableCell align="right">Cena netto</TableCell>
                                        <TableCell align="right">Waluta</TableCell>
                                        <TableCell align="right">Ilość</TableCell>
                                        <TableCell align="right">Vat %</TableCell>
                                        <TableCell align="right">Rabat</TableCell>
                                        <TableCell align="right">Czas&nbsp;dostawy</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell>Data modyfikacji</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {details && details.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell align="center"> <input type="checkbox"/></TableCell>
                                            <TableCell align="right">{historyRow.itemCode}</TableCell>
                                            <TableCell align="right">{historyRow.itemName}</TableCell>
                                            <TableCell align="right">{historyRow.codeBars}</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="right">{historyRow.currency}</TableCell>
                                            <TableCell align="right">{historyRow.quantity}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {Moment(historyRow.modifyDate).format('DD-MM-YYYY hh:mm:ss')}
                                            </TableCell>
                                            <TableCell align="center"> <button onClick={() => edit(historyRow)}>Edit </button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <EditDetails
            name = {name}
            barCode = {barCode}
            valueNet = {valueNet}
            isModalOpen={isModalOpen}
            closeModel={closeModel}
            />
        </React.Fragment>
    );
}

export default Row