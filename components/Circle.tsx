import React from "react";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { COLOR, SCREEN_WIDTH } from "../constants";

interface CircleProps {
  index: number;
  length: number;
  progress: Animated.SharedValue<0 | 1>;
  initialAngle: number;
}

const Circle = ({ index, progress, length, initialAngle }: CircleProps) => {
  const rStyle = useAnimatedStyle(() => {
    const startingAngle = (index * (2 * Math.PI)) / 3 + initialAngle;
    const SIZE = interpolate(progress.value, [0, 1], [SCREEN_WIDTH / 6, SCREEN_WIDTH / 2]);
    return {
      width: SIZE,
      height: SIZE,
      backgroundColor: COLOR,
      borderRadius: SIZE / 2,
      transform: [
        { translateY: SIZE / 2 - SIZE / 2 },
        { rotate: `${startingAngle + interpolate(progress.value, [0, 1], [0, Math.PI / 2])}rad` },
        { translateY: -(SIZE / 2) + interpolate(progress.value, [0, 1], [SIZE / 2, 0]) },
      ],
      position: "absolute",
      opacity: 1 / length,
    };
  }, [index, length]);

  return <Animated.View style={rStyle} />;
};

export default Circle;
