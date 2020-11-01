import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Draggable} from "react-beautiful-dnd";
import Button from '@material-ui/core/Button';
import styled from "styled-components";
const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;


export default function TrelloCard(props) {

    function deleteCard() {
        props.deleteCard(props.id, props.index)
    }

    return (
        <Draggable draggableId={"Card" + String(props.id)} index={props.index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <Button onClick={() => deleteCard()}>
                delete
              </Button>

              <CardContent>
                <Typography>{props.text}</Typography>
              </CardContent>
            </Card>
          </CardContainer>
        )}
      </Draggable>

    );
};