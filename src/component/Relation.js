import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
import Row from './rowRelation'
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


const Relation = (props) => {

    const [relations, setRelations] = useState([]);
    const [isLoadnig, setIsLoadnig] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(100);
    const [company, setCompany] = useState('');
    const [baseNum, setBaseNum] = useState('');
    const [cusNum, setCusNum] = useState('');
    const [text, setText] = useState(false);
    const width = useSelector((state => state))


    const createData = (relationUsersId, creationDate, supplier, customer, active) => {
        return {
            relationUsersId,
            creationDate,
            supplier,
            customer,
            active
        };
    }

    const handleChangePage = (event, newPage) => {
        setPage({page: newPage});
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const uploadDate = (props) => {
        let tempArray = [];
        props.forEach(data => {
            let temp = createData(data.relationUsersId, data.creationDate, data.supplier.name, data.customer.name, data.active)
            tempArray.push(temp)
        })
        setRelations(tempArray)
    }

    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/${localStorage.getItem("userId")}`)
            .then((response) => {
                console.log(response.data)
                uploadDate(response.data)
            })
    }, [])

    React.useEffect(() => {
     console.log(width)
    }, [width])

    // React.useEffect(() => {
    //     axios
    //         //.get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/${localStorage.getItem("userId")}/?name=${company}&baseRef=${baseNum}&cusNumber=${cusNum}&size=${rowsPerPage}&page=${page}`)
    //         .get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/${localStorage.getItem("userId")}`)
    //         .then((response) => {
    //             console.log(response)
    //             if(response.status == 204)
    //             {
    //                 this.uploadDate([])
    //             }
    //             else
    //                 this.uploadDate(response.data)
    //         })
    // }, [company, baseNum , cusNum, rowsPerPage, page])

    React.useEffect(() => {
        if(text == true) {
            console.log('HAHAHA')
            setText(false)
            axios
                .get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/${localStorage.getItem("userId")}`)
                .then((response) => {
                    console.log(response.data)
                    uploadDate(response.data)
                })
        }
        console.log(text)
    }, [text])


    // const updateField = (fieldName, value) => {
    //     const { state } = this;
    //     state[fieldName] = value;
    //     this.setState(state);
    // };
        return (
            <div className={`${width ? 'offset' : 'withoutOffset'}`}>
                <input type='text' placeholder='Firma' name='company' onChange={(e) => setCompany(e.target.valu)}/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell align="center">Firma</StyledTableCell>
                                <StyledTableCell align="center">Akcja</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {relations && relations.map((row) => (
                                <Row key={row.name} row={row} text={(textContent) => setText(textContent)} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        );


}
export default Relation