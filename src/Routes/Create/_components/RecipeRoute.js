import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, InputAdornment } from '@material-ui/core';
import { Title, Description } from '@material-ui/icons';
import ImageOption from './ImageOption';
import Ingredients from './Ingredients';

const RecipeRoute = props => {
  const { classes } = props;
  const [ingredients, setIngredients] = useState([]);

  return (
    <div className={classes.routeRoot}>
      <Typography className={classes.routeTitle} component='div' variant='h6'>
        Create new recipe
      </Typography>
      <ImageOption
        urlText='Thumbnail Url'
        fileText='Upload thumbnail'
        classes={classes}
      />
      <TextField
        size='small'
        placeholder='Title of your recipe'
        variant='outlined'
        label='Title'
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Title />
            </InputAdornment>
          )
        }}
      />
      <TextField
        size='small'
        placeholder='Description of your recipe'
        variant='outlined'
        label='Description'
        multiline
        rows={3}
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Description />
            </InputAdornment>
          )
        }}
      />

      <Ingredients
        classes={classes}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </div>
  );
};

RecipeRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecipeRoute;