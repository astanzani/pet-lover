import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import {
  Title,
  useTheme,
  IconButton,
  TextInput,
  HelperText,
} from 'react-native-paper';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import { NavigationProp } from '@react-navigation/native';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';
import { SignInStackParamList } from '@types';
import { Routes } from '@config';
import getStyles from './styles';

interface SignUpFormData {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface Props {
  navigation: NavigationProp<SignInStackParamList>;
}

export function SignUp({ navigation }: Props) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = getStyles(theme);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const signUp = async (values: SignUpFormData) => {
    try {
      setLoading(true);
      await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
          phone_number: values.phone,
        },
      });
      setLoading(false);
      navigation.navigate(Routes.CONFIRM_SIGN_UP, {
        email: values.email,
        password: values.password,
      });
    } catch (e) {
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
      <View>
        <IconButton icon="paw" />
        <Title style={styles.title}>
          Create an account to start sharing your pet&apos;s life, it takes just
          a minute!
        </Title>
        <IconButton icon="paw" style={{ alignSelf: 'flex-end' }} />
      </View>
      <View>
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '' }}
          onSubmit={signUp}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            /* and other goodies */
          }) => (
            <View>
              <TextInput
                style={styles.input}
                label="Full Name"
                mode="outlined"
                placeholder="John Doe"
                textContentType="name"
                onChangeText={handleChange('name')}
                value={values.name}
              />
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="john.doe@email.com"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <TextInput
                style={styles.input}
                label="Phone Number"
                mode="outlined"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder="(ddd) 99999-9999"
                onChangeText={handleChange('phone')}
                value={values.phone}
                // render={(props) => (
                //   // @ts-expect-error: Ref is not used
                //   <TextInputMask
                //     {...props}
                //     type="cel-phone"
                //     options={{ maskType: 'BRL' }}
                //   />
                // )}
              />
              <TextInput
                style={styles.input}
                label="Password"
                mode="outlined"
                textContentType="password"
                secureTextEntry={!showPassword}
                placeholder="Str0ngP@ssword"
                onChangeText={handleChange('password')}
                value={values.password}
                right={
                  <TextInput.Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    onPress={toggleShowPassword}
                  />
                }
              />
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
              <Button
                style={styles.signUpButton}
                mode="contained"
                onPress={handleSubmit}
                disabled={
                  !values.email ||
                  !values.name ||
                  !values.password ||
                  !values.phone
                }
                loading={loading}
              >
                Sign Up
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
