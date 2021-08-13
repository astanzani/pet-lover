import React, { useState } from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { HelperText, Paragraph, TextInput, useTheme } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';
import { SignInStackParamList } from '@types';
import { Routes } from '@config';
import getStyles from './styles';

interface Props {
  navigation: NavigationProp<SignInStackParamList>;
}

export function SignIn({ navigation }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();

  const onPressSignUp = async () => {
    navigation.navigate(Routes.SIGN_UP);
  };

  const onPressSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await Auth.signIn(email, password);
    } catch (e) {
      if (e.code === 'UserNotConfirmedException') {
        await Auth.resendSignUp(email);
        navigation.navigate(Routes.CONFIRM_SIGN_UP, { email, password });
      }
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Image
        source={require('../../../assets/pet-lover-logo.png')}
        style={{ width, maxHeight: 100, marginBottom: theme.spacing(3) }}
        resizeMode="contain"
      />
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.formWrapper}>
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
            disabled={!email || !password}
          >
            Sign In
          </Button>
        </View>
        <View style={styles.signUpWrapper}>
          <Paragraph>Don&apos;t have an account?</Paragraph>
          <Button mode="text" onPress={onPressSignUp}>
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
