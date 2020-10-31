import React, {Component, useEffect, useState} from "react";
import TrelloList from "./TrelloList";
import axiosInstance from "../../axiosApi";
import TrelloActionButton from "./TrelloActionButton";


export default function TrelloBoard(props) {

    const boardId = props.location.state.boardId;
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/list/list/' + boardId).then((result) => {
            setList(result.data.lists);
        });
    }, [])

    function createList(name) {
        axiosInstance.post('/list/create', {
            board_id: boardId,
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
        <div>
            <div style={styles.listsContainer}>
                {list.map(list => (
                    <TrelloList key={list.id} title={list.name} listId={list.id}/>
                ))}
                <TrelloActionButton title='Create List' action={createList} />
            </div>
        </div>
    );
}

const styles = {
    listsContainer: {
        display: "flex",
        flexDirection: "row"
    }
};

const mapStateToProps = state => ({
    lists: state.lists
});
