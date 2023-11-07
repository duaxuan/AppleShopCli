import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_Favorite} from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouriteScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [array, setArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const handleSearch = value => {
    setSearch(value);
    const filteredData = array.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredArray(filteredData);
  };

  const putAPI_Like = async item => {
    try {
      await axios.put(
        `${API_Favorite}${await AsyncStorage.getItem('_idUser')}`,
        {productId: item._id},
      );
      getAPI();
    } catch (error) {
      console.error('Put api: ' + error.message);
    }
  };

  const getAPI = async () => {
    try {
      const res1 = await axios.get(
        `${API_Favorite}${await AsyncStorage.getItem('_idUser')}`,
      );
      const res2 = await axios.post(API_Favorite, {
        productIds: res1.data.message,
      });
      setArray(res2.data.message);
      handleSearch(search);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search, back */}
      <View style={styles.header}>
        <View style={styles.headerSearch}>
          <Pressable>
            <Ionicons name="search" size={24} color="black" />
          </Pressable>
          <TextInput
            style={styles.txtInput}
            defaultValue={search}
            placeholder="Nhập từ khóa tìm kiếm"
            keyboardType="default"
            onChangeText={handleSearch}
          />
          {search && (
            <TouchableOpacity
              style={{marginRight: '3%'}}
              onPress={() => setSearch('')}>
              <Feather name="x-circle" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.txtCancel}>Cancel</Text>
        </Pressable>
      </View>
      {/* List item */}
      <Text style={styles.title}>Sản phẩm yêu thích</Text>
      <FlatList
        data={search ? filteredArray : array}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ProductdetailsScreen', {
                product: item,
              })
            }
            style={styles.listItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.avatarItem} source={{uri: item.image}} />
              <View style={{width: '55%', left: '10%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text numberOfLines={1} style={styles.txtItemName}>
                    {item.name}
                  </Text>
                  <View style={styles.itemYear}>
                    <Text style={styles.txtYear}>Mua ngay</Text>
                  </View>
                </View>
                <Text style={styles.txtItemPrice}>
                  đ {item.price.toLocaleString().replace(/,/g, '.')}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => putAPI_Like(item)}>
              <AntDesign name={'heart'} size={24} color="black" />
            </TouchableOpacity>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  header: {
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSearch: {
    flex: 1,
    height: 40,
    borderRadius: 15,
    paddingLeft: '3%',
    marginRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  txtInput: {
    flex: 1,
    marginHorizontal: '2%',
  },
  txtCancel: {
    color: 'red',
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginTop: '8%',
    fontWeight: '500',
  },
  listItem: {
    height: 80,
    marginTop: '2%',
    borderRadius: 10,
    padding: '2%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarItem: {
    width: 80,
    height: 60,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  txtItemName: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  txtItemPrice: {
    color: 'black',
    marginTop: '7%',
    fontSize: 12,
    fontWeight: '500',
  },
  itemYear: {
    left: '60%',
    width: 70,
    height: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  txtYear: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default FavouriteScreen;
