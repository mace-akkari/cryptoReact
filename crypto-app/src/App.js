import React, { Component } from 'react';
import './App.css';
import RateList from './RateList';
import { getRates } from './currencylibrary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currency: props.currencyList[0],
      rates: [],
      error: false
    };
    this.fetchRates = this.fetchRates.bind(this);
  }

  async fetchRates(currency) {
    this.setState({
      loaded: false
    });
    const rates = await getRates(currency, this.props.currencyList);
    this.setState({
      loaded: true,
      currency,
      rates
    });
  }

  async componentDidMount() {
    const { currency } = this.state;
    const rates = await getRates(currency, this.props.currencyList);
    this.setState({
      loaded: true,
      rates
    });
  }

  componentDidCatch() {
    console.log('error')
    this.setState({ error: true });
  }

  render() {
    const { currency, loaded, rates, error } = this.state;
    const { currencyList } = this.props;
    const currencyButtons = currencyList
      .map((c) => (<button className="currencyBtn"onClick={() => this.fetchRates(c)}>{c}</button>))
    return (
      <div className="App">
        <h1>Crypto API</h1>
        {currencyButtons}
        <h2>{`You have chosen to compare`}</h2> <span>{`${currency} against:`}</span>
        {error ? <h2>ERROR HAS OCCURED</h2> : ""}
        {loaded && !error ? <RateList rates={rates} /> : "Loading"}
      </div>
    );
  }
}

App.defaultProps = {
  currencyList: ["GBP", "USD", "BTC", "ETH", "LTC"]
}

export default App;