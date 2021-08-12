import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View } from 'react-native';
import {
  Title,
  Subheading,
  useTheme,
  TextInput,
  HelperText,
} from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { RouteProp } from '@react-navigation/native';

import { Button } from '@components';
import { SignInStackParamList } from '@types';
import getStyles from './styles';
import { Routes } from '@config';

interface Props {
  navigation: NavigationProp<SignInStackParamList>;
  route: RouteProp<SignInStackParamList, Routes.CONFIRM_SIGN_UP>;
}

export function ConfirmSignUp({ navigation, route }: Props) {
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent user going back to sign in / sign up.
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
      }
    });
  }, [navigation]);

  const styles = getStyles(theme);
  const { email, password } = route.params;

  const confirmSignUp = async () => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, code);
      await Auth.signIn(email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <Title style={styles.title}>Almost there!</Title>
      <Subheading style={styles.description}>
        We just sent a confirmation code to your email. Please input it below to
        confirm your account
      </Subheading>
      <View style={styles.confirmationWrapper}>
        <TextInput
          style={styles.confirmationCodeInput}
          mode="outlined"
          label="Confirmation Code"
          placeholder="123456"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
        <Button mode="contained" onPress={confirmSignUp} loading={loading}>
          Confirm Account
        </Button>
      </View>
    </View>
  );
}
