import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingView = ({ isVisible }) => {
  const { activityIndicator } = styles;
  return (
    <ActivityIndicator
      animating={isVisible}
      style={[activityIndicator, { height: 80 }]}
      size="large"
    />
  );
};

const styles = {
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default LoadingView;
