import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const BASE_URL = 'http://localhost:3000'
const STOCKS_URL = BASE_URL + '/stocks'

class MainContainer extends Component {

  state = {
    stocks: [],
    myStocks : [],
    filterBy: 'None',
    sortBy: 'None'
  }

  componentDidMount() {
    fetch(STOCKS_URL)
    .then(response => response.json())
    .then(stocksData => this.setState({stocks: stocksData}))
  }

  addStockToMyStocksState = (stock) => {
    if (!this.state.myStocks.includes(stock)) {
      this.setState({myStocks: [...this.state.myStocks, stock]})
    }
  }

  removeStockFromMyStocksState = (stock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(s => {return s !== stock})
    })
  }

  filteredStocks = () => {
    let stocks = [...this.state.stocks]

    if (this.state.filterBy !== 'None') {
      stocks = stocks.filter(stock => {return stock.type === this.state.filterBy})
    }

    if (this.state.sortBy === 'Alphabetically') {
      stocks = stocks.sort((a, b) => {return a.name.localeCompare(b.name)})
    } else if (this.state.sortBy === 'Price') {
      stocks = stocks.sort((a, b) => {return b.price - a.price})
    }

    return stocks
  }

  changeFilterBy = (value) => { this.setState({filterBy: value}) }
  changeSortBy = (value) => { this.setState({sortBy: value}) }

  render() {
    return (
      <div>
        <SearchBar 
          changeFilterBy={this.changeFilterBy} 
          changeSortBy={this.changeSortBy} 
          sortBy={this.state.sortBy}
        />
          <div className="row">
            <div className="col-8">
              <StockContainer 
                stocks={this.filteredStocks()} 
                addStockToMyStocksState={this.addStockToMyStocksState}
              />
            </div>
            <div className="col-4">
              <PortfolioContainer 
                stocks={this.state.myStocks} 
                removeStockFromMyStocksState={this.removeStockFromMyStocksState} 
              />
            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;
