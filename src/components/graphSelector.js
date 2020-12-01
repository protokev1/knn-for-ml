import React, { Component } from 'react'

class graphSelector extends Component {

	state = {
		labelsHtml: [],
		checkBoxes: []
	}

    componentDidMount(){
		if(this.props.columns.length > 0){
			let { labelsHtml,checkBoxes } = this.state;
			
			labelsHtml.push(<option value={'Default'} key={'Default'}>Escoge una opcion</option>)
			
			for(let i = 0; i < this.props.columns.length; i++){
				labelsHtml.push(<option value={this.props.columns[i]['field']} key={this.props.columns[i]['field']}>{this.props.columns[i]['field']}</option>)
				checkBoxes.push(<div className='d-flex justify-content-around'>{this.props.columns[i]['field']}<input name={this.props.columns[i]['field']} type="checkbox" onChange={this.onChangePredictors} /></div>);
			}
	
			this.setState({
				labelsHtml: labelsHtml,
				checkBoxes: checkBoxes
			})
		}
		else{
			this.setState({
				labelsHtml: <option value='Nada'>Nullptr</option>,
				checkBoxes: <input type="checkbox"/>
			})
		}
	}
	
	sendDataToParent(e){
		//console.log(e.target.value)
		this.props.returnData(e.target.value) //Callback, params => Access in parent
	}
    
    render() {
        const { labelsHtml } = this.state;
        return (
            <React.Fragment>
				<select onChange={this.sendDataToParent.bind(this)}>
					{ labelsHtml }
				</select>
            </React.Fragment>
        )
    }
}

export default graphSelector;
