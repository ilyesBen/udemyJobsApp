import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  renderCard(job) {
    const { geometry } = job;
    const { location } = geometry;
    const initialRegion = {
      longitude: location.lng,
      latitude: location.lat,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.name}>
        <View style={{ height: 400 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>rating: {job.rating}</Text>
          <Text>{job.types[0].replace(/_/g, ' ')}</Text>
        </View>
        <Text>
          {job.formatted_address}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title='No more jobs'>
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBotton: 10
  }
};

const mapStateToProps = ({ jobs }) => ({
  jobs: jobs.results
});

export default connect(mapStateToProps, actions)(DeckScreen);
