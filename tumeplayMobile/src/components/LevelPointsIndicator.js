import {PossibleFragmentSpreadsRule} from 'graphql';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppContext from '../../AppContext';
import {Colors} from '../styles/Style';
import * as Progress from 'react-native-progress';

const LevelPointsIndicator = ({style, onPress}) => {
  const context = useContext(AppContext);
  const {user, doneModules_ids} = context;

  const fullProgressLength = 6;

  const progress = doneModules_ids.length / fullProgressLength;

  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <Text style={styles.text}>
        Niveau <Text style={styles.boldText}>{user.level}</Text>
      </Text>
      <Progress.Bar
        progress={progress}
        width={150}
        color={'#51B070'}
        unfilledColor="#DFD7CD"
        borderColor="#DFD7CD"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    paddingRight: 5,
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 6,
  },
  level: {
    paddingRight: 15,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: '700',
    paddingRight: 5,
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 6,
  },
});

export default LevelPointsIndicator;
