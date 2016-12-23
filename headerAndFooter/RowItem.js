import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

const RowItem = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.name}
    </Text>
    <Text style={styles.text}>
      {props.value}
    </Text>
  </View>
);

export default RowItem;
