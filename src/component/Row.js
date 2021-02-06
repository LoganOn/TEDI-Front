import React from "react";
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
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState( []);
    const classes = useRowStyles();
    const handleShow = () =>{
        if(!open){
            axios
                .get(`http://localhost:8080/api/details/${row.deliveryOrderId}`)
                .then((response) => {
                    console.log(response.data)
                    setDetails(response.data)
                })
        }
        setOpen(!open)
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleShow()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.creationDate}
                </TableCell>
                <TableCell align="center">{row.userId1}</TableCell>
                <TableCell align="center">{row.baseRef}</TableCell>
                <TableCell align="right">{row.numberOrderCustomer}</TableCell>
                <TableCell align="right">{row.docNet}</TableCell>
                <TableCell align="right">{row.docVatSum}</TableCell>
                <TableCell align="right">{row.docVatSum}</TableCell>
                <TableCell align="right">{row.docTotal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Szczegóły
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data modyfikacji</TableCell>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/*{row.history.map((historyRow) => (*/}
                                    {details && details.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.modifyDate}
                                            </TableCell>
                                            <TableCell align="right">{historyRow.itemCode}</TableCell>
                                            <TableCell align="right">{historyRow.itemName}</TableCell>
                                            <TableCell align="right">{historyRow.codeBars}</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="right">{historyRow.currency}</TableCell>
                                            <TableCell align="right">{historyRow.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row