import React from 'react';
import { store } from './index';
import { Route, withRouter } from 'react-router-dom';
import Listing from './components/Listing';
import { DetailsWrapped as Details } from './components/Details';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  state = {
    isLoading: true,
    isLoadingMore: false,
    openModal: false,
    data: undefined,
    dataFiltered: undefined,
    page: 1,
    noMoreBeers: false,
    error: undefined,
  }

  handleScroll = () => {
    let bodyScrollHeightAdjusted = document.querySelector('body').scrollHeight - 500;
    if (
      bodyScrollHeightAdjusted <= window.pageYOffset + window.innerHeight 
      &&
      !this.state.isLoadingMore
      &&
      !this.state.noMoreBeers
    ) {
      this.setState({ 
        isLoadingMore: this.state.page === 1 ? false : true
      }, 
        () => {
          if (!this.state.noMoreBeers) {
            this.loadBeers(this.state.page);
          } else {
            this.setState({ isLoadingMore: false });
          }
        }
      );
    }
  }

  loadBeers = async (page = 1) => {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers?per_page=20&page=' + page);

      /* Adding 3 similar beers
        1. Loop through response.data using forEach, find similar beers(filtering items with the same IBU and ABV), concat them to one array and reduce length to 3
        2. So we'll have additional object property with 3 similar beers found in each of our Beer objects and can setState them
        3. Connect them to modalBeer
        Voila :)
      */

      this.setState(prevState => ({
        isLoading: false,
        isLoadingMore: false,
        data: page === 1 ? response.data : [...this.state.data, ...response.data],
        page: prevState.page + 1,
        noMoreBeers: response.data.length < 20 ? true : false
      }),
      () => {
        const { pathname } = this.props.history.location;
        const pathArr = pathname.split('/');

        //if user opens proper beer id link
        if (pathArr[1] === 'details' && /^\d+$/.test(pathArr[2])) { 
          const openBeer = this.state.data.find(beer => beer.id === parseInt(pathArr[2]));
          const openModal = () => ({
            type: 'OPEN_MODAL',
            name: openBeer.name,
            tagline: openBeer.tagline,
            image_url: openBeer.image_url,
            ibu: openBeer.ibu,
            abv: openBeer.abv,
            brewers_tips: openBeer.brewers_tips,
            food_pairing: openBeer.food_pairing,
          });
          store.dispatch(openModal());
        }
      });
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
        isLoadingMore: false,
      });
    }
  }

  searchBeerByName = (e) => {
    let searchWord = e.target.value;
    if (searchWord.length > 0) {
      let dataFiltered = this.state.data.filter(beer =>
        beer.name.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1
      );
      this.setState({ dataFiltered: dataFiltered });
    } else {
      this.setState({ dataFiltered: undefined });
    }
  }

  componentDidMount() {
    this.loadBeers();
    window.onscroll = this.handleScroll;
  }

  render() {
    const { isLoading, isLoadingMore, data, dataFiltered, error } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Route path="/details/:id" render={
          props => (
            <Details {...props} isLoading={isLoading} data={data} history={this.props.history} />
          )
        } />
        <Listing
          isLoading={isLoading} 
          data={data} 
          dataFiltered={dataFiltered} 
          isLoadingMore={isLoadingMore} 
          noMoreBeers={this.state.noMoreBeers} 
          searchBeerByName={this.searchBeerByName}
          error={error}
        />
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);