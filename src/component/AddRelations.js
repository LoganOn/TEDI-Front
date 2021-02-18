import React, {useState} from 'react';
import Logo1 from './img/favicon1.ico'
import '../css/AddRelations.scss'
import axios from "axios";


const AddRelations = (props) => {
    const [relations, setRelations] = useState([]);
    const [iterator, setIterator] = useState([]);
   // const [userId, setUserId] = useState(0);




    React.useEffect(() => {
        axios
            .get(`http://localhost:8080/api/relations/${localStorage.getItem("role")}/without/${localStorage.getItem("userId")}`)
            .then((response) => {
                console.log(response.data)
                setRelations(response.data)
            })
    },[]);


    const addRelation = (props) =>{
        console.log(localStorage.getItem("userId"))
        console.log(relations[0].useriId)
        axios
            .post(`http://localhost:8080/api/relations`,
                {
                    supplierId:localStorage.getItem("userId"),
                    customerId:props.relations[0].customerId,
                }
                )
            .then((response) => {
                console.log(response.data)
                setRelations(response.data)
            })
    }

    return (
        <div className="containerRelations">
            <div className="rowRelations" onClick={addRelation}>
                {relations.map((company) => (
                    <div className="panelCompany">
                        <img src={company.imageUrl}/>
                        <h2>{company.name}</h2>
                    </div>

                ))}
            </div>
        </div>
    );


}
export default AddRelations