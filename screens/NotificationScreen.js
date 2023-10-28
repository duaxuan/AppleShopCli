import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const NotificationScreen = ({navigation}) => {
  //Thay bằng api
  const [array, setArray] = useState([
    {
      title: 'Săn deal thần tốc chỉ 9.000Đ',
      image:
        'https://th.bing.com/th/id/OIP.gNUBs04z8JxuYJ_CzWE9gQHaEc?pid=ImgDet&rs=1',
      information:
        '👉Top deal hàng hiệu giảm đến 30% 🚀Freeship mọi đơn đến 35.000đ 🔥Săn ngay, đừng bỏ lỡ!',
    },
  ]);
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
          <Pressable style={styles.notiItem}>
            <View style={styles.rowItem}>
              <Image style={styles.imageItem} source={{uri: item.image}} />
              <View style={{width: '70%'}}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemInfo} numberOfLines={2}>
                  {item.information}
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
    height: 60,
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
