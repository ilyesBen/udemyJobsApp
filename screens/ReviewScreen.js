import React, { Component } from 'react';
import { ScrollView, Platform, View, Text, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => (
    {
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          backgroundColor="transparent"
          color="rgba(0, 122, 255, 1)"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  );

  renderLikedJobs = () => this.props.likedJobs.map(job => {
    const { geometry } = job;
    const { location } = geometry;
    const initialRegion = {
      longitude: location.lng,
      latitude: location.lat,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card
        title={job.name}
        key={job.id}
      >
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{job.name}</Text>
            <Text style={styles.italics}>rating: {job.rating}</Text>
          </View>
          <Button
            title="apply now"
            backgroundColor="#03A9F4"
            onPress={() => Linking.openURL(job.icon)}
          />
        </View>
      </Card>
    );
  }
);

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    marginBotton: 10,
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

const mapStateToProps = (state) => ({
  likedJobs: state.likedJobs
});

export default connect(mapStateToProps)(ReviewScreen);
