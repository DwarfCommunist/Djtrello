import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TrelloActionButton(props) {
    const classes = useStyles();
    const [name, setName] = React.useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createObject = () => {
        props.action(name);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                {props.title}
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>{props.title}</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Title"
                        label="Board Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        onChange={event => {
                            const {value} = event.target;
                            setName(value);
                        }}
                    />
                    <Button size="small" onClick={() => createObject()}>
                        {props.title}
                    </Button>

                </div>
            </Modal>
        </div>
    );
}