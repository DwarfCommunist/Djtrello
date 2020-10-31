import React, {useEffect, useState} from "react";
import axiosInstance from "../../axiosApi";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";

export default function TrelloList(props) {

    const title = props.title;
    const listId = props.listId;
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/card/list/' + listId).then((result) => {
            console.log(result.data);
            setList(result.data.cards);
        });
    }, [])

    function createCard(name) {
        axiosInstance.post('/card/create', {
            list_id: listId,
            name: name
        }).then(
            result => {
                setList(oldArray => [...oldArray, result.data]);
            }
        ).catch(error => {
            throw error;
        });
    }

    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            {list.map(card => (
                <TrelloCard key={card.id} text={card.name}/>
            ))}
            <TrelloActionButton title='Create Card' action={createCard} />
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 8,
        marginRight: 8
    }
};

