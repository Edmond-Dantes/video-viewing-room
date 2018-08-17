import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Toggle from 'components/Toggle';
import { toggle } from 'actions';
// import ReactPlayer from 'react-player';
import VideoPlayer from 'containers/VideoPlayer';
import io from 'socket.io-client';

const H1 = styled.h1`
  color: ${props=> props.on ? props.theme.global.blue : props.theme.global.black};
  height: 20vh;
`;

const Button = styled.button`
  color: white;
  background-color: ${props=> props.theme.global.blue};
  width: 50px;
  height: 30px;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

class App extends React.Component {

  state = {
    messages: [],
  }

  componentDidMount() {
    this.input = document.getElementById('userInput');
    this.ul = document.getElementById('contentUl');
    // const io = require('socket.io-client');
    this.socket = io({
      autoConnect: true,
    });

    const socket = this.socket;

    socket.on('connect', (message) => {
      // debugger;
      console.log('Connection opened:', socket.connected); // true
    });

    socket.on('message', (message) => {
      console.log(message);
      this.setState((state)=>{
          return { messages: [...state.messages, message] };
        }
      );
    }
    );

    // socket.emit('testEvent', 'this is a test');
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <H1 on={this.props.isChecked}></H1>
        <Toggle style={{display: 'none'}} onClick={this.props.toggle}/>
        {/*<VideoPlayer
          url='https://www.youtube.com/watch?v=TJ5CpRtoLro'
        />*/}
        <Content>
          <FormWrapper>
            <Input id='userInput'/>
            <Button
              onClick={()=>this.socket.emit('testEvent', this.input.value)}
            >
            submit
            </Button>
          </FormWrapper>
          <ul style={{width: '100%'}} id='contentUl'>
            {
              this.state.messages.map((message)=>{
                return (
                  <li>
                    {message}
                  </li>
                );
              })
            }
          </ul>
        </Content>
      </div>
    );
  }
}

App.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isChecked: state.toggle.get('isChecked'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggle()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(App);
