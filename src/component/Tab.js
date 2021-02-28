import React, {Component, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import axios from "axios";
import {connect} from 'react-redux';
import Row from './Row'
import '../css/Tab.css'
import AddOrder from "./AddOrder";

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

class Tab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            delivery:[],
            isLoadnig:false,
            isError:false,
            page: 0,
            rowsPerPage: 10,
            count: 1,
            company:'',
            baseNum: '',
            cusNum: '',
            cancelToken: undefined,
            refresh: false,
            isModalOpen:false,
        }
    }

    createData(deliveryOrderId, creationDate, supplier, customer, baseRef, numberOrderCustomer, docNet, docVatSum, docTotal, description) {
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
            description,
        };
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage : parseInt(event.target.value, 10), page: 0});
    };

    async componentDidMount(){
        this.setState({isLoading: true})
        axios
            .get(`http://localhost:8080/api/delivery/${localStorage.getItem("role")}/${localStorage.getItem("userId")}/?name=${this.state.company}&baseRef=${this.state.baseNum}&cusNumber=${this.state.cusNum}`)
            .then((response) => {
                this.setState({count : response.data.count})
                this.uploadDate(response.data.deliveryOrders)
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const {company, baseNum, cusNum, rowsPerPage, page} = this.state
        if (company !== prevState.company || baseNum !== prevState.baseNum || cusNum !== prevState.cusNum || rowsPerPage !== prevState.rowsPerPage || page !== prevState.page){
            if (typeof this.state.cancelToken != typeof undefined) {
                this.state.cancelToken.cancel("Operation canceled due to new request.");
            }
            this.state.cancelToken = axios.CancelToken.source();
            axios
                .get(`http://localhost:8080/api/delivery/${localStorage.getItem("role")}/${localStorage.getItem("userId")}/?name=${company}&baseRef=${baseNum}&cusNumber=${cusNum}&size=${rowsPerPage}&page=${page}`, { cancelToken: this.state.cancelToken.token })
                .then((response) => {
                    if(response.status == 204)
                    {
                        this.uploadDate([])
                    }
                    else
                        this.setState({count: response.data.count})
                    this.uploadDate(response.data.deliveryOrders)
                })
        }
    }

    updateField = (fieldName, value) => {
        const { state } = this;
        state[fieldName] = value;
        this.setState(state);
    };

     closeModel = () => {
        this.setState({isModalOpen: false})
    }

    render() {
        return (
            <div className={`${this.props.width ? 'offset' : 'withoutOffset'}`}>
                <input className="input-searching-table" type='text' placeholder='Firma' name='company' onChange={(e) => this.setState({company : e.target.value})}/>
                <input className="input-searching-table" type='text' placeholder='Numer dostawcy' name='baseRef' onChange={(e) => this.setState({baseNum : e.target.value})}/>
                <input className="input-searching-table" type='text' placeholder='Numer klienta' name='cusNumber' onChange={(e) => this.setState({cusNum : e.target.value})}/>
                <button className="order-container-buttons" onClick={() => {this.add()}}>Dodaj zamówienie</button>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell>{localStorage.getItem("role") == "customer" ? 'Dostawca' : 'Klient' }</StyledTableCell>
                                <StyledTableCell align="left">{localStorage.getItem("role") == "customer" ? 'Numer dostawcy' : 'Numer zamówienia'}</StyledTableCell>
                                <StyledTableCell align="left">{localStorage.getItem("role") == "customer" ? 'Numer zamówienia' : 'Numer klienta'}</StyledTableCell>
                                <StyledTableCell align="right">Wartość</StyledTableCell>
                                <StyledTableCell align="right">Wartość&nbsp;netto</StyledTableCell>
                                <StyledTableCell align="right">Wartość&nbsp;Vat</StyledTableCell>
                                <StyledTableCell align="left">Opis</StyledTableCell>
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
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={this.state.count}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
                <AddOrder
                    isModalOpen={this.state.isModalOpen}
                    closeModel={this.closeModel}
                    //refreshDetails={refreshDetails}
                    // refreshDetails={(refresh) => setRefresh(refresh)}
                />
            </div>
        );
    }

    add(){
        this.setState({isModalOpen: true})
    }
    uploadDate(props) {
        let tempArray = [];
        props.forEach(data => {
            let temp = this.createData(data.deliveryOrderId, data.creationDate, data.supplier.name, data.customer.name, data.baseRef, data.numberOrderCustomer, data.docNet, data.docVatSum, data.docTotal, data.description)
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