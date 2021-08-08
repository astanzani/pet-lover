import React, { useState } from 'react';
import { View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';
import getStyles from './styles';

export function SignIn() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await Auth.signIn(email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        label="Email"
        placeholder="john.doe@email.com"
        mode="outlined"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        label="Password"
        placeholder="password"
        mode="outlined"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <HelperText type="error" visible={!!error} padding="none">
        {error}
      </HelperText>
      <Button
        style={styles.signInButton}
        onPress={onPressSignIn}
        mode="contained"
        loading={loading}
      >
        Sign In
      </Button>
    </View>
  );
}
