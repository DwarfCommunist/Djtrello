import React, {useEffect, useState} from "react";
import axiosInstance from "../../axiosApi";
import TrelloCard from "./TrelloCard";

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

    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            {list.map(card => (
                <TrelloCard key={card.id} text={card.name}/>
            ))}
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

