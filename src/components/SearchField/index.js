import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const SearchField = () => {
  const classes = useStyles();
  const [input, setInput] = useState('');

  const onInputChange = e => setInput(e.target.value)

  const onSearch = e => {
    e.preventDefault();
    console.log(input)
  }

  return (
    <form className={classes.root} onSubmit={onSearch}>
      <TextField 
        id="outlined-basic" 
        value={input}
        onChange={onInputChange}
        variant="outlined" />
      <Button type="submit" variant="contained">search!</Button>
    </form>
  );
}

export default SearchField;