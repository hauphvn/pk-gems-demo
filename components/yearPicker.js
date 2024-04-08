import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';

const YearPicker = ({year, onLeft, onRight}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLeft}>
                <AntDesign name="doubleleft" size={24} color="black"/>
            </TouchableOpacity>
            <Text>{year}</Text>
            <TouchableOpacity onPress={onRight}>
                <AntDesign name="doubleright" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        marginVertical: 5
    },
    sign: {},
    content: {}
})
export default YearPicker;
