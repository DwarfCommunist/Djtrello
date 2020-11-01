import React, {useEffect, useState} from "react";
import axiosInstance from "../../axiosApi";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import {Droppable, Draggable, DragDropContext} from "react-beautiful-dnd";

export default function TrelloList(props) {

    const title = props.title;
    const listId = props.listId;

    function createCard(name) {
        props.createCard(name, props.index);
    }

    return (
        <Draggable draggableId={String(listId)} index={props.index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={String(listId)} type="card">
                        {provided => (
                            <div style={styles.container}>
                                <h3>{title}</h3>
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={styles.container}
                            >
                                {props.cards.map((card, index) => (
                                    <TrelloCard
                                        key={card.id}
                                        index={index}
                                        text={card.name}
                                        id={card.id}
                                    />
                                ))}
                                {provided.placeholder}
                                <TrelloActionButton title='Create Card' action={createCard}/>
                            </div>
                            </div>
                        )}
                    </Droppable>

                </div>
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

