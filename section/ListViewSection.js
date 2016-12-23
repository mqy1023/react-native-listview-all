import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Alert,
  TouchableOpacity
} from 'react-native';

import LoadingView from './LoadingView';

const API_URL = 'https://raw.githubusercontent.com/mqy1023/react-native-listview-all/master/mock/listUser.json';

// ListView分组

export default class ListViewSection extends Component {
  constructor(props) {
    super(props);

    const getSectionHeaderData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${sectionId}:${rowId}`]; // 下标要对应上后面设置每行的值得下标

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData,
      getRowData,
    });

    this.state = {
      loaded: false,
      dataSource: ds
    };

    this.bindMethods();
  }

  componentDidMount() {
    this.fetchData();
  }

  bindMethods() { // 逐个给bindableMethods中每个方法bind绑定this
    if (!this.bindableMethods) {
      return;
    }

    for (const methodName in this.bindableMethods) {
      this[methodName] = this.bindableMethods[methodName].bind(this);
    }
  }

  fetchUsersData() { // 获取数据
    return new Promise((resolve, reject) => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((users) => {
          resolve(users);
        }).catch(err => reject(err));
    });
  }

  fetchData() { // 处理数据
    this.fetchUsersData().then(responseData => {
      const organizations = responseData.results;
      const length = organizations.length;
      const dataBlob = {};
      const sectionIDs = [];
      const rowIDs = [];

      for (let i = 0; i < length; i++) {
        const organization = organizations[i];

        sectionIDs.push(organization.id);
        dataBlob[organization.id] = organization.organization;

        const users = organization.users;
        const userLength = users.length;

        rowIDs[i] = [];

        for (let j = 0; j < userLength; j++) {
          const user = users[j].user;
          rowIDs[i].push(user.md5);

          dataBlob[`${organization.id}:${user.md5}`] = user;
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        loaded: true
      });
    }).done();
  }

  renderSectionHeader(sectionData, sectionID) { // 渲染Section部分
    return (
      <View style={styles.section}>
        <Text style={styles.text}>{sectionData}</Text>
      </View>
    );
  }

  renderContent() {
    if (!this.state.loaded) {
      return <LoadingView isVisible={!this.state.loaded} />;
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        style={styles.listview}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>用户列表</Text>
        </View>
        {
          this.renderContent()
        }
      </View>
    );
  }
}

Object.assign(ListViewSection.prototype, {
  bindableMethods: {
    renderRow(rowData, sectionID, rowID) {
      return (
        <TouchableOpacity onPress={() => this.onPressRow(rowData, sectionID)}>
          <View style={styles.rowStyle}>
            <Text style={styles.rowText}>{rowData.name.title} {rowData.name.first} {rowData.name.last}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    onPressRow(rowData, sectionID) {
      const alertContent = `${rowData.name.title} ${rowData.name.first} ${rowData.name.last}`;
      Alert.alert(
        'Alert Title',
        alertContent,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    flexDirection: 'column',
    paddingTop: 20
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
    fontSize: 16
  },
  rowStyle: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1
  },
  rowText: {
    color: '#212121',
    fontSize: 16
  },
  subText: {
    fontSize: 14,
    color: '#757575'
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#2196F3'
  }
});
