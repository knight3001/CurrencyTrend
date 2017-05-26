import { Component } from 'react';

class Trend extends Component{
    constructor(){
        super();
        this.state = {
            gender: 1,   //1 for male, 0 for female
            name: ''
        }
    }
}

export default Trend;