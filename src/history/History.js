import React, { Component } from 'react';
import myData from './yeardata.csv';

var d3 = require("d3");

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 960,
            height: 500
        }
    }

    render() {
        return (
            <div className="panel panel-success">
                <div className="panel-heading"><h3 className="panel-title">Historical Currency Exchange Rate</h3></div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <SvgChart {...this.state} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SvgChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart();
    }
    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart(){
        const node = this.node;
        let svg = d3.select(node);
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = this.props.width - margin.left - margin.right;
        const height = this.props.height - margin.top - margin.bottom;
        const translate = "translate(" + margin.left + "," + margin.top + ")";
        let outerG = svg.append("g").attr("transform", translate);
        
        const x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        const x1 = d3.scaleBand()
            .padding(0.05);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        const z = d3.scaleOrdinal()
            .range(["#95ffc7", "#e6f0fa", "#ffcccc", "#0eadca", "#fef65b", "#50e3c2", "#ff3737"]);

        
        d3.csv(myData, function(d, i, columns) {
            for (var j = 1, n = columns.length; j < n; ++j) {
                d[columns[j]] = +d[columns[j]];
            }
            console.log(d);
            return d;
        }, function(error, data) {
            if (error){ 
                throw error;
            }
            var keys = data.columns.slice(1);

            x0.domain(data.map(function(d) { return d.CurrencyCode; }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

            outerG.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0(d.CurrencyCode) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return z(d.key); });

            outerG.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            outerG.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Exchange Rate ($1 USD)");

            var legend = outerG.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        });
    }
   
    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.props.width} height={this.props.height}>
            </svg>
        )
    }
}

export default History;