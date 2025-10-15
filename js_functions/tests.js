function runTests() {
    console.log('=== ТЕСТИРОВАНИЕ ФУНКЦИЙ ===\n');
    
    
    console.log('1. Основные функции:');
    console.log('sum(1, 2, 3, 4):', sum(1, 2, 3, 4), '(ожидается: 10)');
    console.log('sum():', sum(), '(ожидается: 0)');
    
    console.log('createUser({ name: "Иван", age: 25 }):', 
                createUser({ name: "Иван", age: 25 }));
    console.log('createUser({ name: "Мария", age: 30, email: "test@mail.ru" }):', 
                createUser({ name: "Мария", age: 30, email: "test@mail.ru" }));
    
    const secret = secretMessage("123", "Секретное сообщение");
    console.log('secret("123"):', secret("123"));
    console.log('secret("wrong"):', secret("wrong"));
    console.log('');
    
   
    console.log('2. Функции высшего порядка:');
    
    const double = x => x * 2;
    const square = x => x * x;
    const composed = compose(double, square);
    console.log('compose(double, square)(5):', composed(5), '(ожидается: 50)');
    
    const numbers = [1, 2, 3, 4, 5];
    console.log('myMap([1,2,3,4,5], x => x * 2):', myMap(numbers, x => x * 2));
    console.log('myFilter([1,2,3,4,5], x => x % 2 === 0):', myFilter(numbers, x => x % 2 === 0));
    console.log('myReduce([1,2,3,4,5], (acc, x) => acc + x, 0):', myReduce(numbers, (acc, x) => acc + x, 0));
    console.log('');
    
    
    console.log('3. Сложные функции:');
    
  
    const multiply = (a, b, c) => a * b * c;
    const curriedMultiply = curry(multiply);
    console.log('curriedMultiply(2)(3)(4):', curriedMultiply(2)(3)(4), '(ожидается: 24)');
    
   
    const slowFunction = (a, b) => {
        console.log('   Вычисление...');
        return a + b;
    };
    const memoized = memoize(slowFunction);
    console.log('memoized(5, 3):', memoized(5, 3));
    console.log('memoized(5, 3):', memoized(5, 3), '(должен использовать кэш)');
    
   
    const passwordValidator = createValidator({
        minLength: 6,
        requireDigits: true,
        requireUppercase: true
    });
    
    console.log('passwordValidator("Pass1"):', passwordValidator("Pass1"));
    console.log('passwordValidator("Password1"):', passwordValidator("Password1"));
    console.log('');
    
    
    console.log('4. Debounce и Throttle:');
    let callCount = 0;
    const testFn = () => callCount++;
    
    const debouncedFn = debounce(testFn, 100);
    const throttledFn = throttle(testFn, 100);
    
    console.log('Debounce и Throttle функции созданы (проверьте вручную в интерфейсе)');
    console.log('');
    
    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

if (typeof window !== 'undefined') {
    window.onload = runTests;
} else {
    runTests();
}