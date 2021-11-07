import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { useStoreContext } from '../../utils/GlobalState';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/productSlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();
  // const state = useSelector(state => state);
  const categories = useSelector(state => state.product.categories);
  const dispatch = useDispatch();
  // console.log(state);
  // const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(UPDATE_CATEGORIES(categoryData.categories));
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(UPDATE_CATEGORIES(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch(UPDATE_CURRENT_CATEGORY(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
