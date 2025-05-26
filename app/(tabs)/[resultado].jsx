import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function Resultado() {
  const route = useRoute();
  const { imc } = route.params || {};
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const qualIMC = (imc) => {
    if (!imc) return "";
    const imcNum = parseFloat(imc);
    if (imcNum < 18.5) return "Abaixo do peso";
    if (imcNum < 24.9) return "Peso normal";
    if (imcNum < 29.9) return "Sobrepeso";
    if (imcNum < 34.9) return "Obesidade Grau 1";
    if (imcNum < 39.9) return "Obesidade Grau 2";
    return "Obesidade Grau 3";
  };

  const iconeParaIMC = (imc) => {
    if (!imc) return "scale-balance";
    const imcNum = parseFloat(imc);
    if (imcNum < 18.5) return "weight-lifter";
    if (imcNum < 24.9) return "heart-circle";
    if (imcNum < 29.9) return "food-apple";
    if (imcNum < 34.9) return "food-fork-drink";
    if (imcNum < 39.9) return "run";
    return "run-fast";
  };

  const ajudaIMC = (imc) => {
    if (!imc) return "Calcule seu IMC";
    const imcNum = parseFloat(imc);
    if (imcNum < 18.5)
      return "Procure um nutricionista para ganhar peso de forma saudável!";
    if (imcNum < 24.9)
      return "Parabéns! Mantenha a dieta equilibrada e exercícios!";
    if (imcNum < 29.9)
      return "Atenção! Procure melhorar sua alimentação e fazer exercícios.";
    return "Procure ajuda profissional para um programa de emagrecimento!";
  };

  return (
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
        <Text style={styles.title}>Resultado do IMC</Text>
        <View style={styles.resultContainer}>
          <MaterialCommunityIcons
            name={iconeParaIMC(imc)}
            size={60}
            color="#FF8C00"
            style={styles.icon}
          />
          <Text style={styles.resultText}>Seu IMC é:</Text>
          <Text style={styles.imcValue}>{imc ? imc : "N/A"}</Text>
          <Text style={styles.statusText}>{qualIMC(imc)}</Text>
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{ajudaIMC(imc)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#FF8C00" />
          <Text style={styles.buttonText}>Calcular Novamente</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
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
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#ffffff",
    textAlign: "center",
  },
  resultContainer: {
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
  resultText: {
    fontSize: 22,
    color: "#1c1c1e",
    marginBottom: 15,
  },
  imcValue: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#FF8C00",
    marginBottom: 15,
  },
  statusText: {
    fontSize: 26,
    color: "#1c1c1e",
    fontWeight: "600",
  },
  icon: {
    marginBottom: 20,
    transform: [{ scale: 1.2 }],
  },
  tipContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(255, 140, 0, 0.15)",
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 140, 0, 0.2)",
  },
  tipText: {
    color: "#FF8C00",
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    marginTop: 30,
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
