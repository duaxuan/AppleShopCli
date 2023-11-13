import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {API_Blog, API_URL} from '../API/getAPI';

const NotificationScreen = ({navigation}) => {
  const [array, setArray] = useState(null);
  const [refreshing, setRefreshing] = useState();

  const getApi = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(API_Blog);
      setArray(res.data.message);
      setRefreshing(false);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const renderNotificationItem = ({item}) => (
    <Pressable
      style={styles.notiItem}
      onPress={() => navigation.navigate('InfoBlog', {item: item})}>
      <View style={styles.rowItem}>
        <Image
          style={styles.imageItem}
          source={{uri: `${API_URL}${item.image}`}}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.itemInfo} numberOfLines={2}>
            {item.desc}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Thông tin</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getApi} />
        }
        data={array}
        style={styles.flatList}
        renderItem={renderNotificationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notiItem: {
    height: 105,
    marginTop: '0.5%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '1%',
  },
  imageItem: {
    width: 100,
    height: 70,
    borderRadius: 10,
    resizeMode: 'contain',
    marginHorizontal: '2%',
  },
  itemTextContainer: {
    width: '70%',
  },
  itemTitle: {
    color: 'black',
    fontWeight: '500',
  },
  itemInfo: {
    color: 'black',
    fontSize: 12,
    marginTop: '3%',
  },
  flatList: {
    marginTop: '2%',
  },
});

export default NotificationScreen;
