import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // TODO - setup animated style
      opacity: cardOpacity.value,
      transform: [
        { translateX: cardOffset.value }
      ]
    }
  })

  useEffect(() => {
    const animationDuration = {duration: 1000}
    /**
     * TODO - setup cardOpacity.value and cardOffset.value with
     * withTiming()
     */
    cardOffset.value = withTiming(0, animationDuration)
    cardOpacity.value = withTiming(1, animationDuration)
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}