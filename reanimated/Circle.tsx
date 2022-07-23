import React from "react";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { SCREEN_WIDTH } from "../constants";

interface CircleProps {
  index: number;
  progress: Animated.SharedValue<0 | 1>;
  initialAngle: number;
  color: string;
}

const Circle = ({ index, progress, initialAngle, color }: CircleProps) => {
  const rStyle = useAnimatedStyle(() => {
    const startingAngle = (index * (2 * Math.PI)) / 2 + initialAngle;
    const SIZE = interpolate(progress.value, [0, 1], [SCREEN_WIDTH / 9, SCREEN_WIDTH / 3]);
    return {
      width: SIZE,
      height: SIZE,
      backgroundColor: interpolateColor(progress.value, [0, 0.3], ["#fff", color]),
      borderRadius: SIZE / 2,
      transform: [
        { translateY: SIZE / 2 - SIZE / 2 },
        { rotate: `${startingAngle + interpolate(progress.value, [0, 1], [0, Math.PI / 2])}rad` },
        { translateY: -(SIZE / 2) + interpolate(progress.value, [0, 1], [SIZE / 2, 0]) },
      ],
      position: "absolute",
      opacity: 1 / 6,
    };
  }, [index]);

  return <Animated.View style={rStyle} />;
};

export default Circle;
