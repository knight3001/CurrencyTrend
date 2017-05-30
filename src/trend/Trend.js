import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';

const baseUrl = "http://api.fixer.io/";
const selectedBase = "AUD";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: {},
            getdate: this.props.setdate
        }
    }

    componentDidMount() {
        axios.get(baseUrl + this.props.setdate + '?', {
            params: {
                base: selectedBase,
                symbols: this.props.symbols.join(',')
            }
        })
            .then(response => {
                this.setState({
                    rates: response.data.rates,
                    getdate: response.data.date
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const rates = this.state.rates;
        const symbols = this.props.symbols;
        let buf = [];
        //let a = moment(this.state.date);
        //let base = a.add(1,'day').format('YYYY-MMM-DD');
        for (let i = 0; i < symbols.length; i++) {
            buf.push(<td key={symbols[i] + rates[i]}>{rates[symbols[i]]}</td>);
        }
        return (
            <tr>
                <td>{this.state.getdate}</td>
                {buf}
            </tr>
        )
    }
}


class DateList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const symbols = this.props.symbols;
        return (
            <Cell 
            symbols={symbols} 
            setdate="latest"
            />
        )
    }
}

class TrendTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const symbols = this.props.symbols;
        const symbolsItems = symbols.map((symbol) =>
            <th key={symbol}>{symbol}</th>
        );
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr><th colSpan={symbols.length + 1}>($1 AUD Base)</th></tr>
                    <tr>
                        <th>Date</th>
                        {symbolsItems}
                    </tr>
                </thead>
                <tbody>
                    <DateList symbols={symbols} />
                </tbody>
            </table>
        )
    }
}

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: ['USD','EUR', 'CNY', 'HRK'],
            datezie: 7
        }
    }

    render() {
        const symbols = this.state.symbols;
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title">Currency Exchange Rate</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                            <TrendTable symbols={symbols} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trend;