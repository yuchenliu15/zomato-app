import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DetailModal from '../DetailModal'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 300
  },
  title: {
    fontSize: 25,
    fontWeight: 600
  },
  content: {
    fontSize: 18,
  },
});

const InfoCard = ({ item }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const details = {
    name: item.name,
    rating: item.user_rating,
    online: item.has_online_delivery
  }
  console.log(item)

  const onDetailClick = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {item.name}
          </Typography>
          <Typography className={classes.content}>
            {item.cuisine}
          </Typography>
          <Typography className={classes.content}>
            {item.location?.address}
          </Typography>
          <Typography className={classes.content}>
            {item.price_range}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onDetailClick} size="small">details</Button>
        </CardActions>
      </Card>
      <DetailModal 
        isOpen={open} 
        handleClose={handleClose} 
        details={details}/>
    </div>

  );
}

export default InfoCard;
