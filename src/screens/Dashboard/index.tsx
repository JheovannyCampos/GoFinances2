import React, { useCallback, useEffect, useState } from "react";

import { ActivityIndicator, Alert, ScrollView,Text,View,StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/core";

import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,
 } from "./styles";

import { ButtonDelete } from "../../components/Form/ButtonDelete"
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps{
    amount: string;
    lastTransaction: string;
}
interface HightlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HightlightData>({} as HightlightData);

    const theme = useTheme();
    const { signOut, user } = useAuth();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ){
        const colletionFilttered = collection
        .filter(transaction => transaction.type === type);

        if(colletionFilttered.length === 0) return 0;

        const lastTransaction = new Date(
        Math.max.apply(Math, colletionFilttered
        .map(transaction => new Date(transaction.date).getTime())))
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`;
    }
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    async function loadTransactions(){
        
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setTransactions(transactionsFormatted);
        setIsLoading(false);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
        
        const totalInterval = lastTransactionEntries === 0 ? 'Não há transações' : `01 a ${lastTransactionEntries}`

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',   
                   }),
                   lastTransaction: totalInterval ,
            },
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                 style: 'currency',
                 currency: 'BRL',  
                }),
                lastTransaction: lastTransactionEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionEntries}`, 
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',   
                   }),
                   lastTransaction: lastTransactionExpensives === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionExpensives}`,
            },
            
        });

    }
    async function handleRemoveTransaction(transactionId: string) {
        const response = await AsyncStorage.getItem(dataKey);
        const storagedTransactions = response ? JSON.parse(response) : [];
       
        const filteredTransactions = storagedTransactions
        .filter((transaction: DataListProps) => transaction.id !== transactionId);
      
        setTransactions(filteredTransactions);
        await AsyncStorage.setItem(dataKey, JSON.stringify(filteredTransactions));
  
        loadTransactions()
        }
        function alerta(name: string, id: string) {
          Alert.alert(`Você deseja deletar ${String(name)}`,
          "",
          [
            {text: 'Cancelar', },
            {text: 'Deletar', onPress: () => handleRemoveTransaction(id) },
          ],
            {cancelable: false}
          )}

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    setTimeout(() => {
        setIsLoading(true);
    }, 1500)

    return(
        <Container>
            
            <>
                <Header>
                    <UserWrapper>    
                        <UserInfo>
                            <Photo source={{uri : "https://avatars.githubusercontent.com/u/53500639?v=4"}}
                            />
                            <User>
                                <UserGreeting>Olá </UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton
                            onPress={signOut}
                        >
                            <Icon name="power" />
                        </LogoutButton>
                    </UserWrapper> 
                </Header>
                <HighlightCards>

                    <HighlightCard 
                            title="Total" 
                            amount={highlightData?.total?.amount}
                            lastTransaction={highlightData?.total?.lastTransaction} 
                            type="total"
                            loading={isLoading}
                    />
     
                    <HighlightCard 
                        title="Entradas" 
                        amount={highlightData?.entries?.amount}
                        lastTransaction={highlightData?.entries?.lastTransaction} 
                        type="up"
                        loading={isLoading}
                    /> 
                    <HighlightCard 
                        title="Saídas" 
                        amount={highlightData?.expensives?.amount}
                        lastTransaction={highlightData?.expensives?.lastTransaction}
                        type="down"
                        loading={isLoading}
                    />  
                </HighlightCards>
            
                <Transactions>
                    <Title>Listagem</Title>
                    
                    <TransactionList
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <TransactionCard onPress={()=> alerta(item.name, item.id)} data={item} loading={isLoading}/>}
                        showsVerticalScrollIndicator={false}
                    />
                </Transactions>
            </>
        </Container>
    )
}
