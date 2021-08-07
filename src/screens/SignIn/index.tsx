import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';
import getStyles from './styles';

export function SignIn({ navigation }: NativeStackScreenProps<ParamListBase>) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignIn = async () => {
    await Auth.signIn(email, password);
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        label="Email"
        placeholder="john.doe@email.com"
        mode="outlined"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        placeholder="password"
        mode="outlined"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={onPressSignIn} mode="contained">
        Sign In
      </Button>
    </View>
  );
}
