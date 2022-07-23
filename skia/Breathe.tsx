import React, { useMemo } from "react";
import { DimensionsProvider, useDimensions } from "../hooks/Provider";
import {
  Canvas,
  Circle,
  Color,
  Easing,
  Group,
  interpolate,
  interpolateColors,
  SkiaValue,
  Transforms2d,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia";
import { COLORS } from "../constants";

const Breathe = () => {
  return (
    <DimensionsProvider>
      <_Breathe />
    </DimensionsProvider>
  );
};

export default Breathe;

const _Breathe = () => {
  const skValue = useTiming({ from: 0, to: 1, loop: true, yoyo: true }, { duration: 3500, easing: Easing.bezier(0.5, 0, 0.5, 1) });
  const { CENTER, SCREEN_HEIGHT, SCREEN_WIDTH } = useDimensions();
  const data = useMemo(() => {
    return Array(6).fill(0);
  }, []);

  const radius = SCREEN_WIDTH / 6;

  return (
    <Canvas style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
      {data.map((_, i) => {
        return (
          <MyCircle
            center={CENTER}
            radius={radius}
            color={i <= 2 ? COLORS[0] : COLORS[1]}
            opacity={1 / data.length}
            skValue={skValue}
            angle={2 * Math.PI * (i / data.length)}
            key={i}
          />
        );
      })}
    </Canvas>
  );
};

interface MyCircleProps {
  center: { x: number; y: number };
  radius: number;
  color: Color;
  opacity: number;
  skValue: SkiaValue<number>;
  angle: number;
}

const MyCircle = ({ center, radius, color, opacity, skValue, angle }: MyCircleProps) => {
  const r = useComputedValue(() => {
    return radius / interpolate(skValue.current, [0, 1], [3, 1]);
  }, [skValue]);

  const transform = useComputedValue((): Transforms2d => {
    return [
      { translateY: -r.current },
      { rotate: interpolate(skValue.current, [0, 1], [angle, angle + Math.PI / 2]) },
      { translateY: interpolate(skValue.current, [0, 1], [r.current, 0]) },
    ];
  }, [skValue, r]);

  const origin = useComputedValue(() => {
    return { x: center.x, y: center.y + r.current };
  }, [r]);

  const animatedColor = useComputedValue(() => {
    return interpolateColors(skValue.current, [0, 0.3], ["#fff", color]);
  }, [skValue]);

  return (
    <Group transform={transform} origin={origin}>
      <Circle cx={center.x} cy={center.y} r={r} color={animatedColor} opacity={opacity} />
    </Group>
  );
};
