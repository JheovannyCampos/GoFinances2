import React from "react";
import { StyleSheet } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { categories } from "../../utils/categories";
import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from "./styles";

export interface TransactionCardProps{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
    
}

interface Props{
    data: TransactionCardProps;
    onPress: () => void;
    loading: boolean;
}

export function TransactionCard({ data, onPress, loading }:Props) {
    const category = categories.filter(
        item => item.key === data.category
    )[0];


    return(
        <Container
            onPress={onPress}
        >
            { 
                !loading ? <ShimmerPlaceHolder
                    style={styles.shimmerTitle}
                    visible={loading}
                    LinearGradient = { LinearGradient }
            >
                <Title>{data.name}</Title>
            </ShimmerPlaceHolder> : 
                <Title>{data.name}</Title>
            }
            { 
                !loading ? <ShimmerPlaceHolder
                    style={styles.shimmerAmount}
                    visible={loading}
                    LinearGradient = { LinearGradient }
            >
                <Amount type={data.type}>
                    { data.type === 'negative' && '- '}
                    { data.amount }
                </Amount>
            </ShimmerPlaceHolder> : 
                <Amount type={data.type}>
                    { data.type === 'negative' && '- '}
                    { data.amount }
                </Amount>
            }

            <Footer>
                <Category >
                { 
                    !loading ? <ShimmerPlaceHolder
                        style={styles.shimmerIcon}
                        visible={loading}
                        LinearGradient = { LinearGradient }
                    >
                        <Icon name={category.icon}/>
                    </ShimmerPlaceHolder> : 
                        <Icon name={category.icon}/>
                 }
                 { 
                    !loading ? <ShimmerPlaceHolder
                        style={styles.shimmerCategory}
                        visible={loading}
                        LinearGradient = { LinearGradient }
                    >
                        <CategoryName>{category.name}</CategoryName>
                    </ShimmerPlaceHolder> : 
                        <CategoryName>{category.name}</CategoryName>
                 }   
                </Category>
                { 
                    !loading ? <ShimmerPlaceHolder
                        style={styles.shimmerDate}
                        visible={loading}
                        LinearGradient = { LinearGradient }
                    >
                        <Date>{data.date}</Date>
                    </ShimmerPlaceHolder> : 
                        <Date>{data.date}</Date>
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
        height: 20,
        width: 190,
        marginTop: 30,
    },
    shimmerIcon: {
        height: 20,
        width: 20,
        marginTop: 5,
    },
    shimmerCategory: {
        height: 14,
        width: 130,
        marginLeft: 15,
    },
    shimmerDate: {
        height: 14,
        width: 50,
    },
})   