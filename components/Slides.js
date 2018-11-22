import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide = (index) => {
    const { onComplete } = this.props;
    if (index === this.props.data.length - 1) {
      return (
        <Button
          raised
          title="Onward !"
          buttonStyle={styles.button}
          onPress={onComplete}
        />
      );
    }
  }

  renderSlides = () => {
    const { data } = this.props;
    return data.map((slide, index) => (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      )
    );
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;
