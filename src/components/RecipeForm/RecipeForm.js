import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(5)
  },
  textField: {
    margin: theme.spacing(3),
    width: '80%'
  },
  button: {
    display: 'block',
    margin: 'auto'
  }
}));

const RecipeForm = ({
  handleSubmit,
  handleChange,
  recipe: { title, instructions, ingredients }
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Recipe title"
          className={classes.textField}
          fullWidth
          value={title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="ingredients"
          name="ingredients"
          label="Ingredients"
          className={classes.textField}
          fullWidth
          multiline
          value={ingredients}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="instructions"
          name="instructions"
          label="Instructions"
          className={classes.textField}
          fullWidth
          multiline
          value={instructions}
          onChange={handleChange}
        />
        <Button
          color="primary"
          disabled={title.length < 1 || ingredients.length < 1}
          className={classes.button}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

RecipeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  instructions: PropTypes.string,
  ingredients: PropTypes.string
};

export default RecipeForm;
