import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 20;
const INFINITY_WIDTH = 200;
const INFINITY_HEIGHT = 100;

// Create the infinity path data
const createInfinityPath = () => {
  const points = [];
  for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
    const x = INFINITY_WIDTH * Math.sin(t);
    const y = INFINITY_HEIGHT * Math.sin(t) * Math.cos(t);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')} Z`;
};

export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const ballStyle = useAnimatedStyle(() => {
    // Calculate position along the infinity path
    const angle = progress.value * Math.PI * 2;
    
    // Parametric equations for infinity symbol
    const x = INFINITY_WIDTH * Math.sin(angle);
    const y = INFINITY_HEIGHT * Math.sin(angle) * Math.cos(angle);

    return {
      transform: [
        { translateX: x },
        { translateY: y },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={INFINITY_WIDTH * 2} height={INFINITY_HEIGHT * 2} style={styles.svg}>
        <Path
          d={createInfinityPath()}
          stroke="black"
          strokeWidth={2}
          fill="none"
          strokeDasharray="5,5"
        />
      </Svg>
      <Animated.View style={[styles.ball, ballStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: 'red',
  },
}); 