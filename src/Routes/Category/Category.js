/*
  category component to display all the categories
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import { Typography } from '@material-ui/core';
import RecipeCard from '../../Common/RecipeCard/RecipeCard';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';
import LoadMoreSpinner from '../../Common/Spinner/LoadMoreSpinner';
import SortMenuDial from '../../Common/RecipeSort/SortMenuDial';

// misc
import useStyles from './Style';
import { handleScroll } from '../../Common/LoadMore/LoadMore';

const Category = props => {
  const {
    sortOption,
    handleSortRecipes,
    isLoadable,
    handleLoadMore,
    topElementRef,
    displayArray,
    category,
    handleCardClick,
    loadMoreLoading,
    showDial,
    setShowDial
  } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        overflowY: isLoadable ? 'scroll' : 'hidden'
      }}
      onScroll={e => handleScroll(e, isLoadable, handleLoadMore)}
      ref={topElementRef}
      className={classes.categoryRoot}
    >
      {/* top thumbnail part */}
      <div
        className={classes.categoryThumb}
        style={{
          backgroundImage: `url(${category.imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Typography className={classes.categoryTitle} variant='h3'>
          {category.name}
        </Typography>
      </div>

      {/* main body of the category, display all recipes */}
      <div className={classes.categoryBody}>
        <div className={classes.categoryBodyColumn}>
          {displayArray.left.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              name={recipe.postedBy.username}
              likes={recipe.likes}
              thumbnailUrl={recipe.thumbImageUrl}
              bookmarks={recipe.bookmarks}
              rating={recipe.rating}
              recipeId={recipe._id}
              handleCardClick={handleCardClick}
              photoUrl={recipe.postedBy.photoUrl}
            />
          ))}
        </div>
        <div className={classes.categoryBodyColumn}>
          {displayArray.right.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              name={recipe.postedBy.username}
              likes={recipe.likes}
              thumbnailUrl={recipe.thumbImageUrl}
              bookmarks={recipe.bookmarks}
              rating={recipe.rating}
              recipeId={recipe._id}
              handleCardClick={handleCardClick}
              photoUrl={recipe.postedBy.photoUrl}
            />
          ))}
        </div>
      </div>
      {/* loadmore spinner */}
      <LoadMoreSpinner
        textAlt="You've reached the bottom"
        loading={loadMoreLoading}
      />

      <SortMenuDial
        showDial={showDial}
        setShowDial={setShowDial}
        handleSortRecipes={handleSortRecipes}
        activeSelection={sortOption}
      />

      {/* route contains the detail recipe component */}
      <Route
        path='/category/detail/:recipeid'
        render={props => <RecipeDetailContainer {...props} />}
      />
    </div>
  );
};

Category.propTypes = {
  displayArray: PropTypes.objectOf(PropTypes.array).isRequired,
  category: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  topElementRef: PropTypes.any,
  handleLoadMore: PropTypes.func.isRequired,
  isLoadable: PropTypes.bool.isRequired,
  showDial: PropTypes.bool.isRequired,
  setShowDial: PropTypes.func.isRequired,
  handleSortRecipes: PropTypes.func.isRequired
};

export default Category;
