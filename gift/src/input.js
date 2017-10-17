import React from 'react';

export default class Input extends React.Component{
    constructor(props){
        super(props);
        this.state ={
           value:"" 
        }
    }
    inputChanged(e){
        this.setState({
            value: e.target.value
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.state.value !== nextState.value;
    }
    componentDidUpdate(prevProps, prevState){
	   this.props.onChange(this.state.value,this.props.Name); 
    }
    render(){
        let type="text";
        let required=false;
        this.props.Name==="email_address"? type="email": type="text";
        this.props.Name==="phone_number"?type="tel":type="text";
        this.props.Name!=="special_notes"?required = true:required=false;
        
        const phoneRegEx = "[0-9]{10}";
        let pattern= null;
        this.props.Name==="phone_number"?pattern = phoneRegEx:pattern=null;
        
        return(
             <div className="form-group">
                <label className="control-label col-sm-2" htmlFor={this.props.Name}> {this.props.Name}:</label>
                <div className="col-sm-10">
                    <input type={type} id={this.props.Name} name={this.props.Name} value={this.state.value} 
                    onChange={(e)=>this.inputChanged(e)} pattern={pattern}
                    required={required} className="form-control" />
                </div>
            </div>
        );
    }
}
