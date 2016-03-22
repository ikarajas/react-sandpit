import React from "react";
import ReactDOM from "react-dom";
import axios from "axios"

class FooComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "Fred",
			attacks: []
		};
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}
	
	componentWillMount() {
		this.setState({
			name: "Bill"
		});
	}
	
	handleButtonClick() {
		var self = this;
		
		this.setState({
			name: "Dave"
		});

		axios.get('http://www.sharkattackdata.com/api/attacks', {
			params: { country: "new_zealand" }
		})
		.then(function (response) {
			console.log(response);
			self.setState({
				attacks: response.data
			});
		})
		.catch(function (response) {
			console.log(response);
		});
	}
	
	render() {
		var attackNodes = this.state.attacks.map(function(a){
			return <Attack key={a.gsafCaseNumber} attackObj={a} />
		});
		return (
			<div>
				<div>{this.state.name}</div>
				<div>
					<button onClick={this.handleButtonClick}>Click me</button>
				</div>
				{ attackNodes }
			</div>
		)
	}
}

class Attack extends React.Component {
	render() {
		return (
			<div>{this.props.attackObj.location}</div>
		)
	}
}

ReactDOM.render(
	<FooComponent />,
	document.getElementById("app"));