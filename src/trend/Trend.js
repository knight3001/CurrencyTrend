import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';

const baseUrl = "http://api.fixer.io/";
const selectedBase = "AUD";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: {}
        }
    }

    componentDidMount() {
        axios.get(baseUrl + this.props.date + '?', {
            params: {
                base: selectedBase,
                symbols: this.props.symbols.join(',')
            }
        })
            .then(response => {
                this.setState({
                    rates: response.data.rates
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
        if (Object.keys(rates).length === 0) {
            return null;
        }
        else {
            return (
                <tr>
                    <td>{moment(this.props.date).format('YYYY-MMM-DD')}</td>
                    {buf}
                </tr>
            )
        }
    }
}


class DateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: []
        }
    }

    componentWillReceiveProps(nextProps) {
        let oldday = moment();
        const len = parseInt(nextProps.datesize, 10);
        let dates = [];
        let i = 0;
        let newday, newdayweek;
        if (len > 0) {
            while (i < len) {
                newday = oldday.add(-1, 'd');
                newdayweek = parseInt(newday.format('e'), 10);
                if (newdayweek !== 0 && newdayweek !== 6) {
                    dates.push(newday.format('YYYY-MM-DD'));
                    oldday = newday;
                    i += 1;
                }
            }
            this.setState({
                dates: dates
            })
        }
    }

    render() {
        let buf = [];
        const dates = this.state.dates;
        for (let i = 0; i < dates.length; i++) {
            buf.push(<Cell symbols={this.props.symbols} date={dates[i]} key={i} />);
        }
        return (
            <tbody>
                {buf}
            </tbody>
        )
    }
}

class TrendTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const symbols = this.props.symbols;
        const datesize = this.props.datesize;
        const symbolsItems = symbols.map((symbol) =>
            <th key={symbol}>{symbol}</th>
        );
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr><th colSpan={symbols.length + 1}>($1 AUD Base) {datesize} days trace back</th></tr>
                    <tr>
                        <th>Date</th>
                        {symbolsItems}
                    </tr>
                </thead>
                <DateList
                    symbols={symbols}
                    datesize={datesize}
                />
            </table>
        )
    }
}

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.datesize.value
        )
    }

    render() {
        return (
            <form className="form-horizontal">
                <fieldset >
                    <div className="form-group">
                        <label htmlFor="playerX" className="col-sm-3 control-label">Trace Days</label>
                        <div className="input-group col-sm-2">
                            <input type="number" min="1" max="30" className="form-control" id="datesize" placeholder="1-30" maxLength="10"
                                value={this.props.datesize} ref={(input) => this.datesize = input} onChange={this.handleChange} />
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

class Trend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: ['USD', 'EUR', 'CNY', 'HRK'],
            datesize: 0
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(datesize) {
        this.setState({
            datesize: datesize
        })
    }

    render() {
        const symbols = this.state.symbols;
        const datesize = this.state.datesize;
        return (
            <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                <UserForm
                    datesize={this.state.datesize}
                    onUserInput={this.handleUserInput}
                />
                <TrendTable
                    symbols={symbols}
                    datesize={datesize}
                />
            </div>
        )
    }
}

export default Trend;