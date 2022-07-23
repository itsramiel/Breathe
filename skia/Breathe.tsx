import React from "react";
import { DimensionsProvider, useDimensions } from "../hooks/Provider";
import { Canvas, Circle, Color, Group, interpolate, SkiaValue, useComputedValue, useTiming, useValue } from "@shopify/react-native-skia";

const Breathe = () => {
  return (
    <DimensionsProvider>
      <_Breathe />
    </DimensionsProvider>
  );
};

export default Breathe;

const _Breathe = () => {
  // const skValue = useTiming({ from: 0, to: 1, loop: true, yoyo: true }, { duration: 2000 });
  const skValue = useValue(0);
  const { CENTER, SCREEN_HEIGHT, SCREEN_WIDTH } = useDimensions();

  return (
    <Canvas style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
      <MyCircle center={CENTER} radius={40} color="white" opacity={1 / 6} skValue={skValue} angle={2 * Math.PI * (0 / 4)} />
      <MyCircle center={CENTER} radius={40} color="white" opacity={1 / 6} skValue={skValue} angle={2 * Math.PI * (1 / 4)} />
      <MyCircle center={CENTER} radius={40} color="white" opacity={1 / 6} skValue={skValue} angle={2 * Math.PI * (2 / 4)} />
      <MyCircle center={CENTER} radius={40} color="white" opacity={1 / 6} skValue={skValue} angle={2 * Math.PI * (3 / 4)} />
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
    return interpolate(skValue.current, [0, 1], [1, 3]) * radius;
  }, [skValue]);

  const transform = useComputedValue(() => {
    return [{ rotate: interpolate(skValue.current, [0, 1], [angle, angle + Math.PI / 2]) }];
  }, [skValue]);

  const origin = useComputedValue(() => {
    return { x: center.x, y: center.y + r.current };
  }, [skValue]);

  return (
    <Group transform={transform} origin={origin}>
      <Circle cx={center.x} cy={center.y} r={r} color={color} opacity={opacity} />
    </Group>
  );
};
