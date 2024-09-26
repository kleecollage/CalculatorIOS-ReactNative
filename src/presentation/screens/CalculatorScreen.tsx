import React from 'react'
import { Text, View } from 'react-native'
import { colors, styles } from '../../config/theme/app-theme';
import { CalculatorButton } from '../components/CalculatorButton' ;
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const { 
    number, prevNumber, formula,
    buildNumber, toggleSign, clean, deleteOperation, calculateResult,
    divideOperation, multiplyOperation, substractOperation, addOperation
  } = useCalculator()

  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal:30, paddingBottom:20}}>
        
        <Text style={styles.mainResult} adjustsFontSizeToFit numberOfLines={1}>{ formula } </Text>
        
        {
          (formula === prevNumber)
          ? <Text style={styles.subResult}> </Text>
          : (
            <Text style={styles.subResult} adjustsFontSizeToFit numberOfLines={1}>
              { prevNumber }
            </Text>
          )
        }

        

      </View>

      <View style={styles.row}>
         <CalculatorButton onPress={ () => clean() } blackText color={colors.lightGray} label= 'C' />
         <CalculatorButton onPress={ toggleSign } blackText color={colors.lightGray} label= '+/-' />
         <CalculatorButton onPress={ deleteOperation } blackText color={colors.lightGray} label= 'del' />
         <CalculatorButton onPress={ divideOperation } color={colors.orange} label= '÷' />         
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={ () => buildNumber('7') } label='7' />
        <CalculatorButton onPress={ () => buildNumber('8') } label='8' />
        <CalculatorButton onPress={ () => buildNumber('9') } label='9' />
        <CalculatorButton onPress={ multiplyOperation } color={colors.orange} label='x' />
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={ () => buildNumber('4') } label='4' />
        <CalculatorButton onPress={ () => buildNumber('5') } label='5' />
        <CalculatorButton onPress={ () => buildNumber('6') } label='6' />
        <CalculatorButton onPress={ substractOperation } color={colors.orange} label='-' />
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={ () => buildNumber('1') } label='1' />
        <CalculatorButton onPress={ () => buildNumber('2') } label='2' />
        <CalculatorButton onPress={ () => buildNumber('3') } label='3' />
        <CalculatorButton onPress={ addOperation } color={colors.orange} label='+' />
      </View>

      <View style={styles.row}>
        <CalculatorButton onPress={ () => buildNumber('0') } label='0' doubleSize />
        <CalculatorButton onPress={ () => buildNumber('.') } label='.' />
        <CalculatorButton onPress={ calculateResult } color={colors.orange} label='=' />
      </View>

    </View>
  );
}
