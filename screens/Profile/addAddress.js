import {
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { API_Address } from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkValidatePhone } from '../../compoment/checkValidate';


const AddAddress = ({ navigation }) => {
    const AsyncUser = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const newUser = JSON.parse(user);
            setUserID(newUser._id);

            useEffect(() => {
                AsyncUser();
            }, []);

            const [name, setName] = useState('');
            const [phone, setPhone] = useState('');
            const [street, setStreet] = useState('');
            const [userID, setUserID] = useState('');

            const onAddress = async () => {
                try {
                    const data = { name, phone, address: street, userID };
                    await fetch(API_Address + 'saveAddress', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error('Error saving address:', error);
                    useEffect(() => {
                        AsyncUser()
                    }, [])
                    const [name, setName] = useState("")
                    const [errorName, setErrorName] = useState("")
                    const [phone, setPhone] = useState("")
                    const [errorPhone, setErrorPhone] = useState("")
                    const [street, setStreet] = useState("")
                    const [errorStreet, setErrorStreet] = useState("")
                    const [userID, setUserID] = useState("")
                    const onAddress = () => {
                        const data = { name, phone, address: street, userID }
                        fetch(API_Address + "saveAddress", {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(() => navigation.navigate("addressScreen"))
                            .catch(err => console.log(err))

                    }
                };
                const checkOnFinish = () => {
                    if (name === "") {
                        setErrorName("Name không được bỏ trống!")
                        return
                    }
                    if (phone === "") {
                        setErrorPhone("Phone không được bỏ trống!");
                        return
                    }
                    if (street === "") {
                        setErrorStreet("Street không được bỏ trống!")
                        return
                    }
                    if (errorPhone !== "") {
                        return
                    } else {
                        onAddress()
                        navigation.goBack()
                    }

                }




                return (
                                <View style={styles.container}>
                                    <KeyboardAvoidingView
                                        style={styles.containeredt}
                                        behavior={Platform.OS === 'ios' ? 'padding' : null}>
                                        {/* Back */}
                                        <View style={styles.header}>
                                            <AntDesign
                                                onPress={() => navigation.goBack()}
                                                name="arrowleft"
                                                size={25}
                                                color="black"
                                            />
                                            <Text style={styles.txtHeader}>New Address</Text>
                                        </View>
                                        <View style={{
                                            marginTop: '25%', maxHeight: "90%",
                                        }}>
                                            {/* Avatar */}
                                            <TextInput
                                                onChangeText={(text) => {
                                                    if (text.length > 0) {
                                                        setName(text);
                                                        setErrorName("")
                                                    } else {
                                                        setErrorName("Name không được bỏ trống!");
                                                    }

                                                }}
                                                placeholder='Họ và tên'
                                                style={styles.inp}
                                            />
                                            {errorName && <Text style={{ color: "red" }}>{errorName}</Text>}
                                            <TextInput
                                                onChangeText={(text) => {
                                                    if (text.length > 0) {
                                                        if (checkValidatePhone(text)) {
                                                            setPhone(text);
                                                            setErrorPhone("")

                                                        } else {
                                                            setErrorPhone("Phone không hợp lệ!")
                                                        }
                                                    } else {
                                                        setErrorPhone("Phone không được bỏ trống!")
                                                    }

                                                }}
                                                placeholder='Số điện thoại'
                                                style={styles.inp}
                                            />
                                            {errorPhone && <Text style={{ color: "red" }}>{errorPhone}</Text>}
                                            <TextInput
                                                onChangeText={(text) => {
                                                    if (text.length > 0) {
                                                        setStreet(text);
                                                        setErrorStreet("")
                                                    } else {
                                                        setErrorStreet("Street không được bỏ trống!");
                                                    }

                                                }}
                                                placeholder='Địa chỉ'
                                                style={styles.inp}
                                            />
                                            {errorStreet && <Text style={{ color: "red" }}>{errorStreet}</Text>}

                                            <Pressable
                                                onPress={() => {
                                                    checkOnFinish()
                                                }}
                                                style={styles.btnAppAdress}>
                                                <Text style={styles.txtAdd}>Hoàn thành</Text>
                                            </Pressable>
                                        </View>
                                    </KeyboardAvoidingView>

                                </View>
                    //             <View style={{ marginTop: '25%', maxHeight: '90%' }}>
                    //                 <TextInput
                    //                     onChangeText={text => setName(text)}
                    //                     placeholder="Họ và tên"
                    //                     style={styles.inp}
                    //                 />
                    //                 <TextInput
                    //                     onChangeText={text => setPhone(text)}
                    //                     placeholder="Số điện thoại"
                    //                     style={styles.inp}
                    //                 />
                    //                 <TextInput
                    //                     onChangeText={text => setStreet(text)}
                    //                     placeholder="Địa chỉ"
                    //                     style={styles.inp}
                    //                 />

                    //                 <Pressable onPress={onAddress} style={styles.btnAppAddress}>
                    //                     <Text style={styles.txtAdd}>Hoàn thành</Text>
                    //                 </Pressable>
                    //             </View>
                    //     </KeyboardAvoidingView >
                    // </View >
                );
            };

        }
    }
}

export default AddAddress;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    containeredt: {
        marginTop: '5%',
        marginHorizontal: '6%',
    },
    header: {
        flexDirection: 'row',
        height: 25,
        alignItems: 'center',
    },
    txtHeader: {
        color: 'black',
        left: '30%',
        fontSize: 18,
        fontWeight: '500',
    },
    inp: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        paddingStart: 10,
        marginBottom: 20,
    },
    btnAppAddress: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    txtAdd: {
        fontSize: 12,
        color: 'black',
        fontWeight: '500',
    },

    inp: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        paddingStart: 10,
        marginTop: 20
    },
    btnAppAdress: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    container: {
        flex: 1,
    },
    containeredt: {
        marginTop: '5%',
        marginHorizontal: '6%',
    },
    header: {
        flexDirection: 'row',
        height: 25,
        alignItems: 'center',
    },
    txtHeader: {
        color: 'black',
        left: '30%',
        fontSize: 18,
        fontWeight: '500',
    },
    boderbtnAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    boderAvatar: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
    },
    boderIcon: {
        width: 30,
        height: 30,
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        borderRadius: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    txt: {
        color: 'black',
        fontWeight: '600',
    },
    txtInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        borderColor: '#C6C6C6',
        paddingLeft: 13,
        marginTop: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C6C6C6',
        height: 45,
        marginTop: 10,
    },
    countryCode: {
        paddingHorizontal: 10,
        fontSize: 16,
    },
    phoneNumberInput: {
        flex: 1,
        fontSize: 16,
    },
    btnUpda: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtAdd: {
        fontSize: 12,
        color: 'black',
        fontWeight: '500',
    },

});


