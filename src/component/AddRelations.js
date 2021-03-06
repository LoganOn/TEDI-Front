import React, {useState} from 'react';
import Logo1 from './img/favicon1.ico'
import '../css/AddRelations.scss'


const AddRelations = (props) => {
    const tab = [{
        "name": "Company1",
        "img": Logo1,
    }, {
        "name": "Company2",
        "img": Logo1,
    }, {
        "name": "Company3",
        "img": Logo1,
    }, {
        "name": "Company4",
        "img": Logo1,
    }, {
        "name": "Company5",
        "img": Logo1,
    }, {
        "name": "Company6",
        "img": Logo1,
    }, {
        "name": "Company7",
        "img": Logo1,
    }, {
        "name": "Company8",
        "img": Logo1,
    }, {
        "name": "Company9",
        "img": Logo1,
    }, {
        "name": "Company10",
        "img": Logo1,
    }, {
        "name": "Company11",
        "img": Logo1,
    }, {
        "name": "Company12",
        "img": Logo1,
    }, {
        "name": "Company13",
        "img": Logo1,
    }, {
        "name": "Company14",
        "img": Logo1,
    }, {
        "name": "Company15",
        "img": Logo1,
    }]

    const [relations, setRelations] = useState([]);
    const [iterator, setIterator] = useState([]);


    return (
        <div className="containerRelations">
            <div className="rowRelations">
                {tab.map((company) => (
                    <div className="panelCompany">
                        <img src={company.img}/>
                        <h2>{company.name}</h2>
                    </div>

                ))}
            </div>
        </div>
    );


}
export default AddRelations