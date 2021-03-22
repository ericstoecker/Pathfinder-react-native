import React from 'react';
import { View, StyleSheet, Animated, Pressable, PanResponder } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faBullseye, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class Node extends React.Component {
    
    state = {
        colorAnim: new Animated.Value(0),
        pan: new Animated.ValueXY(),
    };

    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove         : Animated.event([null, {
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }], {
            useNativeDriver: false
        }),
        onPanResponderRelease      : (e, gesture) => {
            console.log(gesture.moveY, gesture.moveX);
            //call function to set now start/endpoint
        }
    });

    /* setNodeDimensions = (event) => {
        this.setState({
            nodeDimensions: event.nativeEvent.layout
        });
    } */


    visitedAnimation = () => {
        
        Animated.timing(
            this.state.colorAnim,
            {
                toValue: 100,
                duration: 1000,
                useNativeDriver: false,
            }
        ).start();
    }

    pathAnimation = () => {

        Animated.timing(
            this.state.colorAnim,
            {
                toValue: 200,
                duration: 200,
                useNativeDriver: false,
            }
        ).start();
    }

    wallAnimation = () => {
        this.state.colorAnim.setValue(300);

        Animated.timing(
            this.state.colorAnim,
            {
                toValue: 400,
                duration: 200,
                useNativeDriver: false,
            }
        ).start();
    }

    addWall = (row, column) => {
        this.props.onAddWall(row, column);
    }
    
    render() {
        const props = this.props;
        
        const backgroundColor = this.state.colorAnim.interpolate({
            inputRange: [
                0, 
                0.1, 
                100, 
                200, 
                300, 
                400
            ],
            outputRange: [
                'rgb(255,255,255)', 
                'rgb(255,255,0)', 
                'rgb(40, 168, 211)', 
                'rgb(255,255,0)', 
                'rgb(255,255,255)', 
                'rgb(0,0,0)'
            ]
        });
        
        return (
            <Animated.View
                /* onStartShouldSetResponder={() => true} 
                onResponderStart={() => this.addWall(props.row, props.column)} */
                {...this.panResponder.panHandlers} 
                width={`${props.nodeWidth}%`}
                backgroundColor={backgroundColor}
                style={styles.node}
                >
                {(props.isStart) && 
                    <View style={styles.startNode}>
                        <FontAwesomeIcon icon={ faChevronRight } id="start-icon" />
                    </View>
                }
                {(props.isEnd) &&
                    <View style={styles.endNode}>
                        <FontAwesomeIcon icon={ faBullseye } id="start-icon" />
                    </View>
                }
                {(!(props.isStart || props.isEnd)) &&
                    <View>
                    </View>
                }
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    node: {
        height: 15,
        borderWidth: 1,
        borderColor: 'lightblue',
        borderBottomWidth: 0,
        borderLeftWidth: 0
    },

    startNode: {
        width: '100%',
        height: '100%'
    },

    endNode: {
        width: '100%',
        height: '100%'
    }
})
 
export default Node;