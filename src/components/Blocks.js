import React from "react";
import PropTypes from "prop-types";

import {CircularProgress, Typography, makeStyles} from "@material-ui/core";
import colors from "../constants/colors";

const Blocks = ({ data= [], loading}) => {
  function indexValue(index) {
    if (index <= 9) {
      return `00${index}`;
    }
    if (index >= 10 || index <= 99) {
      return `0${index}`;
    }
    return index;
  }
  const classes = useStyles();
  return (
    <div>
      {
        loading ? <CircularProgress /> :
          data.map(({attributes: {data, index}}) => (
            <div className={classes.contentElement} key={index}>
              <Typography className={classes.indexValue}>{indexValue(index)}</Typography>
              <Typography>{data}</Typography>
            </div>
        ))

      }
    </div>
  )
}

const useStyles = makeStyles( () => ({
  contentElement: {
    backgroundColor: colors.contentBackground,
    padding: '10px',
    margin: '5px'

  },
  indexValue: {
    fontSize: '12px',
   color: colors.primary
  }
  }))

Blocks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        index: PropTypes.string,
        data: PropTypes.string
      })
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default Blocks;
