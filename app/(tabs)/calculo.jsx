import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

// Define the calcularIMC function
function calcularIMC(peso, altura) {
  if (!peso || !altura) return null;
  return peso / (altura * altura);
}

export default function Calculo() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        Easing,
      }),
    ]).start();
  }, []);

  const Calcular = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const imc = calcularIMC(pesoNum, alturaNum);

    if (imc === null || isNaN(imc)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
    } else {
      router.push(`/(tabs)/resultado?imc=${imc.toFixed(2)}`);
    }
  };

  return (
    StatusBar.setBarStyle("transparent", true),
    StatusBar.setBackgroundColor("transparent"),
    StatusBar.setTranslucent(true),
    StatusBar.setHidden(true),
    (
      <LinearGradient
        colors={["#FF8C00", "#FFA500", "#FFB347"]}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.titulo}>Calculadora de IMC</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1.75"
                placeholderTextColor="rgba(28, 28, 30, 0.6)"
                value={altura}
                onChangeText={setAltura}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 70"
                placeholderTextColor="rgba(28, 28, 30, 0.6)"
                value={peso}
                onChangeText={setPeso}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={Calcular}>
              <MaterialCommunityIcons
                name="calculator"
                size={24}
                color="#FF8C00"
              />
              <Text style={styles.buttonText}>Calcular IMC</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#ffffff",
    textAlign: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1c1e",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    color: "#1c1c1e",
    borderWidth: 1,
    borderColor: "rgba(28, 28, 30, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 140, 0, 0.2)",
  },
  buttonText: {
    color: "#FF8C00",
    fontSize: 18,
    fontWeight: "bold",
  },
});
