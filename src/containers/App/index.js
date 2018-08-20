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
  align-items: center;
  width: 100%;
  padding: 10px 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

class App extends React.Component {
  player = false
  state = {
    messages: [],
    url: 'https://www.youtube.com/watch?v=fQGcmamaPO8',
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
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

    socket.on('video', (config) => {
      console.log('yo2', this.player);
      this.setState({...config });
    }
    );

    // socket.emit('testEvent', 'this is a test');
  }

  componentDidUpdate() {

  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing });
  }
  stop = () => {
    this.setState({ /*url: null,*/ playing: false });
  }
  onPlay = () => {
    console.log('onPlay');
    this.setState({ playing: true });
    this.player.seekTo(parseFloat(this.state.played));
    // this.socket.emit('video', {...this.state});
  }
  onPause = () => {
    console.log('onPause');
    this.setState({ playing: false });
    this.player.seekTo(parseFloat(this.state.played));
    // this.socket.emit('video', {...this.state});
  }
  // onSeekChange = e => {
  //   console.log('onSeekChange', e);
  //   this.setState({ played: parseFloat(e.target.value) });
  //   this.socket.emit('video', {...this.state});
  // }
  onProgress = state => {
    console.log('onProgress', this.state);
    this.socket.emit('video', {...this.state, ...state});
  }
  onEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  }
  onDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  }
  // onClickFullscreen = () => {
  //   screenfull.request(findDOMNode(this.player))
  // }
  // renderLoadButton = (url, label) => {
  //   return (
  //     <button onClick={() => this.load(url)}>
  //       {label}
  //     </button>
  //   )
  // }
  ref = (player) => {
    this.player = player;
  }

  render() {
    // console.log(this.state);
    console.log('yo',this.state.playing);
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state
    return (
      <div>
        <H1 on={this.props.isChecked}></H1>
        <Toggle style={{display: 'none'}} onClick={this.props.toggle}/>
        <Content>
          {<VideoPlayer
            // url='https://www.youtube.com/watch?v=fQGcmamaPO8'//'TJ5CpRtoLro'
            playerRef={this.ref}
            className='react-player'
            // width='100%'
            // height='100%'
            url={url}
            playing={playing}
            loop={loop}
            playbackRate={playbackRate}
            // volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e=>console.log('onSeek', e)}//this.onSeekChange}
            onEnded={this.onEnded}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />}
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
