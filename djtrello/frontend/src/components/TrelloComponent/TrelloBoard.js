import React, {Component, useEffect, useState} from "react";
import TrelloList from "./TrelloList";
import axiosInstance from "../../axiosApi";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

export default function TrelloBoard(props) {

    const boardId = props.location.state.boardId;
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/list/list/' + boardId).then((result) => {

            setList(result.data.lists);
            console.log(list);
        });
    }, [])

    function moveList(list, index) {
        axiosInstance.post('/list/move', {
            board_id: boardId,
            list_id: list.id,
            position: index
        }).catch(error => {
            throw error;
        })
    }


    function onDragEnd(result) {

        console.log(list);
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        if (type === 'list') {
            const newArray = list;

            const destinationIndex = destination.index;
            const sourceIndex = source.index;
            const obj = newArray[sourceIndex];
            newArray.splice(sourceIndex, 1);
            newArray.splice(destinationIndex, 0, obj);
            setList(newArray);
            moveList(obj, destinationIndex);
        } else {

        }
    }

    function createCard(name, listIndex) {
        const obj = list[listIndex];
        axiosInstance.post('/card/create', {
            list_id: obj.id,
            name: name
        }).then(
            result => {
                obj.cards.push(result.data);
                setList(oldArray => [...oldArray]);
            }
        ).catch(error => {
            throw error;
        });
    }

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
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={styles.listsContainer}>
                        {list.map((list, index) => (
                            <TrelloList
                                createCard={createCard}
                                cards={list.cards}
                                list={list}
                                key={list.id}
                                title={list.name}
                                listId={list.id}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                        <TrelloActionButton title='Create List' action={createList}/>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
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
