import React, {Component, useEffect, useState} from "react";
import TrelloList from "./TrelloList";
import axiosInstance from "../../axiosApi";


export default function TrelloBoard(props) {


    const boardId = props.location.state.boardId;
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/list/list/' + boardId).then((result) => {
            setList(result.data.lists);
        });
    }, [])

    return (
        <div>
            <div style={styles.listsContainer}>
                {list.map(list => (
                    <TrelloList key={list.id} title={list.name} listId={list.id}/>
                ))}
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
