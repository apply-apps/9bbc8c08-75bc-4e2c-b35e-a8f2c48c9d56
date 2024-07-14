// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  View,
} from 'react-native';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
  const [hero, setHero] = useState('');
  const [villain, setVillain] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const getFairyTale = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
          { role: 'user', content: `Create a fairy tale with the hero: ${hero}, the villain: ${villain}, and the plot: ${plot}.` },
        ],
        model: 'gpt-4o',
      });
      const { data } = response;
      setStory(data.response);
    } catch (error) {
      setStory('Sorry, something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Hero's name"
          value={hero}
          onChangeText={setHero}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the Villain's name"
          value={villain}
          onChangeText={setVillain}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the Plot"
          value={plot}
          onChangeText={setPlot}
        />
        <Button title="Generate Fairy Tale" onPress={getFairyTale} />
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <Text style={styles.story}>{story}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  story: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});