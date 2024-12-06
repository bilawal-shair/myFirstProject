import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoPlayer from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const VideoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{

      overflow: 'hidden',
  }}>
      <VideoPlayer
          video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          videoWidth={1800}
          videoHeight={1200}
          // thumbnail={{ uri: thumbnailUri }}
      />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300, // Adjust the height according to your needs
  },
});

export default VideoScreen;
