import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import BeersGrid from '../components/BeersGrid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbarContainer: {
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbar: {
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      padding: 0,
    },
  },
  appLink: {
    color: 'white',
    textDecoration: 'none',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  layout: {
    position: 'relative',
    width: 'auto',
    minHeight: '65vh',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loader: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-20px',
    top: '50%',
    marginTop: '-20px',
  },
  loaderMoreContainer: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: theme.spacing.unit * 2,
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create(
      ['height', 'margin-top'],
      { duration: theme.transitions.duration.complex }
    ),
    '&.active': {
      height: 40,
      marginTop: theme.spacing.unit * 10,
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  linkWrapper: {
    textDecoration: 'none',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: theme.transitions.create(
      'box-shadow',
      { duration: theme.transitions.duration.complex }
    ),
    '&:hover': {
      boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.2)'
    }
  },
  cardMedia: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    paddingTop: '75%',
    backgroundSize: 'contain',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const Listing = props => {
  const data = props.dataFiltered ? props.dataFiltered : props.data;
  const { isLoading, isLoadingMore, classes, noMoreBeers, error } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <div className={classes.toolbarContainer}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>
              <a className={classes.appLink} href="/" title="Beerguru">Beerguru</a>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyUp={props.searchBeerByName}
              />
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {
            isLoading
            ?
            <CircularProgress className={classes.loader} />
            :
            <BeersGrid 
              classes={classes}
              data={data}
              isLoading={isLoading}
              error={error}
            />
          } 
          <div className={`${classes.loaderMoreContainer} ${isLoadingMore || noMoreBeers ? 'active' : ''}`}>
          {
            isLoadingMore
            &&
            <CircularProgress />
          }
          {
            noMoreBeers
            &&
            <Typography>No more beers to be loaded :/</Typography>
          }
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          © Beerguru 2018
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Shows the most "beerest" beers :)
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Listing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Listing);