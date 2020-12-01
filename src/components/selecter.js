import React from 'react'


class Selecter extends React.Component{

	state = {
		labelsHtml: [],
		checkBoxes: []
	}

	componentDidMount(){
		if(this.props.columns.length > 0){
			let { labelsHtml,checkBoxes } = this.state;
	
			labelsHtml.push(<option value={'Default'} key={'Default'}>Escoge una opcion</option>)

			for(let i = 0; i < this.props.columns.length; i++){
				labelsHtml.push(<option value={this.props.columns[i]['field']}>{this.props.columns[i]['field']}</option>)
				checkBoxes.push(
					<div className="form-check form-check-inline">
					{this.props.columns[i]['field']}
					<input className='ml-1' name={this.props.columns[i]['field']} type="checkbox" onChange={this.onChangePredictors.bind(this)}/>
					</div>);
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

	onChangeLabel(e){
		//console.log(e.target.value)
		this.props.selecterCallback(this.props.predictors,e.target.value);
	}
		
	onChangePredictors(e){
		let p = this.props.predictors;
		if(p.includes(e.target.name)){
			let indice = p.indexOf(e.target.name)
			p.pop(indice)
		}else p.push(e.target.name);
		this.props.selecterCallback(p,this.props.label);
	}

	render(){
		const { labelsHtml, checkBoxes} = this.state;
		return(
			<React.Fragment>
				<div className= "row justify-content-center text-center">
					<div className='col'>
						<label htmlFor='elSelect'><h6>Selecciona tu respuesta (clasificaciones):</h6></label>
						<br></br>
						<select name='elSelect' onChange={this.onChangeLabel.bind(this)}>
							{ labelsHtml }
						</select>
					</div>
				</div>
				<div className= "row justify-content-center text-center">
					<div className='col'>
						<label htmlFor='losCheckboxes'><h6>Marca los predictores a usar (X):</h6></label>
						<label htmlFor='losCheckboxes'><h6>*Nota: Se debe seleccionar en orden descendiente ↓ y deseleccionar en orden ascendente ↑*</h6></label>
						<div name ='losCheckboxes' className='pt-2'>
							{ checkBoxes }
						</div>
					</div>
				</div>



			</React.Fragment>
		)
	}
}

export default Selecter;
