import React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Node from './Node';

export default function Grid(props) {

    const nodeWidth = 1/props.grid[0].length * 100;

    return ( 
        <View style={styles.grid}>
            {props.grid.map((row, rowIdx) => {
                
                return (
                    <View key={rowIdx} style={styles.gridrow} >
                        {row.map((node, colIdx) => {
                            
                            const isStart = props.startNode.row === node.row && props.startNode.column === node.column;
                            const isEnd = props.endNode.row === node.row && props.endNode.column === node.column;
                            
                            return (
                                <Node 
                                    ref={(nodeRef) => node.reference.current = nodeRef }
                                    key={colIdx}  
                                    nodeWidth={nodeWidth}
                                    row={node.row}
                                    column={node.column}
                                    reference={node.reference}
                                    startNode={props.startNode}
                                    endNode={props.endNode}
                                    isStart={isStart}
                                    isEnd={isEnd}

                                    onAddWall={props.onAddWall}
                                ></Node>
                            )
                        })}
                    </View>
                );
            })}
        </View>
     );
}

const styles = StyleSheet.create({
    grid: {
        marginTop: 15,
    },

    gridrow: {
        flexDirection: 'row'
    }
})
