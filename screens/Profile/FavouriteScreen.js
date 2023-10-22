import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavouriteScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [array, setArray] = useState([
    {
      name: 'Apple Watch S5',
      image:
        'https://th.bing.com/th/id/OIP.8Isx8EUN0ilB4nOCohRf6gHaHR?w=218&h=214&c=7&r=0&o=5&pid=1.7',
      price: 3120000,
      description: 'Là sản phẩm đồng hồ thương hiệu đến từ nhà táo',
      quantity: 500,
      typeProduct: 3,
      created: '10/09/2023',
      updated: '12/09/2023',
    },
    {
      name: 'Apple Watch S5',
      image:
        'https://th.bing.com/th/id/OIP.dPbGBaOqv8uz8AQWWdSQiwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7',
      price: 6690000,
      description: 'Là sản phẩm đồng hồ thương hiệu đến từ nhà táo',
      quantity: 500,
      typeProduct: 3,
      created: '10/09/2023',
      updated: '12/09/2023',
    },
  ]);

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
            onChangeText={content => setSearch(content)}
          />
          {search.length ? (
            <TouchableOpacity
              style={{marginRight: '3%'}}
              onPress={() => setSearch('')}>
              <Feather name="x-circle" size={24} color="black" />
            </TouchableOpacity>
          ) : null}
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.txtCancel}>Cancel</Text>
        </Pressable>
      </View>
      {/* List item */}
      <Text style={styles.title}>Your reuslt</Text>
      {array.map((data, index) => {
        const [like, setLike] = useState(false);
        return (
          <View key={index} style={styles.listItem}>
            <View style={styles.viewItem}>
              <Image style={styles.avatarItem} source={{uri: data.image}} />
              <View style={{right: '20%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txtItemName}>{data.name}</Text>
                  <View style={styles.itemYear}>
                    <Text style={styles.txtYear}>2019</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txtItemPrice}>
                    đ {data.price.toLocaleString().replace(/,/g, '.')}
                  </Text>
                  <Text style={styles.txtItemPrice2}>
                    đ {data.price.toLocaleString().replace(/,/g, '.')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setLike(!like)}>
                <AntDesign
                  name={like ? 'heart' : 'hearto'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default FavouriteScreen;

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
    fontSize: 18,
    marginTop: '8%',
    fontWeight: '500',
  },
  listItem: {
    height: 80,
    marginTop: '4%',
    borderRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  avatarItem: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  txtItemName: {
    fontSize: 15,
    fontWeight: '500',
  },
  txtItemPrice: {
    marginTop: '7%',
    fontSize: 12,
    fontWeight: '500',
  },
  txtItemPrice2: {
    left: '50%',
    color: '#666666',
    marginTop: '7%',
    fontSize: 11,
    fontWeight: '500',
    textDecorationLine: 'line-through',
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
    fontSize: 10,
    fontWeight: '500',
  },
});
