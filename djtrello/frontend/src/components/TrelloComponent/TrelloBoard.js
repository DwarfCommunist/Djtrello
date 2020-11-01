import React, {Component, useEffect, useState} from "react";
import TrelloList from "./TrelloList";
import axiosInstance from "../../axiosApi";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function TrelloBoard(props) {


    const {id: boardId} = props.match.params;

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

    function moveCard(list, card, index) {
        axiosInstance.post('/card/move', {
              "board_id": boardId,
              "new_list_id": list.id,
              "card_id": card.id,
              "position": index
        }).catch(error => {
            throw error;
        })
    }

    function onDragEnd(result) {

        console.log(result);
        const {destination, source, type} = result;

        if (!destination) {
            return;
        }
        const destinationIndex = destination.index;
        const sourceIndex = source.index;

        const destinationId = destination.droppableId;
        const sourceId = source.droppableId;

        if (type == 'list') {
            const newArray = list;
            const obj = newArray[sourceIndex];
            newArray.splice(sourceIndex, 1);
            newArray.splice(destinationIndex, 0, obj);
            setList(newArray);
            moveList(obj, destinationIndex);
        } else {
            const sourceList = list.find(x => x.id == sourceId);
            const destinationList = list.find(x => x.id == destinationId);
            const obj = sourceList.cards[sourceIndex];
            sourceList.cards.splice(sourceIndex, 1);
            destinationList.cards.splice(destinationIndex, 0, obj);
            setList(oldArray => [...oldArray]);
            moveCard(destinationList, obj, destinationIndex);
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

    function deleteList(list_id, index) {
        axiosInstance.delete('list/delete/board_id/' + boardId + '/list_id/' + list_id)
            .then(
                result => {
                     list.splice(index, 1);
                     setList(oldArray => [...oldArray]);
                }
            ).catch(error => {
            throw error;
        });
    }

    function deleteCard(card_id, listIndex, index) {
        axiosInstance.delete('/card/delete/'+ card_id, {
            board_id: boardId,
            name: name
        }).then(
            result => {
                const obj = list[listIndex]
                obj.cards.splice(index, 1);
                setList(oldArray => [...oldArray]);
            }
        ).catch(error => {
            throw error;
        });
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {provided => (
                    <ListsContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list.map((list, index) => (
                            <TrelloList
                                deleteCard={deleteCard}
                                deleteList={deleteList}
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
                    </ListsContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
}