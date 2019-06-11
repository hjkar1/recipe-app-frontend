import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const RecipeForm = ({ handleSubmit, recipe }) => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    }
  }, [recipe]);

  return (
    <div className={classes.container}>
      <form>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Recipe title"
          className={classes.textField}
          fullWidth
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          margin="dense"
          id="ingredients"
          label="Ingredients"
          className={classes.textField}
          fullWidth
          multiline
          value={ingredients}
          onChange={({ target }) => setIngredients(target.value)}
        />
        <TextField
          margin="dense"
          id="instructions"
          label="Instructions"
          className={classes.textField}
          fullWidth
          multiline
          value={instructions}
          onChange={({ target }) => setInstructions(target.value)}
        />
        <Button
          onClick={event =>
            handleSubmit(event, { title, ingredients, instructions })
          }
          color="primary"
          disabled={title.length < 1 || ingredients.length < 1}
          className={classes.button}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default RecipeForm;
