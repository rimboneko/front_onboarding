/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://172.29.3.78:3000/graphql',
  cache: new InMemoryCache(),
});
const GET_VIDEO_GAME = gql`
  query GetVideoGame {
    videoGame(id: 3) {
      id
      title
      platform
      genre
      rating
    }
  }
`;
const HomeScreen = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_VIDEO_GAME);
  if (loading) {
    return (
      <View style={styles.Container}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    console.log(error);
    return (
      <View style={styles.Container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.Container}>
      <Text>{data.videoGame.title}</Text>
      <Text>{data.videoGame.platform}</Text>
      <Text>{data.videoGame.genre}</Text>
      <Text>{data.videoGame.rating}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.Container}>
      <Text>Hello this is Profile</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const App: () => Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
