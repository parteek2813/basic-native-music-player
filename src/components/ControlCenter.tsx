import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPLayer, {State, usePlaybackState} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {playbackService} from '../../musicPlayerServices/musiPlayerServices';

export default function ControlCenter() {
  const playBackState = usePlaybackState();

  // next button
  const skipToNext = async () => {
    await TrackPLayer.skipToNext();
  };

  // prev button
  const skipToPrevious = async () => {
    await TrackPLayer.skipToPrevious();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPLayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPLayer.play();
      } else {
        await TrackPLayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon
          style={styles.icon}
          name={playBackState === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
