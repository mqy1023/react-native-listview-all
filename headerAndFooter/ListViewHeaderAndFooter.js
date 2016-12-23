import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import RowItem from './RowItem';

const data = [
  { name: 'row 1', value: 'value1' },
  { name: 'row 2', value: 'value2' },
  { name: 'row 3', value: 'value3' },
  { name: 'row 4', value: 'value4' },
  { name: 'row 5', value: 'value5' },
  { name: 'row 6', value: 'value6' },
  { name: 'row 7', value: 'value7' },
  { name: 'row 8', value: 'value8' }
];

// Header, footer, Separator; 头部、尾部、行与行之间分隔组件
export default class ListViewDemo extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(item) => <RowItem {...item} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderHeader={() => <Header />}
        renderFooter={() => <Footer />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
