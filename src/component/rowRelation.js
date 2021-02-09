import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import {FormControlLabel, Switch} from "@material-ui/core";
import '../css/Relation.css'
import Moment from "moment";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

RowRelation.propTypes = {
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



function RowRelation(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [details, setDetails] = React.useState( []);
    const [text, setText] = React.useState(props.text);
    const classes = useRowStyles();
    const deleteRelation = () =>{
            axios
                .delete(`http://localhost:8080/api/relations/${row.relationUsersId}`)
                .then((response) => {
                    setDetails(response.data)
                    // setText(!text)
                    props.text(!text)
                })
        }
        React.useEffect(() => {
        }, [text])
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row" >
                    {Moment(row.creationDate).format('DD-MM-YYYY hh:mm:ss')}
                </TableCell>
                <TableCell align="center">{localStorage.getItem("role") == "customer" ? row.supplier : row.customer}</TableCell>
                {/*<TableCell align="center">{row.active}</TableCell>*/}
                <TableCell align="center"> <button onClick={deleteRelation}>Usuń</button>
                    {/*<Switch onClick={toggler}></Switch>*/}
            </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default RowRelation