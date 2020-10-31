import React, {useState, useEffect} from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CreateBoardModal from "./CreateBoardModal";
import Button from "@material-ui/core/Button";
import axiosInstance from '../axiosApi';
import {useHistory} from "react-router-dom";

export default function Dashboard() {
    const history = useHistory();
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance.get('/board/list')
            .then((result) => {
                setList(result.data.boards);
            });
    }, [])


    function deleteBoard(id, index) {
        axiosInstance.delete('/board/delete/' + id)
            .then(
                result => {
                    const array = list;
                    array.splice(index, 1);
                    console.log(array);
                    setList(oldArray => [...array]);
                }
            ).catch(error => {
            throw error;
        });
    }

    function createBoard(name) {
        console.log(name);
        axiosInstance.post('/board/create', {
            name: name
        }).then(
            result => {
                setList(oldArray => [...oldArray, result.data]);
            }
        ).catch(error => {
            throw error;
        });
    }

    function showBoard(id) {
        history.push({
            pathname: 'board/' + id,
            state: {boardId: id}
        })
    }

    return (
        <div style={{marginTop: 20, padding: 30}}>
            <Grid container spacing={10} justify="center">
                {list.map((board, index) => (
                    <Grid item key={board.id}>
                        <Card>
                            <CardActionArea onClick={() => showBoard(board.id)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {board.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" onClick={() => deleteBoard(board.id, index)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item key="create_board">
                    <Card>
                        <CardActions>
                            <CreateBoardModal createBoard={createBoard}/>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}