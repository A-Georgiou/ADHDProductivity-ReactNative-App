import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const calculateItemStyle = (start, end) => {
    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();
  
    const top = startHour * 60 + (startMinutes / 60) * 60;
    const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;
  
    return { top, height };
  };

const CalendarBlock = ({ item }) => {
    const { id, title, start, end, allDay } = item;
    const style = calculateItemStyle(start, end);
  
    return (
      <View style={[styles.event, { top: style.top, height: style.height }]}>
        <Text>{title}</Text>
      </View>
    );
  };

export default CalendarBlock;

const styles = StyleSheet.create({
container: {
    position: 'relative',
    flex: 1
},
timeSlot: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
},
event: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1
}
});