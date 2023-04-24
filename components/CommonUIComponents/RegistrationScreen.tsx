import React, {FC, useState} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {Block} from "../../styles/Block";
import {Text} from "../../styles/Text";
import Logo from "../SimpleComponents/Logo";


const RegistrationScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        email: false,
        minLength: false,
        hasNumbers: false,
        hasLetters: false,
        hasSpecialChars: false,
        noRepetitions: false,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const updateValidation = () => {
        setValidation({
            email: emailRegex.test(email),
            minLength: password.length >= 8,
            hasNumbers: /\d/.test(password),
            hasLetters: /[a-zA-Z]/.test(password),
            hasSpecialChars: specialCharsRegex.test(password),
            noRepetitions: !/(.)\1{2,}/.test(password),
        });
    };

    const handleChange = (setter: (value: string) => void) => (text: string) => {
        setter(text);
        updateValidation();
    };

    const handleSubmit = () => {
        const allValid = Object.values(validation).every((v) => v);
        if (allValid) {
            Alert.alert("Registration successful");
        } else {
            Alert.alert("Please correct the invalid fields");
        }
    };

    return (
        <Block
            flex={1}
        >
            <Block
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                bg={'orange'}
            >
                <Logo/>
            </Block>
            <Block
                flex={2}
                justifyContent={'center'}
                paddingHorizontal={'20px'}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange(setEmail)}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange(setPassword)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View>
                    <ValidationItem valid={validation.email} text="Valid email" />
                    <ValidationItem valid={validation.minLength} text="At least 8 characters" />
                    <ValidationItem valid={validation.hasNumbers} text="Includes numbers" />
                    <ValidationItem valid={validation.hasLetters} text="Includes letters" />
                    <ValidationItem valid={validation.hasSpecialChars} text="Includes special characters" />
                    <ValidationItem valid={validation.noRepetitions} text="No more than two repetitions of the same character" />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </Block>
        </Block>

    );
};

type Props = {
    valid: boolean;
    text: string;
}

const ValidationItem: FC<Props> = ({ valid, text }) => (
    <Text style={valid ? styles.valid : styles.invalid}>{text}</Text>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#3b5998",
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
    },
    valid: {
        color: "green",
    },
    invalid: {
        color: "red",
    },
});

export default RegistrationScreen;