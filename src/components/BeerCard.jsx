import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { connect } from 'react-redux';

const BeerCard = props => {
  const { classes, name, tagline, image_url } = props;

  const openModal = (id, name, tagline, image_url, ibu, abv, ebc) => {
    id = props.id;
    name = props.name;
    tagline = props.tagline;
    image_url = props.image_url;
    ibu = props.ibu;
    abv = props.abv;
    ebc = props.ebc;
    props.openModal(id, name, tagline, image_url, ibu, abv, ebc);
  }

  return (
    <Card 
      className={classes.card}
      onClick={openModal}
    >
      <CardMedia
        className={classes.cardMedia}
        image={image_url}
        title={name}
      />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentTitle} gutterBottom variant="h6" component="h2">
          {name}
        </Typography>
        <Typography className={classes.cardContentTagline}>
          {tagline}
        </Typography>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  openModal: (id, name, tagline, image_url, ibu, abv, ebc) => dispatch({
    type: 'OPEN_MODAL',
    id: id,
    name: name,
    tagline: tagline,
    image_url: image_url,
    ibu: ibu,
    abv: abv,
    ebc: ebc,
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerCard);