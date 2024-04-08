import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {axiosNoAuth} from "./lib/axiosCommon";
import {BarChart} from "react-native-chart-kit";
import {formatNumber, formattedAmountVND} from './utils/converts';
import dayjs from "dayjs";
import YearPicker from "./components/yearPicker";
import {API_PATH} from "./lib/api";

export default function App() {
    // ref from: https://github.com/indiespirit/react-native-chart-kit/issues/161
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0.5,
        color: () => 'black',
        fillShadowGradient: '#0c6677',
        fillShadowGradientOpacity: 1,
        strokeWidth: 2,
        barPercentage: 0.5,
        propsForLabels: {
            fontSize: '10',
        },
        barRadius: 5,
        height: 5000,
        formatYLabel: (value) => formatNumber((Math.floor(value / 100) * 100)),
        formatTopBarValue: (value) => ((value.toFixed(1)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        decimalPlaces: 0, // optional, defaults to 2dp

        style: {
            borderRadius: 16,
        },
        propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: "#e3e3e3",
            strokeDasharray: "0",
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };
    const [isLoading, setIsLoading] = useState(true);
    const [year, setYear] = useState((dayjs().year() - 1).toString())
    const [revenueTotal, setRevenueTotal] = useState(0);
    const [reportInfo, setReportInfo] = useState({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
            {
                data: [],
            }
        ]
    });
    const body = {
        Nam: year,
        ListidCuaHang: ["all"]

    }

    function onGetReportInfoByYear() {
        axiosNoAuth.post(API_PATH.REPORT.BY_YEAR, body)
            .then(async (res) => {
                const report = res[0];
                const dataReportYear = [];
                let total = 0;
                for (const index of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
                    const numberConvert = report[`DoanhThu${index}`];
                    total += +numberConvert;
                    dataReportYear.push(numberConvert / 1000000);
                }
                setRevenueTotal(total);
                setReportInfo(prevState => ({
                    ...prevState,
                    datasets: [{data: dataReportYear}]
                }))
            })
            .catch(e => {
                console.log(e.message)
                Alert.alert('Lỗi', 'Lỗi lấy thông tin báo cáo', [
                    {
                        text: 'Đóng',
                    },
                ])
            }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (year) {
            setIsLoading(true);
            onGetReportInfoByYear();
        }
    }, [year]);

    useEffect(() => {
        onGetReportInfoByYear();
    }, []);

    return (
        <View style={{flex: 1}}>
            {isLoading ? (
                <ActivityIndicator style={{flex: 1}} size="large" color="#0c6677"/>
            ) : (
                <View style={styles.container}>
                    <Text>Báo cáo doanh thu năm {year}</Text>
                    <YearPicker
                        year={year}
                        onLeft={() => setYear(prevState => +prevState - 1)}
                        onRight={() => setYear(prevState => +prevState + 1)}
                    />
                    <View style={styles.totalWrapper}>
                        <Text style={styles.totalText}>Tổng doanh thu: {formattedAmountVND(revenueTotal)}</Text>
                    </View>

                    <StatusBar style="auto"/>
                    <View>
                        <Text style={styles.textNoteChart}>Đơn vị tính (triệu đồng)</Text>
                        {revenueTotal > 0 ? (
                            <BarChart
                                data={reportInfo}
                                width={Dimensions.get('window').width - 16}
                                height={520}
                                chartConfig={chartConfig}
                                verticalLabelRotation={0}
                                showValuesOnTopOfBars={true}
                                segments={7}
                                fromZero={true}
                                // withCustomBarColorFromData={true}
                                showBarTops={false}
                                showAxis={true}
                                withInnerLines={false}
                                flatColor={true}
                                yAxisLabel={''}/>
                        ) : null}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    totalWrapper: {
        borderRadius: 4,
        height: 40,
        backgroundColor: '#ccc',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 10
    },
    totalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'brown'
    },
    textNoteChart: {
        fontSize: 12,
        color: 'gray',
        paddingLeft: 25
    }
});
