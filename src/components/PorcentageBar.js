import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PorcentageBar = ({ quantity, total, textStars }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage((quantity / total) * 100);
  }, [quantity, total]);

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.textStarsNumber}>{textStars}</Text>
        <View style={styles.progressBarBackground}>
          {(quantity != 0) && <View style={[styles.progressBar, { width: `${percentage}%` }]}></View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    marginLeft: "2%",
    height: 10,
    backgroundColor: '#cccccc', // Color de fondo gris para la barra completa
    width: '86%',
    borderRadius: 6,
    overflow: 'hidden', // Para recortar la barra de progreso dentro del contenedor
  },
  progressBar: {
    height: '100%', // Altura igual al contenedor
    backgroundColor: '#3498db', // Color azul para la parte llenada
  },
  textStarsNumber: {
    fontSize: 16,
    color: 'black',
  },
});

export default PorcentageBar;
