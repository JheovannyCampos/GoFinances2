import React, { useContext, useState } from 'react';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooteWrapper,
} from './styles';

// import AppleSvg from '../../assets/apple.svg';
// import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

// import { useAuth } from '../../hooks/auth'; 

import { RFValue } from 'react-native-responsive-fontsize';
// import { SignInSocialButton } from '../../components/SignInSocialButton';
// import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    // const { signInWithGoogle, signInWithApple } = useAuth()

    const theme = useTheme();
    const navigation: any = useNavigation();

    // async function handleSignInWithGoogle(){
    //     try {
    //         setIsLoading(true);
    //         return await signInWithGoogle();
    //     } catch (error) {
    //         console.log(error);
    //         Alert.alert("Não foi possível conectar a uma conta Google");
    //         setIsLoading(false);
    //     }
    // }
    // async function handleSignInWithApple(){
    //     try {
    //         setIsLoading(true);
    //         return await signInWithApple();
    //     } catch (error) {
    //         console.log(error);
    //         Alert.alert("Não foi possível conectar a uma conta Apple");
    //         setIsLoading(false);
    //     }
    // }

        async function appLoaded(){
        try {
            setIsLoading(true);
            navigation.navigate('Listagem')
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível conectar a uma conta Google");
            setIsLoading(false);
        }
    }
    

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de uma forma {'\n'}
                        muito simples {'\n'}
                    </Title>
                </TitleWrapper>

                {/* <SignInTitle>
                    Faça o seu login com {'\n'}
                    uma das contas abaixo {'\n'}
                </SignInTitle> */}
            </Header>
            <Footer>
                <FooteWrapper>
                    {/* <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        // Platform.OS === 'ios' &&
                        // <SignInSocialButton 
                        //     title="Entrar com Apple"
                        //     svg={AppleSvg}  
                        //     onPress={handleSignInWithApple}                     
                        // />
                    } */}
                </FooteWrapper>
                { !isLoading && (() => {appLoaded})}
            </Footer>
        </Container>
    )
}