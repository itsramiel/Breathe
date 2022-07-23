import React, { useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";

const DimensionsContext = React.createContext<{ SCREEN_WIDTH: number; SCREEN_HEIGHT: number; CENTER: { x: number; y: number } }>({
  SCREEN_HEIGHT: 0,
  SCREEN_WIDTH: 0,
  CENTER: { x: 0, y: 0 },
});

interface DimensionsProviderProps {
  children?: React.ReactNode;
}

export const DimensionsProvider = ({ children }: DimensionsProviderProps) => {
  const headerHeight = useHeaderHeight();
  const bottomTabsHeight = useBottomTabBarHeight();
  const width = SCREEN_WIDTH;
  const height = SCREEN_HEIGHT - headerHeight - bottomTabsHeight;

  return (
    <DimensionsContext.Provider
      value={{
        SCREEN_WIDTH: width,
        SCREEN_HEIGHT: height,
        CENTER: { x: width / 2, y: height / 2 },
      }}
    >
      {children}
    </DimensionsContext.Provider>
  );
};

export const useDimensions = () => {
  return useContext(DimensionsContext);
};
