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
import {connect} from 'react-redux';
import Row from './Row'
import '../css/Tab.css'

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

const classes = makeStyles();
// const [page, setPage] = React.useState(0);
// const [rowsPerPage, setRowsPerPage] = React.useState(10);


class Tab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            delivery:[],
            isLoadnig:false,
            isError:false,
            page: 0,
            rowsPerPage: 10,
            count:100
        }
     //  this.handleClick = this.handleClick.bind(this);
    }

     createData(deliveryOrderId, creationDate, supplier, customer, baseRef, numberOrderCustomer, docNet, docVatSum, docTotal) {
        return {
            deliveryOrderId,
            creationDate,
            supplier,
            customer,
            baseRef,
            numberOrderCustomer,
            docNet,
            docVatSum,
            docTotal,
        };
    }

     handleChangePage = (event, newPage) => {
        console.log(newPage)
        this.setState(this.state.page = newPage);
    };

     handleChangeRowsPerPage = (event) => {
         console.log(this.state.rowsPerPage)
         this.setState(this.state.page = 0, this.state.rowsPerPage = event.target.value);
         console.log(this.state.rowsPerPage)
    };

    async componentDidMount(){
        this.setState({isLoading: true})
        axios
            .get(`http://localhost:8080/api/delivery/${localStorage.getItem("role")}/${localStorage.getItem("userId")}`)
            .then((response) => {
                this.uploadDate(response.data)
            })
    }

    render() {
        return (
            <div className={`${this.props.width ? 'offset' : 'withoutOffset'}`}>
                <input type='text' placeholder='Firma' name='company'/>
                <input type='text' placeholder='Numer dostawcy' name='baseRef'/>
                <input type='text' placeholder='Numer klienta' name='cusNumber'/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell>{localStorage.getItem("role") == "customer" ? 'Dostawca' : 'Klient' }</StyledTableCell>
                                <StyledTableCell align="center">Numer&nbsp;zamówienia</StyledTableCell>
                                <StyledTableCell align="right">Numer&nbsp;klienta</StyledTableCell>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.count}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
    uploadDate(props) {
        let tempArray = [];
        props.forEach(data => {
            let temp = this.createData(data.deliveryOrderId, data.creationDate, data.supplier.name, data.customer.name, data.baseRef, data.numberOrderCustomer, data.docNet, data.docVatSum, data.docTotal)
            tempArray.push(temp)
        })
        this.setState({delivery : tempArray})
    }
}

const mapStateToProps = (state) => {
    return {
        width: state
    }
}
export default connect (mapStateToProps)(Tab)