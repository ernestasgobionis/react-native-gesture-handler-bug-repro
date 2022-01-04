import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Gesture,
    GestureDetector,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const Ball = () => {
    const panGestureRef = useRef(Gesture.Pan());
    const isFirstBallPressed = useSharedValue(false);
    const isSecondBallPressed = useSharedValue(false);
    const useSpring = useSharedValue(false);
    const firstBallOffset = useSharedValue({ x: 0, y: 0 });
    const secondBallOffset = useSharedValue({ x: 0, y: 0 });

    const firstBallStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: useSpring.value ? withSpring(firstBallOffset.value.x) : firstBallOffset.value.x },
                { translateY: useSpring.value ? withSpring(firstBallOffset.value.y) : firstBallOffset.value.y },
                { scale: withSpring(isFirstBallPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isFirstBallPressed.value ? 'yellow' : 'blue',
        };
    });
    const secondBallStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: useSpring.value ? withSpring(secondBallOffset.value.x) : secondBallOffset.value.x },
                { translateY: useSpring.value ? withSpring(secondBallOffset.value.y) : secondBallOffset.value.y },
                { scale: withSpring(isSecondBallPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: isSecondBallPressed.value ? 'yellow' : 'limegreen',
        };
    });
    const panGesture = Gesture.Pan()
        .onStart(() => {
            useSpring.value = false;
            isFirstBallPressed.value = true;
            console.log('New API gesture start', {
                offsetval: firstBallOffset.value.x,
            });
        })
        .onUpdate(({ translationX, translationY }) => {
            console.log('New API gesture update --- ', { translationX, translationY });
            firstBallOffset.value = {
                x: translationX,
                y: translationY,
            };
        })
        .onEnd((e) => {
            console.log('New API gesture end --- ', e);
        })
        .withRef(panGestureRef);

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
        onStart: ({ velocityY, velocityX }, ctx) => {
            useSpring.value = false;
            isSecondBallPressed.value = true;
            ctx.x = secondBallOffset.value.x;
            ctx.y = secondBallOffset.value.y;
            console.log('Old API gesture start', {
                velocityY,
                velocityX,
                offsetval: secondBallOffset.value.x,
            });
        },
        onActive: ({ translationX, translationY }, ctx) => {
            console.log('Old API gesture active', {
                translationX,
                translationY,
                offsetval: secondBallOffset.value.x,
            });
            secondBallOffset.value = {
                x: ctx.x + translationX,
                y: ctx.y + translationY,
            };
        },
        onFinish: ({ velocityY, velocityX }) => {
            useSpring.value = true;
            isSecondBallPressed.value = false;
            console.log('Old API gesture finish', { velocityX, velocityY });
            secondBallOffset.value = {
                x: 0,
                y: 0,
            };
        },
    });

    return (
        <>
            <View style={styles.ballContainer}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.ball, firstBallStyles]} />
                </GestureDetector>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View style={[styles.ball2, secondBallStyles]} />
                </PanGestureHandler>
            </View>
        </>
    );
};

export default function Example() {
    return (
        <View style={styles.container}>
            <Ball />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ballContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    ball2: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
});
