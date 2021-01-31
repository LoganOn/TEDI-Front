import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import axios from "axios";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(date, supplier, baseRef, numberOrderCustomer, docNet, docVatSum, docTotal) {
    return {
        date,
        supplier,
        baseRef,
        numberOrderCustomer,
        docNet,
        docVatSum,
        docTotal,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.date}
                </TableCell>
                <TableCell align="center">{row.supplier}</TableCell>
                <TableCell align="center">{row.baseRef}</TableCell>
                <TableCell align="right">{row.numberOrderCustomer}</TableCell>
                <TableCell align="right">{row.docNet}</TableCell>
                <TableCell align="right">{row.docVatSum}</TableCell>
                <TableCell align="right">{row.docTotal}</TableCell>
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
                                        <TableCell align="right">Ilość</TableCell>
                                        <TableCell align="right">EAN</TableCell>
                                        <TableCell align="right">Cena netto</TableCell>
                                        <TableCell align="right">Vat %</TableCell>
                                        <TableCell align="right">Rabat</TableCell>
                                        <TableCell align="right">Czas&nbsp;dostawy</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
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

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99, 1000),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];



// const classes = makeStyles();
// const [page, setPage] = React.useState(0);
// const [rowsPerPage, setRowsPerPage] = React.useState(10);

// const handleChangePage = (event, newPage) => {
//     setPage(newPage);
// };
//
// const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
// };

class Tab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            delivery:[],
            isLoadnig:false,
            isError:false
        }
    }

    async componentDidMount(){
        this.setState({isLoading: true})

        axios
            .get('http://localhost:8080/api/delivery')
            .then((response) => {
                console.log(response.data.baseRef)
            })
    }
    findAllDeliveryByUser () {
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:8080/api/delivery',
        //
        // }
        //     .then((response) => {
        //       //  localStorage.setItem('userId', response.data.userId);
        //         console.log(response.data.baseRef)
        //     }));
        axios
            .get('http://localhost:8080/api/delivery')
            .then((response) => {
                console.log(response.data.baseRef)
            })
}

    render() {
        return (
            <div>
                <button onClick={this.findAllDeliveryByUser}>Add</button>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell>Dostawca</StyledTableCell>
                                <StyledTableCell align="center">Numer&nbsp;zamówienia</StyledTableCell>
                                <StyledTableCell align="right">Numer&nbsp;klienta</StyledTableCell>
                                <StyledTableCell align="right">Klient</StyledTableCell>
                                <StyledTableCell align="right">Wartość&nbsp;netto</StyledTableCell>
                                <StyledTableCell align="right">Vat</StyledTableCell>
                                <StyledTableCell align="right">Wartość&nbsp;brutto</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination*/}
                {/*    rowsPerPageOptions={[10, 25, 100]}*/}
                {/*    component="div"*/}
                {/*    count={rows.length}*/}
                {/*    rowsPerPage={rowsPerPage}*/}
                {/*    page={page}*/}
                {/*    onChangePage={handleChangePage}*/}
                {/*    onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                {/*/>*/}
            </div>
        );
    }
}
export default Tab