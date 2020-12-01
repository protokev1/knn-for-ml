import React from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts'

//recibe     x: valores x , y: valores y , c: las clasificaciones , xlabel: descripcion , ylabel: descripcion
class Graph extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			classes: this.props.c,
			xlabel: this.props.xlabel,
			ylabel: this.props.ylabel
			//newdata: this.pairs_creator()
		}
    }
    
	onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

    pairs_creator(){
		var xvals = this.props.x;
		var yvals = this.props.y;
		var classes = this.props.c;
		var uniqueClasses = classes.filter(this.onlyUnique);
		var newpairs = new Array();
		var classified_pairs = new Array();

		for (var i = 0; i < xvals.length; i++) {
			newpairs.push({x: xvals[i],y: yvals[i], c: classes[i]})
		}

		for (var i = 0; i < uniqueClasses.length; i++) {
			classified_pairs[i] = newpairs.filter(function(item){
					return item.c == uniqueClasses[i];
				}
			)
		}

		var data = new Array();

		
		for (var i = 0; i < classified_pairs.length; i++) {
			data.push(
				{
						type: "scatter",
						color: this.getRandomColor(),
						legendText: "Clase: " + uniqueClasses[i],
						showInLegend: "true",
						markerSize: 5,
						toolTipContent: this.props.xlabel+": {x}  "+ this.props.ylabel +": {y}",
						dataPoints: classified_pairs[i]
				}
			)
		}				
		data.push(
			{
					type: "scatter",
					color: this.getRandomColor(),
					legendText: "Punto de prueba",
					showInLegend: "true",
					markerSize: 5,
					toolTipContent: this.props.xlabel+": {x}  "+ this.props.ylabel +": {y}",
					dataPoints: [this.props.point]
			}
		)
		
		return data;
	}

	render() {
		//console.log(this.props.xnew)
		//console.log(this.props.ynew)
		//console.log('graph se renderiza')

		const options = {
			theme: "light2",
			animationEnabled: true,
			zoomEnabled: true,
			title:{
				text: this.props.xlabel + " vs " + this.props.ylabel
			},
			axisX: {
				title: this.props.xlabel,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY:{
				title: this.props.ylabel,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			legend: {
				verticalAlign: "bottom",
				horizontalAlign: "left"
		  
			  },
			data: this.pairs_creator()
        }
        
		return (
			<React.Fragment>
				<CanvasJSChart options = {options} />	
			</React.Fragment>		
		  );
		}
}
export default Graph;