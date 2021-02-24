import React, {useState} from 'react';
import Logo1 from './img/favicon1.ico'
import Femax from './img/Femax.png'
import Tece from './img/Tece.jpg'
import Purmo from './img/Purmo.png'
import Grohe from './img/Grohe.png'
import '../css/AddRelations.scss'
import axios from "axios";


const AddRelations = (props) => {
    const [relations, setRelations] = useState([]);
    const [iterator, setIterator] = useState([]);
    const [check, setCheck] = useState(false);

    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/without/${localStorage.getItem("userId")}`)
            .then((response) => {
                setRelations(response.data)
            })
    },[check]);


    const addRelation = (userId) =>{
        console.log(userId)
        axios
            .post(`http://localhost:8080/api/relations`,
                {
                    supplierId:localStorage.getItem("userId"),
                    customerId:userId,
                }
                )
            .then((response) => {
                console.log(response.data)
                setCheck(!check)
            })
        //setRelations(response.data)
    }

    return (
        <div className="containerRelations">
            <div className="rowRelations" >
                <div className="panelCompany">
                    <img className="panelCompany-img" src={Femax}/>
                    <h2>Femax</h2>
                </div>
                <div className="panelCompany" >
                    <img className="panelCompany-img" src={Tece}/>
                    <h2>Tece</h2>
                </div>
                <div className="panelCompany">
                    <img className="panelCompany-img" src={Purmo}/>
                    <h2>Purmo</h2>
                </div>
                <div className="panelCompany" >
                    <img className="panelCompany-img" src={Grohe}/>
                    <h2>Grohe</h2>
                </div>
                {/*{relations && relations.map((company) => (*/}
                {/*    <div className="panelCompany" onClick={() => addRelation(company.userId)}>*/}
                {/*        <img className="panelCompany-img" src={Femax}/>*/}
                {/*        <h2>{company.name}</h2>*/}
                {/*    </div>*/}

                {/*))}*/}
            </div>
        </div>
    );


}
export default AddRelations