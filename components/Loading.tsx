import { Text, View } from './Themed';
import TopBar from './TopBar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import Logout from '../lib/Logout';
import { useNavigation } from '@react-navigation/native';
import getLoggedInUser from '../lib/getLoggedInUser';
import User from '../types/User';

export default function Loading() {
  const navigation = useNavigation();

  const [user, setUser] = useState<User>();
  const [refresh, setRefresh] = useState(Math.random());

  async function CustomLogout() {
    setRefresh(Math.random());

    await Logout(navigation.navigate);
  }

  useEffect(() => {
    getLoggedInUser().then(setUser).catch(alert);
    // .catch(alert); - Removed because this fires for normal users as well
    // and they don't have access to the companies endpoint, so it would
    // always show a confusing error message.
  }, [refresh]);

  return (
    <View style={styles.main}>
      <Text>loading...</Text>
      <Button
        title={'Logout'}
        onPress={() => {
          CustomLogout();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 45,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    marginVertical: 50,
  },
});
