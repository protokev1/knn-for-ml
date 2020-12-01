import React from 'react';
import * as math from "mathjs";

class KNN extends React.Component {
	constructor(props){
		super(props); 
		/**
		 * this.props.labels
		 * this.props.x
		 * this.props.y
		 * this.props.knn
		 * this.props.predictors
		 */
		this.new_x = new Object();
		this.state = {
			pred:"undefined"
		}
	}

	onClickPredict(){
		let x = new Array();
		for(let p of this.props.predictors){
			x.push(this.new_x[p])
		}
		const pred = this.predict(x);
		this.setState({pred:this.props.labels[pred]});
	}

	norm(x1,x2){
     	return math.subtract(x1,x2).map(x=>x**2)
    }
	
	predict(new_x) {
		try{
			let nb_distance = new Array(),
				k_nearest_neighbours = new Array(),
				k_neighbours_label = new Array(),
				nb_distance_clone = new Array(),
				label_counter = math.zeros(this.props.y.length)._data;
			
			// Calculating distance between 'x' and 'x_i'
			const X = math.matrix(this.props.x),
				size = X.size();
			if(size.length===1){
				console.log(this.props.x);
				nb_distance = this.norm(this.props.x,new_x[0])//<---new_x=number
			}else if(size.length===2){
				for(let i=0;i<size[1];i++){
					nb_distance.push(this.norm(math.flatten(math.column(X,i)),new_x));//<---new_x
				}
			}
			// picking 'k' nearest neighbours.
			nb_distance_clone = nb_distance.copyWithin()
			for(let i=0;i<this.props.knn;i++){
				k_nearest_neighbours.push(nb_distance_clone.indexOf(math.min(nb_distance)) + i);
				nb_distance_clone.splice(k_nearest_neighbours[i],1);
			}

			// Getting the label of the 'k' nearest neighbours
			k_neighbours_label = k_nearest_neighbours.map(index=>this.props.y[index]);

			// `Predicting`
			for(let label of k_neighbours_label){
				label_counter[label] += 1
			}
			return label_counter.indexOf(math.max(label_counter))
		}catch(error){
			alert("No sirve dataset");
		}
	}

	renderForm(){
		let inputBoxes = new Array();
		
		for(let p of this.props.predictors){
			inputBoxes.push(
				<React.Fragment>	
				{p} <input type="number" name={p} onChange={this.onChangeNewX.bind(this)}/>
				<br></br>
				</React.Fragment>
			)
		}

		//console.log(this.new_x)
		console.log(this.props.labels)
		console.log(this.new_x)
		//console.log(this.state.pred)

		return inputBoxes;
	}

	onChangeNewX(e){
		const key = e.target.name;
		const value = e.target.value;
		this.new_x[key] = value;
	}
		
	render(){
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col-12 d-flex justify-content-center">
						Predictors:
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							{this.renderForm()}
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<button type="button" className="btn btn-primary w-50 mt-3" onClick={this.onClickPredict.bind(this)}>Predict</button>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							Clase Perteneciente: {this.state.pred}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default KNN;


