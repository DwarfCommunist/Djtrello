import React, {useEffect, useState} from "react";
import axiosInstance from "../../axiosApi";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import {Droppable, Draggable, DragDropContext} from "react-beautiful-dnd";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

export default function TrelloList(props) {

    const title = props.title;
    const listId = props.listId;

    function createCard(name) {
        props.createCard(name, props.index);
    }

    function deleteList(index) {
        props.deleteList(listId, index);
    }

    function deleteCard(cardId, index) {
        props.deleteCard(cardId, props.index, index);
    }

    return (
        <Draggable draggableId={String(listId)} index={props.index}>
            {provided => (
                <ListContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={String(listId)} type="card">
                        {provided => (
                            <div>
                                <TitleContainer>
                                    <ListTitle>{title}</ListTitle>
                                    <Button onClick={() => deleteList(props.index)}>
                                        delete
                                    </Button>
                                </TitleContainer>
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {props.cards.map((card, index) => (
                                        <TrelloCard
                                            deleteCard={deleteCard}
                                            key={card.id}
                                            index={index}
                                            text={card.name}
                                            index={index}
                                            id={card.id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    <TrelloActionButton title='Create Card' action={createCard}/>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300
    },
    listsContainer: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        height: "100%"
    },
    title: {
        backgroundColor: "#dfe3e6"
    }
};

