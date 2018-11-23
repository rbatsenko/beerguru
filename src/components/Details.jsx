import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: theme.spacing.unit,
  },
  cardMedia: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    paddingTop: '200%',
    backgroundSize: 'contain',
  },
  mt2: {
    marginTop: theme.spacing.unit * 2,
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2,
  },
  pl3: {
    paddingLeft: theme.spacing.unit * 3,
  }
});

class Details extends React.Component {
  handleClose = () => {
    this.props.closeModal();
    this.props.history.push('/');
  }
  render() {
    const { classes, modalBeer, isLoading } = this.props;

    return (
      <Modal
        aria-labelledby="beer-modal-title"
        aria-describedby="beer-modal-description"
        disableAutoFocus={true}
        open={this.props.isModalOpen}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          {
            isLoading
            ?
            <CircularProgress />
            :
            <div className="modal-inner">
              <Grid container>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={modalBeer && modalBeer.image_url}
                    title={modalBeer ? modalBeer.name : 'Example name'}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={9} lg={9} className={classes.pl3}>
                  <Typography variant="h6">
                    {modalBeer ? modalBeer.name : 'Example name'}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.mb2}>
                    {modalBeer ? modalBeer.tagline : 'Example tagline'}
                  </Typography>
                  <Grid container className={classes.mb2}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Typography><strong>IBU:</strong> {modalBeer ? modalBeer.ibu : ''}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Typography><strong>ABV:</strong> {modalBeer ? modalBeer.abv : ''}</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="subtitle1"><strong>Tips</strong></Typography>
                  <Typography className={classes.mb2}>
                    {modalBeer ? modalBeer.brewers_tips : 'Example tips'}
                  </Typography>
                  <Typography variant="subtitle1"><strong>Best served with:</strong></Typography>
                  {
                    modalBeer
                    ?
                    modalBeer.food_pairing.map((dish, index) => (
                      <Typography key={index} variant="subtitle1">- {dish}</Typography>
                    ))
                    :
                    ''
                  }
                </Grid>
              </Grid>
              <Typography className={classes.mt2} variant="subtitle1"><strong>You might also like:</strong></Typography>
            </div>
          }
        </div>
      </Modal>
    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isModalOpen: state.isModalOpen,
  modalBeer: state.modalBeer,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({ type: 'CLOSE_MODAL' })
});

const DetailsConnect = connect(mapStateToProps, mapDispatchToProps)(Details);

export const DetailsWrapped = withStyles(styles)(DetailsConnect);