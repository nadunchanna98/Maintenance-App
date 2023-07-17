import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';

const { width } = Dimensions.get("window");

const ComplainsList = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const complainsData = route.params.data;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500); //after 1.5s refreshing will stop 
    }, []);

    useEffect(() => {
        console.log(complainsData[0])
    }, [])

    return (
        <SafeAreaView>
            <FlatList
                data={complainsData}
                renderItem={({ item }) => {
                    const formattedDate = moment(item.assigned_date).format('MMMM DD, YYYY');
                    return (
                        <TouchableRipple
                            onPress={() => {
                                navigation.navigate('ViewComplain', { complainId: item._id })
                            }}
                            style={styles.complainButton}
                        >
                            <Surface style={styles.surface} elevation={2}>
                                <View style={styles.card}>
                                    <View style={styles.imageColumn}>
                                        <Image
                                            source={{
                                                uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg',
                                            }}
                                            style={styles.avatar}
                                        />
                                    </View>
                                    <View style={styles.detailsColumn}>
                                        <Text style={styles.description}>{item.title}</Text>
                                        <Text style={styles.status}>{item.status}</Text>
                                        <Text style={styles.date}>{formattedDate}</Text>
                                    </View>
                                </View>
                            </Surface>
                        </TouchableRipple>
                    );
                }}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                style={styles.list}
                ListEmptyComponent={<Text style={styles.emptyComponent}>There are no complains! Come back later</Text>}
                ListFooterComponent={<View style={styles.footerComponent}></View>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.01,
        marginRight: width * 0.04,
    },
    list: {
        paddingTop: width * 0.03,
        paddingBottom: width * 0.03,
    },
    surface: {
        backgroundColor: '#ffffff',
        paddingVertical: width * 0.03,
        paddingHorizontal: width * 0.04,
        marginBottom: width * 0.03,
        marginHorizontal: width * 0.04,
        borderRadius: 6,
    },
    footerComponent: {
        height: width * 0.03,
    },
    emptyComponent: {
        fontWeight: 'bold',
        fontSize: width * 0.045,
        textAlign: 'center',
        marginVertical: width * 0.04,
    },
    card: {
        flexDirection: 'row',
    },
    imageColumn: {

    },
    detailsColumn: {
        flex: 1,
        justifyContent: 'space-between',
    },
    description: {
        fontWeight: 'bold',
        fontSize: width * 0.042,
        marginBottom: width * 0.01,
    },
    status: {
        color: '#a1a1a1'
    },
    date: {},
});

export default ComplainsList;
