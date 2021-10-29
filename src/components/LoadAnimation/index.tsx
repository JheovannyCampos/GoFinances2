import React from 'react';

import LottieView from 'lottie-react-native';

import Animation from '../../assets/animation.json'

import {
    Container
} from './styles';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView 
                source={Animation}
                autoPlay
                loop
                style={{height: 200}}
                resizeMode="contain"
            />
        </Container>
    );
}