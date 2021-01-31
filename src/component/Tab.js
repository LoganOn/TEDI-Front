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
import Row from './Row'

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

function createData(creationDate, userId1, baseRef, numberOrderCustomer, docNet, docVatSum, docTotal) {
    return {
        creationDate,
        userId1,
        baseRef,
        numberOrderCustomer,
        docNet,
        docVatSum,
        docTotal,
        history: [
            { modifyDate: '2020-01-05', userId1: '11091700', itemCode: 'a', itemName: "ItemName1", codeBars: "5900000000000", price: 1000.0, quantity: 3 },
            { modifyDate: '2020-01-02', userId1: 'Anonymous',itemCode: 'b', itemName: "ItemName1", codeBars: "5900000000001", price: 1000.0, quantity: 1 },
        ],
    };
}

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
                // this.setState({data : response.data})
                console.log(response.data)
                this.uploadDate(response.data)
            })
    }

    findAllDeliveryByUser (id) {
        axios
            .get(`http://localhost:8080/api/details/${id}`)
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
                            {this.state.delivery && this.state.delivery.map((row) => (
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
    uploadDate(props) {
        let tempArray = [];
        props.forEach(data => {
            let temp = createData(data.creationDate, data.userId1, data.baseRef, data.numberOrderCustomer, data.docNet, data.docVatSum, data.docTotal)
            tempArray.push(temp)
        })
        this.setState({delivery : tempArray})
        //this.findAllDeliveryByUser()
    }
}
export default Tab