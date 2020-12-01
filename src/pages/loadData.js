import React, { Fragment } from 'react';
import Papa from 'papaparse';
import '../css/loadData.css';
import logoCetys from '../imgs/cetyslogo.png';
import requ1 from '../imgs/req1.PNG';

class loadData extends React.Component {
    state = {
        csvFile: undefined,
        columnDefs: []
    }
    
    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };
  
    importCSV = () => {
        const { csvfile } = this.state;
        if(csvfile !== undefined){
            Papa.parse(csvfile, {
                complete: (results) => {this.saveData(results)},
                header: true,
                dynamicTyping: true
              });
        }
        else{
            alert('Favor de seleccionar un dataset')
        }
    };
    
    saveData = (results) => { 
        const { columnDefs } = this.state;

        results.data.pop(); //Quita la observacion nula, y dibujaba punto en (0,0)
        //Aqui genera las columnas
        for(let i = 0; i < results.meta['fields'].length; i++){
            columnDefs.push({headerName: results.meta['fields'][i].toString(), field: results.meta['fields'][i]})
        }

        this.setState({columnDefs: columnDefs}, () => {
            this.props.history.push({
                pathname: "/main",
                data: {
                    columnas: columnDefs,
                    datos: results.data
                }})
        })
    }

    render() {
        return (
            <Fragment>
                <div className='backgroundMain'>
                    <div className='contenedor pt-4'>
                        <h1>Herramienta interactiva para clasificación por KNN</h1>
                        <img id='logoCetys' src={logoCetys}></img>
    
                        <h3 className='p-3'>Importa tu archivo CSV!</h3>
                        <input className="csv-input" type="file"  name="file" placeholder={null} onChange={this.handleChange}/>
                        <p/>
                        <button onClick={this.importCSV}> Enviar Datos</button>

                        <h4 className='p-3'>Requisitos para un correcto funcionamiento:</h4>
                        <li>La primera fila del archivo CSV, debe contener el nombre de los predictores. Ejemplo:</li>
                        <img id='req1' src={requ1}></img>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default loadData;
