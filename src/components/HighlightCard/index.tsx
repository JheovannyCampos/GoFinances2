import React from 'react';
import { StyleSheet } from "react-native";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from './styles';

interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'total';
    loading: boolean;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function HighlightCard({
    title,
    amount,
    lastTransaction,
    type,
    loading
}: Props) {
    return (
        <Container type={type}>
            <Header>
            { !loading ? <ShimmerPlaceHolder
                style={styles.shimmerTitle}
                visible={loading}
                LinearGradient = { LinearGradient }
            >
                <Title type={type}>{title}</Title>
            </ShimmerPlaceHolder> : 
                <Title type={type}>{title}</Title> 
            }

                <Icon name={icon[type]} type={type}/>

            </Header>

            <Footer>
            { !loading ? <ShimmerPlaceHolder
                style={styles.shimmerAmount}
                visible={loading}
                LinearGradient = { LinearGradient }
            >
                <Amount type={type}>{amount}</Amount>
            </ShimmerPlaceHolder> : 
                <Amount type={type}>{amount}</Amount>
            }
            { !loading ? <ShimmerPlaceHolder
                style={styles.shimmerLastTransaction}
                visible={loading}
                LinearGradient = { LinearGradient }
            >
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
                </ShimmerPlaceHolder> : 
                    <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            }
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    shimmerTitle: {
        height: 14,
        width: 150,
    },
    shimmerAmount: {
        height: 32,
        width: 190,
        marginTop: 30,
    },
    shimmerLastTransaction: {
        height: 12,
        width: 190,
        marginTop: 30,
    }
})