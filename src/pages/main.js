import React, { Component } from 'react'
import KNN from "../components/knn";
import Selecter from "../components/selecter";
import GraphSelector from "../components/graphSelector";
import Graph from "../components/graph";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../css/main.css';

class main extends Component {

	state = {
		columns: [],
		data: [],
		predictors: [],
		label: "",
		xlabel: "",
		ylabel: "",
		x: [],
		y: [],
		c: [],
		xnew: 1,
		ynew: 1,
		k: 3
	}

	componentDidMount() {
		if (this.props.location.data == null) {
			alert('No se pudo obtener ningun dato, reedireccionando....');
			this.props.history.push({
				pathname: '/loaddata'
			});
		}
		else {
			//console.log(this.props.location.data.columnas)
			this.setState({
				columns: this.props.location.data.columnas,
				data: this.props.location.data.datos
			});
		}
	}

	regresarAload = () => {
		this.props.history.replace({
			pathname: "/loaddata"
		})
	}

	getColumnsData = (columnsName) => {
		let obj = new Object(), num = 0;
		for (let col of columnsName) {
			obj[col] = new Array();
			for (let data of this.state.data) {
				num = (data[col] == null || data[col] == undefined) ? 0 : data[col];
				obj[col].push(num);
			}
		}
		return obj;
	}

	selecterCallback(predictors, label) {
		this.setState({ predictors: predictors, label: label }, () => { 
			//console.log(this.state.predictors)
		});
	}

	graphSelectorCallbackX1(ylabel) {
		this.setState({
			ylabel: ylabel
		}, () => {
			this.setState({
				y: this.getColumnsData([this.state.ylabel])
			})
		});
	}

	graphSelectorCallbackX2(xlabel) {
		this.setState({
			xlabel: xlabel
		}, () => {
			this.setState({
				x: this.getColumnsData([this.state.xlabel])
			});
		});
	}

	onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	encoder(label) {
		var classes = label;
		var uniqueClasses = classes.filter(this.onlyUnique);
		var classified_pairs = new Array();

		for (var i = 0; i < classes.length; i++) {
			classified_pairs[i] = uniqueClasses.indexOf(classes[i]);
		}
		return classified_pairs;
	}


	render() {
		const x_1 = this.getColumnsData([this.state.xlabel])[this.state.xlabel],
			x_2 = this.getColumnsData([this.state.ylabel])[this.state.ylabel],
			c = this.getColumnsData([this.state.label])[this.state.label],
			y = this.encoder(c),
			labels = c.filter(this.onlyUnique),
			newpoint = {x: parseFloat(this.state.xnew), y: parseFloat(this.state.ynew)};
		return (
			<React.Fragment>
				<div className="mainContenedor">
					<div className="container" id='genContenedor'>
						<div className="row">
							<div className="jumbotron" style={{ background: 'transparent' }}>
								<h1 className="display-4">Herramienta interactiva para clasificación por KNN</h1>
								<p className="lead">Esta herramienta facilita el realizar KNN desde una aplicación facil y util. Las opciones intuitivas te guiaran a lo largo del proceso.</p>
								<hr className="my-3"></hr>

								<p>Desarrollado por: Gerardo Meneses, Pablo Diaz, Diego Garibay y Kevin Huerta</p>
							</div>
						</div>

						<div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
							<AgGridReact
								columnDefs={this.state.columns}
								rowData={this.state.data}
								pagination={true}>
							</AgGridReact>
						</div>
						<br></br>
						<button className="btn btn-primary btn-lg" onClick={this.regresarAload}>Usar otro dataset</button>

						<hr className="my-4" color='yellow'></hr>

						<div className="row">
							<div className="col-6">
								<div>Cantidad de vecinos:</div>
								<input type='numeric' value={this.state.k} onChange={ (e) => { this.setState({ k: e.target.value})}}/>

								<KNN x={x_1} y={y} knn={this.state.k} predictors={this.state.predictors} labels={labels} />
							</div>
							<div className="col-6">
								<Selecter columns={this.props.location.data.columnas} predictors={this.state.predictors} label={this.state.label} selecterCallback={this.selecterCallback.bind(this)} />
							</div>
						</div>

						<hr className="my-4" color='yellow'></hr>

						<div className="row align-items-center" >

							<div className="col-4">
								<div>Elige tus predictores para gráficar:</div>
								<br></br>

								<div> Predictor en X: <GraphSelector columns={this.props.location.data.columnas} returnData={this.graphSelectorCallbackX2.bind(this)}></GraphSelector></div>
								<br></br>
								<div> Predictor en Y: <GraphSelector columns={this.props.location.data.columnas} returnData={this.graphSelectorCallbackX1.bind(this)}></GraphSelector></div>
								
								<br></br>
								<br></br>
								<div>Gráfica tu punto:</div>
								<br></br>

								<div>
									X: <input type='numeric' value={this.state.xnew} onChange={ (e) => { this.setState({ xnew: e.target.value})}}/>
								</div>
								<br></br>
								<div>
									Y: <input type='numeric' value={this.state.ynew} onChange={ (e) => { this.setState({ ynew: e.target.value})}}/>
								</div>
							</div>
							<div className="col-8">
								<Graph xlabel={this.state.xlabel} ylabel={this.state.ylabel} x={x_1} y={x_2} c={c} point={newpoint}></Graph>
								<br></br>
								<br></br>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default main;
