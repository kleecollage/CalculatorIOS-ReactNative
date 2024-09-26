import { useEffect, useRef, useState } from "react"

enum Operator {
  add = '+',
  substract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {

  const [formula, setFormula] = useState('');

  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if(lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`)
    } else {
      setFormula(number)
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`)
  }, [formula]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = undefined;
    setFormula(number)
  }

  const deleteOperation = () => {
    if(number.length == 1 || number.startsWith('0') ) return setNumber('0')
    if(number.startsWith('-') && number.length == 2) return setNumber('0')
    
    return setNumber(number.slice(0,-1))
  }

  const toggleSign = () => {
    if(number.includes('-')) {
      return setNumber( number.replace('-', ''))
    }
    if(number.startsWith('-')){
      return setNumber('-' + number);
    }
    return setNumber('-' + number);
  }

  const buildNumber = (numberString: string) => {
    if(number.includes('.') && numberString === '.') return;

    if(number.startsWith('0') || number.startsWith('-0')){
      // Punto decimal
      if(numberString === '.') {
        return setNumber(number + numberString);
      }
      // Evaluar si es otro 0 y no hay punto decimal, 
      if(numberString === '0' && number.includes('.')){
        return setNumber(number + numberString);
      }
      // Evaluar si es diferente de 0, no hay otro punto y es el primer numero
      if(numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      // Evitar 0's antes del punto
      if(numberString === '0' && !number.includes('.')) return;

      return setNumber(number + numberString)
    }

    setNumber(number + numberString)

  }

  const setLastNumber = () => {
    calculateResult();
    if(number.endsWith('.')) {
      setPrevNumber(number.slice(0,-1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  }

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply
  }

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract
  }

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add
  }

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [ firstValue, operation, secondValue ] = formula.split(' ');
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if( isNaN(num2) ) return num1;

    switch(operation) {

      case Operator.add:
        return num1 + num2

      case Operator.substract:
        return num1 - num2

      case Operator.divide:
        return num1 / num2

      case Operator.multiply:
        return num1 * num2

      default:
        throw new Error("Operation not implemented");
        
    }
  }

  return{
    // properties
    number,
    prevNumber,
    formula,
    // methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult
  }
}
