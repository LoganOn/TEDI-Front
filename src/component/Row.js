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
import ShowMoreText from 'react-show-more-text';
import '../css/Tab.css'

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
    const [itemName, setItemName] = useState()
    const [id, setId] = useState()
    const [itemCode, setItemCode] = useState()
    const [quantity, setQuantity] = useState(0)
    const [codeBars, setCodeBars] = useState()
    const [lineNet, setLineNet] = useState(0)
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState()
    const [lineTotal, setLineTotal] = useState(0)
    const [lineVat, setLineVat] = useState(0)
    const [discountPrcnt, setDiscountPrcnt] = useState()
    const [vatPrcnt, setVatPrcnt] = useState()
    const [onTheWay, setOnTheWay] = useState()
    const [scheduledShipDate, setScheduledShipDate] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShow = () => {
        if (!open) {
            axios
                .get(`http://localhost:8080/api/details/${row.deliveryOrderId}`)
                .then((response) => {
                    setDetails(response.data)
                })
        }
        setOpen(!open)
    }

    //TODO do poprawy valuenet
    const edit = (detail) => {
        setId(detail.id);
        setItemCode(detail.itemCode);
        setItemName(detail.itemName);
        setCodeBars(detail.codeBars);
        setQuantity(detail.quantity);
        setPrice(detail.price);
        setCurrency(detail.currency);
        setLineTotal(detail.lineTotal);
        setLineNet(detail.lineNet);
        setLineVat(detail.lineVat);
        setDiscountPrcnt(detail.discountPrcnt);
        setVatPrcnt(detail.vatPrcnt);
        setOnTheWay(details.onTheWay);
        setScheduledShipDate(detail.scheduledShipDate);
        setIsModalOpen(true);
    }

    const add = () => {
        setId();
        setItemCode();
        setItemName();
        setCodeBars();
        setQuantity();
        setPrice();
        setCurrency();
        setLineTotal();
        setLineNet();
        setLineVat();
        setDiscountPrcnt();
        setVatPrcnt();
        setOnTheWay();
        setScheduledShipDate();
        setIsModalOpen(true);
    }

    React.useEffect(() => {
        if (refresh === true) {
            axios
                .get(`http://localhost:8080/api/details/${row.deliveryOrderId}`)
                .then((response) => {
                    setDetails(response.data)
                })
            setRefresh(false)
        }
    }, [refresh])

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
                <TableCell align="right">{row.docTotal}</TableCell>
                <TableCell align="right">{row.docNet}</TableCell>
                <TableCell align="right">{row.docVatSum}</TableCell>
                <TableCell align="left">
                    <ShowMoreText
                        lines={1}
                        more='Rozwiń'
                        less='Zwiń'
                        className='content-css'
                        anchorClass='my-anchor-css-class'
                        width={280}>{row.description}</ShowMoreText></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={0}>
                            <div className="details-container">
                            <Typography variant="h6" gutterBottom component="div">
                                Szczegóły
                            </Typography>
                            <button className="details-container-buttons" onClick={() => add()}>Dodaj</button>
                            </div>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {/*<TableCell align="left">Pow</TableCell>*/}
                                        <TableCell align="left">Nr&nbsp;kat</TableCell>
                                        <TableCell align="left">Nazwa</TableCell>
                                        <TableCell align="left">EAN</TableCell>
                                        <TableCell align="right">Ilość</TableCell>
                                        <TableCell align="right">Cena</TableCell>
                                        <TableCell align="left">Waluta</TableCell>
                                        <TableCell align="right">Wartość</TableCell>
                                        <TableCell align="right">Wartość netto</TableCell>
                                        <TableCell align="right">Wartość Vat</TableCell>
                                        <TableCell align="right">Vat %</TableCell>
                                        <TableCell align="right">Rabat</TableCell>
                                        <TableCell align="left">Czas&nbsp;dostawy</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell>Data modyfikacji</TableCell>
                                        <TableCell align="center">Akcja</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {details && details.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            {/*<TableCell align="center"> <input type="checkbox"/></TableCell>*/}
                                            <TableCell align="left">{historyRow.itemCode}</TableCell>
                                            <TableCell align="right">{historyRow.itemName}</TableCell>
                                            <TableCell align="right">{historyRow.codeBars}</TableCell>
                                            <TableCell align="right">{historyRow.quantity}</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="left">{historyRow.currency}</TableCell>
                                            <TableCell align="right">{historyRow.lineTotal}</TableCell>
                                            <TableCell align="right">{historyRow.lineNet}</TableCell>
                                            <TableCell align="right">{historyRow.lineVat}</TableCell>
                                            <TableCell align="right">{historyRow.vatPrcnt}</TableCell>
                                            <TableCell align="right">{historyRow.discountPrcnt}</TableCell>
                                            <TableCell align="right">{historyRow.scheduledShipDate}</TableCell>
                                            <TableCell
                                                align="left">{historyRow.onTheWay ? "W drodze" : "Nie wysłany"}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {Moment(historyRow.modifyDate).format('DD-MM-YYYY hh:mm:ss')}
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="details-container-buttons-row">
                                                <button className="details-container-buttons-row-edit" onClick={() => edit(historyRow)}>Edytuj</button>
                                                <button className="details-container-buttons-row-delete" onClick={() => edit(historyRow)}>Usuń</button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <EditDetails
                itemName={itemName}
                codeBars={codeBars}
                lineNet={lineNet}
                id={id}
                itemCode={itemCode}
                quantity={quantity}
                codeBars={codeBars}
                lineNet={lineNet}
                price={price}
                currency={currency}
                lineTotal={lineTotal}
                lineVat={lineVat}
                discountPrcnt={discountPrcnt}
                vatPrcnt={vatPrcnt}
                onTheWay={onTheWay}
                scheduledShipDate={scheduledShipDate}
                isModalOpen={isModalOpen}
                closeModel={closeModel}
                // refreshDetails={refreshDetails}
                refreshDetails={(refresh) => setRefresh(refresh)}
            />
        </React.Fragment>
    );
}

export default Row