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
        ref={this.props.playerRef}
        {...this.props}
      />
    );
  }
}

export default VideoPlayer;
