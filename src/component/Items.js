import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import axios from "axios";
import {useSelector} from 'react-redux';
import Row from './rowItems'
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


const Items = (props) => {

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


    const createData = (itemId, itemCode, itemName, codeBars, price, currency, vatPrcnt, vatGroup, active, availability) => {
        return {
            itemId,
            itemCode,
            itemName,
            codeBars,
            price,
            currency,
            vatPrcnt,
            vatGroup,
            active,
            availability
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
            let temp = createData(data.itemId, data.itemCode, data.itemName, data.codeBars, data.price, data.currency, data.vatPrcnt, data.vatGroup, data.active, data.availability)
            tempArray.push(temp)
        })
        setRelations(tempArray)
    }

    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/items`)
            .then((response) => {
                uploadDate(response.data)
                console.log(response)
            })
    }, [])

    React.useEffect(() => {
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
        if (text == true) {
            setText(false)
            axios
                .get(`http://localhost:8080/api/items`)
                .then((response) => {
                    uploadDate(response.data)
                })
        }
    }, [text])


    // const updateField = (fieldName, value) => {
    //     const { state } = this;
    //     state[fieldName] = value;
    //     this.setState(state);
    // };
    return (
        <div className={`${width ? 'offset' : 'withoutOffset'}`}>
            {/*<div className="buttonContainer">*/}
            {/*    /!*<div className="buttonContainer-link">*!/*/}
            {/*    /!*    <a to={"/addRelations"}>Dodaj firmę</a>*!/*/}
            {/*    /!*    <a  className="buttonContainer-link" href={"/addRelations"}>Dodaj firmę</a>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <input className="buttonContainer-input" type='text' placeholder='Firma' name='company'*/}
            {/*           onChange={(e) => setCompany(e.target.valu)}/>*/}
            {/*</div>*/}
            <TableContainer component={Paper} >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Indeks</StyledTableCell>
                            <StyledTableCell align="center">Nazwa</StyledTableCell>
                            <StyledTableCell align="center">EAN</StyledTableCell>
                            <StyledTableCell align="center">Cena</StyledTableCell>
                            <StyledTableCell align="center">Waluta</StyledTableCell>
                            <StyledTableCell align="center">Vat</StyledTableCell>
                            <StyledTableCell align="center">Dostępność</StyledTableCell>
                            <StyledTableCell align="center">Akcje</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {relations && relations.map((row) => (
                            <Row key={row.name} row={row} text={(textContent) => setText(textContent)}/>
                        ))}
                    </TableBody>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={3}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </div>
    );


}
export default Items