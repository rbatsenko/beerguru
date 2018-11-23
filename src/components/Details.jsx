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
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: theme.spacing.unit,
  },
  cardMedia: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    paddingTop: '75%',
    backgroundSize: 'contain',
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
              <CardMedia
                className={classes.cardMedia}
                image={modalBeer && modalBeer.image_url}
                title={modalBeer ? modalBeer.name : 'Example name'}
              />
              <Typography variant="h6">
                {modalBeer ? modalBeer.name : 'Example name'}
              </Typography>
              <Typography variant="subtitle1">
                {modalBeer ? modalBeer.tagline : 'Example tagline'}
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography><strong>IBU:</strong> {modalBeer.ibu}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography><strong>ABV:</strong> {modalBeer.abv}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography><strong>EBC:</strong> {modalBeer.ebc}</Typography>
                </Grid>
              </Grid>
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