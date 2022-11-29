import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from '../styles/Color';
import Styles from '../styles/Styles';
import img from '../assets/onboardingAime.png';

const AimeOnboarding = ({onDone}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <View style={{flex: 1, height: '100%', paddingVertical: 20}}>
      <Text style={styles.title}>Bienvenue sur Aime,</Text>
      <Text style={styles.subtitle}>
        L'application sur la santé sexuelle qui te permet de mieux comprendre
        ton corps et les relations amoureuses en France
      </Text>
      <Image
        source={img}
        style={[
          styles.image,
          {
            width: screenWidth <= 400 ? 300 : 450,
            height: screenWidth <= 400 ? 427 : 640,
          },
        ]}
      />
      <TouchableOpacity
        style={[Styles.tunnelButton, styles.button]}
        onPress={onDone}>
        <Text style={[Styles.tunnelButtonText, styles.buttonText]}>
          Continuer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: Colors.appTitleFont,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: Colors.titleCard,
    marginBottom: 30,
  },
  button: {
    width: 'fit-content',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default AimeOnboarding;
