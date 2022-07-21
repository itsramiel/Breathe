import { Easing, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import React, { useEffect, useMemo } from "react";
import Circle from "./Circle";
import { COLORS } from "../constants";

const Breathe = () => {
  const progress = useSharedValue<0 | 1>(0);

  const data = useMemo(() => {
    return Array(2).fill(0);
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.bezier(0.5, 0, 0.5, 1) }), -1, true);
  }, []);

  return (
    <>
      {data.map((_, i) => {
        return <Circle index={i} progress={progress} key={i} length={data.length} initialAngle={0} color={COLORS[i]} />;
      })}
      {data.map((_, i) => {
        return <Circle index={i} progress={progress} key={i} length={data.length} initialAngle={(2 * Math.PI * 1) / 3} color={COLORS[1 - i]} />;
      })}
      {data.map((_, i) => {
        return <Circle index={i} progress={progress} key={i} length={data.length} initialAngle={(2 * Math.PI * 2) / 3} color={COLORS[i]} />;
      })}
    </>
  );
};

export default Breathe;
