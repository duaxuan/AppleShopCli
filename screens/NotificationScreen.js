import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_Blog} from '../API/getAPI';
import axios from 'axios';

const NotificationScreen = ({navigation}) => {
  //Thay bằng api
  const [array, setArray] = useState([]);

  // Call api
  const getApi = async () => {
    try {
      const res = await axios.get(API_Blog);
      setArray(res.data.message);
    } catch (error) {
      console.log('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    // Lấy blog
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Thông tin</Text>
      </View>
      {/* FlatList notifi */}
      <FlatList
        data={array}
        style={{marginTop: '2%'}}
        renderItem={({item}) => (
          <Pressable
            style={styles.notiItem}
            onPress={() => navigation.navigate('InfoBlog', {item: item})}>
            <View style={styles.rowItem}>
              <Image style={styles.imageItem} source={{uri: item.image}} />
              <View style={{width: '70%'}}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemInfo} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default NotificationScreen;

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
  itemTitle: {
    color: 'black',
    fontWeight: '500',
  },
  itemInfo: {
    color: 'black',
    fontSize: 12,
    marginTop: '3%',
  },
});
