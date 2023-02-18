import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PanResponder,
  PanResponderInstance,
  Animated,
  Modal
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Card, ListItem, Button,Input } from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux';

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function immutableMove(arr, from, to) {
  console.log("from "+from+' to '+to )
  const newData = arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    
    return prev;
  }, []);


  const newDataOrder = newData.map((item,index)=>{

      item.order = index + 1
      return item
  })

  console.log(newDataOrder)

  return newDataOrder;
}

const colorMap = {};

export default class ListDragDestinations extends React.Component {
  state = {
    visible:true,
    dragging: false,
    draggingIdx: -1,
    data: this.props.data
  };

  _panResponder: PanResponderInstance;
  point = new Animated.ValueXY();
  currentY = 0;
  scrollOffset = 0;
  flatlistTopOffset = 0;
  rowHeight = 0;
  currentIdx = -1;
  active = false;

  constructor(props) {
    super(props);
    console.log("load list destinations drag ",props.data)
    
    this._panResponder = PanResponder.create({
      
        // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.currentIdx = this.yToIndex(gestureState.y0);
        this.currentY = gestureState.y0;
        Animated.event([{ y: this.point.y }])({
          y: gestureState.y0 - this.rowHeight / 2
        });
        this.active = true;
        this.setState({ dragging: true, draggingIdx: this.currentIdx }, () => {
          this.animateList();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.currentY = gestureState.moveY;
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  animateList = () => {
    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      // check y value see if we need to reorder
      const newIdx = this.yToIndex(this.currentY);
      if (this.currentIdx !== newIdx) {
        this.setState({
          data: immutableMove(this.state.data, this.currentIdx, newIdx),
          draggingIdx: newIdx
        });
        this.currentIdx = newIdx;
      }
//      console.log(this.state.data)
      this.animateList();
    });
  };

  yToIndex = (y: number) => {
    const value = Math.floor(
      (this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight
    );

    if (value < 0) {
      return 0;
    }

    if (value > this.state.data.length - 1) {
      return this.state.data.length - 1;
    }

    return value;
  };

  reset = () => {
    this.active = false;
    this.setState({ dragging: false, draggingIdx: -1 });
  };

  render() {
    const { data, dragging, draggingIdx } = this.state;
    
    console.log("item ",this.props.data)    
    const renderItem = ({ item, index }, noPanResponder = false) => (
      <View
        onLayout={e => {
          this.rowHeight = e.nativeEvent.layout.height;
        }}
        style={{
          padding: 5,
          borderColor:"#CCC",
          borderBottomWidth: 1,
          marginBottom:3, 
          flexDirection: "row",
          opacity: draggingIdx === index ? 0 : 1
        }}
      >
        <View style={{marginRight:5}}>
        <Icon
                            name="map-marker"
                            size={24}
                            color="red"
                            />
        </View>
        <Text style={{ fontSize: 18, textAlign: "left", flex: 1 }}>
          {item.title}
        </Text>
        <View style={{marginRight:5}}>
        <Button
                        
                        buttonStyle={{
                            backgroundColor:'red',
                            height:30,
                            paddingTop:6
                          }}
                        icon={
                            <Icon
                            name="close"
                            backgroundColor="red"
                            size={15}
                            color="white"
                            />
                        }
                                                
                        />
        
        </View>
        <View {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
        <Button
                        
                        icon={
                            <Icon
                            name="bars"
                            size={15}
                            color="white"
                            />
                        }
                                                
                        />
        </View>
      </View>
    );

    return (
    <View style={styles.container}>
        
        {dragging && (
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "black",
              zIndex: 2,
              width: "100%",
              top: this.point.getLayout().top
            }}
          >
            {renderItem({ item: data[draggingIdx], index: -1 }, true)}
          </Animated.View>
        )}

        <FlatList
          scrollEnabled={!dragging}
          style={{ width: "100%" }}
          data={data}
          renderItem={renderItem}
          onScroll={e => {
            this.scrollOffset = e.nativeEvent.contentOffset.y;
          }}
          onLayout={e => {
            this.flatlistTopOffset = e.nativeEvent.layout.y;
          }}
          scrollEventThrottle={16}
          keyExtractor={item => "" + item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

