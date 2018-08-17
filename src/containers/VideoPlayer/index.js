import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactPlayer from 'react-player';

class VideoPlayer extends React.Component {

  render() {
    return (
      <ReactPlayer
        controls
        playing
        url={this.props.url}
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,
              // controls: 0,
            }
          },
          // facebook: {
          //   appId: '12345'
          // }
        }}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={() => console.log('onPlay')}
        onPause={() => console.log('onPause')}
        onBuffer={() => console.log('onBuffer')}
        onSeek={e => console.log('onSeek', e)}
        onEnded={() => console.log('onEnded')}
        onError={e => console.log('onError', e)}
        onProgress={state => console.log('onProgress', state)}
        onDuration={duration => console.log('onDuration', duration)}
      />
    );
  }
}

export default VideoPlayer;
