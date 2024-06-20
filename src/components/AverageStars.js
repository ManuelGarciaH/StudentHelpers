import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AverageStars = ({ starsCounter, total}) => {
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    // Calcular el promedio de las estrellas
    if (starsCounter.length > 0) {
      let totalStars = 0;
      let totalCount = 0;

      starsCounter.forEach(starData => {
        const { countFiveStars, countFourStars, countThreeStars, countTwoStars, countOneStars } = starData;
        totalStars += 5 * countFiveStars + 4 * countFourStars + 3 * countThreeStars + 2 * countTwoStars + 1 * countOneStars;
        totalCount += countFiveStars + countFourStars + countThreeStars + countTwoStars + countOneStars;
      });

      const average = totalCount > 0 ? totalStars / totalCount : 0;
      setAverageStars(average);
    } else {
      setAverageStars(0);
    }
  }, [starsCounter]);

  return (
    <View style={styles.container}>
      <Text style={styles.textAverage}>{averageStars.toFixed(1)}</Text>
      <View style={styles.starContainer}>
        <Icon name={averageStars >= 1 ? "star" : "star-outline"} style={styles.icon} />
        <Icon name={averageStars >= 2 ? "star" : averageStars >= 1.5 ? "star-half" : "star-outline"} style={styles.icon} />
        <Icon name={averageStars >= 3 ? "star" : averageStars >= 2.5 ? "star-half" : "star-outline"} style={styles.icon} />
        <Icon name={averageStars >= 4 ? "star" : averageStars >= 3.5 ? "star-half" : "star-outline"} style={styles.icon} />
        <Icon name={averageStars >= 5 ? "star" : averageStars >= 4.5 ? "star-half" : "star-outline"} style={styles.icon} />
      </View>
      <Text style={styles.textVotes}>{total} votos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textAverage: {
    fontSize: 40,
    color: 'black',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
    color: '#f1c40f', // Color amarillo para las estrellas
    marginHorizontal: 2,
  },
  textVotes: {
    fontSize: 16,
    color: 'black',
  },
});

export default AverageStars;
