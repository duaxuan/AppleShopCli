import React, {useState} from 'react';
import {
  View,
  Text, // Import Text component
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DATADANHMUC = [
  {
    id: '1',
    name: 'Mac',
    image: require('../assets/laptop.png'),
  },
  {
    id: '2',
    name: 'iPhone',
    image: require('../assets/mobile-phone.png'),
  },
  {
    id: '3',
    name: 'iPad',
    image: require('../assets/maytinhbang.png'),
  },
  {
    id: '4',
    name: 'Watch',
    image: require('../assets/dongho.png'),
  },
];

const DATASANPHAM = {
  Mac: [
    {
      id: '1',
      name: 'Macbook Air',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i5',
      b: 'Ram: 8GB',
      c: 'Bộ nhớ: 256GB SSD',
      d: 'Kích thước màn: 13.3 inches',
    },
    {
      id: '2',
      name: 'Macbook Pro',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i7',
      b: 'Ram: 16GB',
      c: 'Bộ nhớ: 512GB SSD',
      d: 'Kích thước màn: 16 inches',
    },
    {
      id: '3',
      name: 'Macbook Air',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i5',
      b: 'Ram: 8GB',
      c: 'Bộ nhớ: 256GB SSD',
      d: 'Kích thước màn: 13.3 inches',
    },
    {
      id: '4',
      name: 'Macbook Pro',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i7',
      b: 'Ram: 16GB',
      c: 'Bộ nhớ: 512GB SSD',
      d: 'Kích thước màn: 16 inches',
    },
    {
      id: '5',
      name: 'Macbook Air',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i5',
      b: 'Ram: 8GB',
      c: 'Bộ nhớ: 256GB SSD',
      d: 'Kích thước màn: 13.3 inches',
    },
    {
      id: '6',
      name: 'Macbook Pro',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i7',
      b: 'Ram: 16GB',
      c: 'Bộ nhớ: 512GB SSD',
      d: 'Kích thước màn: 16 inches',
    },
    {
      id: '7',
      name: 'Macbook Air',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i5',
      b: 'Ram: 8GB',
      c: 'Bộ nhớ: 256GB SSD',
      d: 'Kích thước màn: 13.3 inches',
    },
    {
      id: '8',
      name: 'Macbook Pro',
      image: require('../assets/macbookk.png'),
      price: '20000',
      a: 'Chip: Intel Core i7',
      b: 'Ram: 16GB',
      c: 'Bộ nhớ: 512GB SSD',
      d: 'Kích thước màn: 16 inches',
    },

    // Add more Mac products
  ],
  iPhone: [
    {
      id: '1',
      name: 'iPhone 12',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 64GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    {
      id: '2',
      name: 'iPhone 13',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 128GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    {
      id: '3',
      name: 'iPhone 12',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 64GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    {
      id: '4',
      name: 'iPhone 13',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 128GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    {
      id: '5',
      name: 'iPhone 12',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 64GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    {
      id: '6',
      name: 'iPhone 13',
      image: require('../assets/iphone14.png'),
      price: '20000',
      a: 'Màn hình: 6.1-inch Super Retina XDR',
      b: 'Camera: Dual 12MP camera system',
      c: 'Bộ nhớ: 128GB',
      d: 'Phiên bản CPU	Apple A14 Bionic',
    },
    // Add more iPhone products
  ],
  iPad: [
    {
      id: '1',
      name: 'iPad Pro',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    {
      id: '2',
      name: 'iPad Pro M2',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    {
      id: '3',
      name: 'iPad Pro',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    {
      id: '4',
      name: 'iPad Pro M2',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    {
      id: '5',
      name: 'iPad Pro',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    {
      id: '6',
      name: 'iPad Pro M2',
      image: require('../assets/ipadd.jpg'),
      price: '20000',
      a: 'Kích thước	280.6 x 214.9 x 6.4 mm',
      b: 'Trọng lượng sản phẩm	685 g',
      c: 'Kích thước màn hình	12.9 inch',
      d: 'Độ phân giải	2732 x 2048 Pixels',
    },
    // Add more iPad products
  ],
  Watch: [
    {
      id: '1',
      name: 'Apple Watch Series 6',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.78 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 303 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
    {
      id: '2',
      name: 'Apple Watch SE',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.6 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 280 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
    {
      id: '3',
      name: 'Apple Watch Series 6',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.78 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 303 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
    {
      id: '4',
      name: 'Apple Watch SE',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.6 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 280 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
    {
      id: '5',
      name: 'Apple Watch Series 6',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.78 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 303 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
    {
      id: '6',
      name: 'Apple Watch SE',
      image: require('../assets/hihi.png'),
      price: '20000',
      a: 'Kích thước màn hình: 1.6 inch',
      b: 'Độ phân giải: 448 x 368 Pixels',
      c: 'Dung lượng pin: 280 mAh',
      d: 'Thời gian sạc đầy: 2 giờ',
    },
  ],
};

export const formatPrice = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(price);
};

const CategoryList = ({categories, selectedCategory, onCategorySelect}) => {
  return (
    <View style={styles.categoryList}>
      {categories.map(category => (
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === category ? styles.selectedCategory : null,
          ]}
          key={category}
          onPress={() => onCategorySelect(category)}>
          <Image
            style={styles.categoryImage}
            source={DATADANHMUC.find(c => c.name === category).image}
          />
          <Text style={styles.categoryName}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ProductList = ({products, onProductPress}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={products}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.productList}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onProductPress(item)}>
          <View style={styles.productItem}>
            <Image style={styles.productImage} source={item.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const HomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Mac');
  const handleProductPress = product => {
    // Chuyển hướng đến màn hình chi tiết sản phẩm và truyền thông tin sản phẩm
    navigation.navigate('ProductdetailsScreen', {product});
  };
  return (
    <View style={{backgroundColor: '#F0F0F0'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesome name="apple" size={30} color="black" />
            <Text style={styles.headerText}>AppleShop</Text>
          </View>
          <View style={styles.iconsContainer}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </View>
        <Image style={styles.image} source={require('../assets/banner.png')} />
        <CategoryList
          categories={Object.keys(DATASANPHAM)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        {selectedCategory && (
          <ProductList
            products={DATASANPHAM[selectedCategory]}
            formatPrice={formatPrice}
            onProductPress={handleProductPress}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    marginLeft: 15,
  },
  image: {
    margin: 22,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  selectedCategory: {
    borderBottomWidth: 1,
  },
  categoryItem: {
    alignItems: 'center',
    width: 88,
    height: 88,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  categoryImage: {
    width: 36,
    height: 36,
    borderRadius: 5,
    marginTop: 5,
  },
  categoryName: {
    color: 'black',
    marginTop: 8,
    fontSize: 12,
    marginBottom: 5,
  },
  productList: {
    marginHorizontal: 15,
    marginTop: '2%',
    alignItems: 'center',
  },
  productItem: {
    alignItems: 'center',
    width: 180,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 10,
    height: 180,
    justifyContent: 'center',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
  },
  productName: {
    color: 'black',
    fontSize: 18,
    justifyContent: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#FC6D26',
    justifyContent: 'center',
  },
});

export default HomeScreen;
