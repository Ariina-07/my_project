function runTests() {
    console.log('=== ТЕСТИРОВАНИЕ АЛГОРИТМОВ ===\n');
    
    
    console.log('1. Тесты для работы с числами:');
    console.log('isPrime(17):', isPrime(17), '(ожидается: true)');
    console.log('isPrime(15):', isPrime(15), '(ожидается: false)');
    console.log('factorial(5):', factorial(5), '(ожидается: 120)');
    console.log('fibonacci(8):', fibonacci(8));
    console.log('gcd(48, 18):', gcd(48, 18), '(ожидается: 6)');
    console.log('');
    
    
    console.log('2. Тесты для работы со строками:');
    console.log('isPalindrome("А роза упала на лапу Азора"):', isPalindrome('А роза упала на лапу Азора'));
    console.log('countVowels("Привет мир"):', countVowels('Привет мир'));
    console.log('reverseString("hello"):', reverseString('hello'));
    console.log('findLongestWord("Самое длинное слово в предложении"):', findLongestWord('Самое длинное слово в предложении'));
    console.log('');
    
   
    console.log('3. Тесты для работы с массивами:');
    console.log('findMax([3, 1, 4, 1, 5, 9, 2]):', findMax([3, 1, 4, 1, 5, 9, 2]));
    console.log('removeDuplicates([1,2,2,3,4,4,5]):', removeDuplicates([1,2,2,3,4,4,5]));
    console.log('bubbleSort([64, 34, 25, 12, 22, 11, 90]):', bubbleSort([64, 34, 25, 12, 22, 11, 90]));
    
    const sortedArray = [11, 22, 25, 34, 64, 90];
    console.log('binarySearch([11, 22, 25, 34, 64, 90], 25):', binarySearch(sortedArray, 25));
    console.log('');
    
   
    console.log('4. Тесты для утилитарных функций:');
    console.log('formatCurrency(1234.56):', formatCurrency(1234.56));
    console.log('isValidEmail("test@example.com"):', isValidEmail('test@example.com'));
    console.log('isValidEmail("invalid-email"):', isValidEmail('invalid-email'));
    console.log('generatePassword(12):', generatePassword(12));
    
    console.log('\n=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}


if (typeof window !== 'undefined') {
    window.onload = runTests;
} else {
    runTests();
}