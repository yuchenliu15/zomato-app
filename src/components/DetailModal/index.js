import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    title: {
      fontSize: 25,
      fontWeight: 600
    },
    content: {
      fontSize: 18,
    },
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DetailModal({isOpen, handleClose, details}) {
  const {
    name, rating, online
  } = details;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <Card style={modalStyle} className={classes.paper}>
      <CardContent>
          <Typography className={classes.title} gutterBottom>
          {name}
          </Typography>
          <Typography className={classes.content}>
          {rating.aggregate_rating} from {rating.votes} reviews
          </Typography>
          <Typography className={classes.content}>
          order online: {!!online? 'yes': 'no'}
          </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
