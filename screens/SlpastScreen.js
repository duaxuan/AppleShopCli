import React, {useEffect} from 'react';
import {StyleSheet, Animated, View, Easing} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SplashScreen = ({navigation}) => {
  const progress = new Animated.Value(0);
  const progressAnimation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SigupScreen');
    }, 3000);

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <AntDesign name="apple1" size={60} color={'white'} />
      </View>
      <View style={styles.timeBar}>
        <Animated.View
          style={{
            width: progressAnimation,
            height: '100%',
            borderRadius: 100,
            backgroundColor: 'white',
          }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
    backgroundColor: 'black',
  },
  center: {
    alignItems: 'center',
  },
  timeBar: {
    marginTop: 30,
    height: 4,
    width: '24%',
    borderRadius: 100,
    backgroundColor: 'gray',
  },
});
