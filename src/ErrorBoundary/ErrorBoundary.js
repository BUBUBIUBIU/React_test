import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage:'' 
    }

    componentDidCatch= (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }
    
    render() {
        if (this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>;
        }else{
            // 这里放的就是我们原本要展示的内容
            return this.props.children;
        }
    }
}

export default ErrorBoundary;