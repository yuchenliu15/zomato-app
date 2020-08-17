import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    fontWeight: 600
  },
  content: {
    fontSize: 18,
  },
});

const InfoCard = ({ name, type, address, price }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.content}>
          {type}
        </Typography>
        <Typography className={classes.content}>
          {address}
        </Typography>
        <Typography className={classes.content}>
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">details</Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;
