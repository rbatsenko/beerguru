import React from 'react';
import BeerCard from './BeerCard';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BeersGrid extends React.Component {

  render() {
    const { classes, data, isLoading, error } = this.props;

    return (
      typeof error === undefined
      ?
      <Typography>{error}</Typography>
      :
      <Grid container spacing={40}>
        {data.map(card => (       
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <Grow in={!isLoading}>
              <Link to={'/details/' + card.id} className={classes.linkWrapper}>
                <BeerCard
                  classes={classes}
                  id={card.id}
                  name={card.name}
                  tagline={card.tagline}
                  image_url={card.image_url}
                  ibu={card.ibu}
                  abv={card.abv}
                  ebc={card.ebc}
                />
              </Link>
            </Grow>
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(BeersGrid);