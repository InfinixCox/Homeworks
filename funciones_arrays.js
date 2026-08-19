// Ejercicio 1: Funciones de arreglos en JavaScript

// Arreglo base:
const arregloBase = [5, 12, 8, 130, 44, 21, 3];


// 1. at(index): Retorna el elemento en el índice dado. Acepta índices negativos para contar desde el final del arreglo.
// Ejemplo 1:
    console.log(`1) at(2): ${arregloBase.at(2)}`);
// Salida esperada: 
// 1) at(2): 8

// Ejemplo 2:
    console.log(`   at(-1): ${arregloBase.at(-1)} \n`);
// Salida esperada: 
// 1) at(-1): 3


// 2. concat(...arreglos): Une dos o más arreglos y retorna un ARREGLO NUEVO, sin modificar los originales.
// Ejemplo:
const arreglo2 = [99, 100];
const arregloConcat = arregloBase.concat(arreglo2);
    console.log(`2) arregloBase: [${arregloBase}]`);
    console.log(`   arreglo2: [${arreglo2}]`);
    console.log(`   arregloConcat: [${arregloConcat}] \n`);
// Salida esperada: 
// 2) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    arreglo2: [99, 100]
//    arregloConcat: [5, 12, 8, 130, 44, 21, 3, 99, 100]


// 3. copyWithin(destino, inicio, fin): Copia una parte del arreglo dentro de sí mismo, sobrescribiendo. MUTA el arreglo original.
// Ejemplo:
const arreglo3 = [1, 2, 3, 4, 5];
const arregloWithin = arreglo3.copyWithin(0, 3);
    console.log(`3) arreglo3: [${arreglo3}] `);
    console.log(`   arregloWithin: [${arregloWithin}] \n`);
// Salida esperada: 
// 3) arreglo3: [4, 5, 3, 4, 5]
//    arregloWithin: [4, 5, 3, 4, 5]


// 4. entries(): Retorna un iterador con pares [índice, valor].
// Ejemplo:
const arregloEntries = [...arregloBase.entries()];
    console.log(`4) arregloBase: [${arregloBase}]`);
    console.log(`   arregloEntries: [${arregloEntries}] \n`);
// Salida esperada: 
// 4) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    arregloEntries: [[0,5],[1,12],[2,8],[3,130],[4,44],[5,21],[6,3]]


// 5. every(): Retorna true si TODOS los elementos cumplen la condición.
// Ejemplo:
    console.log(`5) every(x > 0): ${arregloBase.every(x => x > 0)} \n`);
// Salida esperada: 
// 5) every(x > 0): true


// 6. fill(valor, inicio, fin): Rellena posiciones del arreglo con un valor fijo. MUTA el arreglo original.
// Ejemplo:
const fillDemo = [1, 2, 3, 4, 5];
const arregloFill = fillDemo.fill(0, 1, 3);
    console.log(`6) fillDemo: [${fillDemo}]`);
    console.log(`   arregloFill: [${arregloFill}] \n`);
// Salida esperada: 
// 6) fillDemo: [1, 0, 0, 4, 5]
//    arregloFill: [1, 0, 0, 4, 5]


// 7. filter(callback): Retorna un ARREGLO NUEVO con los elementos que cumplen la condición. No muta el original.
// Ejemplo:
const arregloFilter = arregloBase.filter(n => n > 20);
    console.log(`7) arregloBase: [${arregloBase}]`);
    console.log(`   arregloFilter: [${arregloFilter}] \n`);
// Salida esperada: 
// 7) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    arregloFilter: [130, 44, 21]


// 8. find(callback): Retorna el PRIMER elemento que cumple la condición (o undefined si ninguno cumple).
// Ejemplo:
const arregloFind = arregloBase.find(n => n > 20);
    console.log(`8) arregloBase: [${arregloBase}]`);
    console.log(`   arregloFind: ${arregloFind} \n`);
// Salida esperada: 
// 8) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    arregloFind: 130


// 9. findIndex(callback): Retorna el índice del primer elemento que cumple la condición (o -1 si ninguno cumple).
// Ejemplo:
const arregloFindIndex = arregloBase.findIndex(n => n > 20);
    console.log(`9) arregloBase: [${arregloBase}]`);
    console.log(`   arregloFindIndex: ${arregloFindIndex} \n`);
// Salida esperada: 
// 9) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    arregloFindIndex: 3


// 10. findLast(callback): Retorna el ÚLTIMO elemento que cumple la condición.
// Ejemplo:
const arregloFindLast = arregloBase.findLast(n => n > 10);
    console.log(`10) arregloBase: [${arregloBase}]`);
    console.log(`   arregloFindLast: ${arregloFindLast} \n`);
// Salida esperada:
// 10) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloFindLast: 21


// 11. findLastIndex(callback): Retorna el índice del último elemento que cumple la condición.
// Ejemplo:
const arregloFindLastIndex = arregloBase.findLastIndex(n => n > 10);
    console.log(`11) arregloBase: [${arregloBase}]`);
    console.log(`   arregloFindLastIndex: ${arregloFindLastIndex} \n`);
// Salida esperada:
// 11) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloFindLastIndex: 5


// 12. flat(profundidad): Aplana arreglos anidados hasta el nivel de profundidad indicado.
// Ejemplo:
const anidado = [1, [2, 3], [4, [5, 6]]];
const arregloFlat = anidado.flat(1);
    console.log(`12) anidado: [${anidado}]`);
    console.log(`    arregloFlat: [${arregloFlat}]`);
// Salida esperada: 
// 12) anidado: [1, [2, 3], [4, [5, 6]]]
//     arregloFlat: [1, 2, 3, 4, [5, 6]]

// Ejemplo 2:
const arregloFlatInfinity = anidado.flat(Infinity);
    console.log(`   flat(Infinity): [${arregloFlatInfinity}] \n`);
// Salida esperada: 
//    flat(Infinity): [1, 2, 3, 4, 5, 6]


// 13. flatMap(callback): Aplica map() y luego aplana un nivel, en un solo paso.
// Ejemplo:
const arregloFlatMap = arregloBase.flatMap(n => [n, n * 2]);
    console.log(`13) arregloBase: [${arregloBase}]`);
    console.log(`    arregloFlatMap: [${arregloFlatMap}] \n`);
// Salida esperada: 
// 13) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloFlatMap: [5,10,12,24,8,16,130,260,44,88,21,42,3,6]


// 14. forEach(callback): Ejecuta una función por cada elemento. No retorna nada (undefined), solo sirve para efectos secundarios (ej. imprimir).
// Ejemplo:
    console.log(`14) forEach:`);
const arregloForEach = arregloBase.forEach((n, i) => console.log(`[${i}] = ${n}`));
    console.log(`forEach: ${arregloForEach} \n`);
// Salida esperada:
// 14) forEach:
//    [0] = 5
//    [1] = 12
//    [2] = 8
//    [3] = 130
//    [4] = 44
//    [5] = 21
//    [6] = 3


// 15. includes(valor): Retorna true/false según si el arreglo contiene el valor.
// Ejemplo:
const arregloIncludes = arregloBase.includes(44);
    console.log(`15) arregloBase: [${arregloBase}]`);
    console.log(`    includes(44): ${arregloIncludes} \n`);
// Salida esperada: 
// 15) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//    includes(44): true


// 16. indexOf(valor): Retorna el primer índice donde aparece el valor, o -1 si no existe.
// Ejemplo:
const arregloIndexOf = arregloBase.indexOf(8);
    console.log(`16) arregloBase: [${arregloBase}]`);
    console.log(`   indexOf(8): ${arregloIndexOf} \n`);
// Salida esperada: 
// 16) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     indexOf(8): 2


// 17. join(separador): Convierte el arreglo en un string, uniendo los elementos con el separador indicado.
// Ejemplo:
const arregloJoin = arregloBase.join(" - ");
    console.log(`17) arregloBase: [${arregloBase}]`);
    console.log(`    join(' - '): "${arregloJoin}" \n`);
// Salida esperada: 
// 17) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     join(' - '): "5 - 12 - 8 - 130 - 44 - 21 - 3"


// 18. keys(): Retorna un iterador con los índices del arreglo.
// Ejemplo:
const arregloKeys = [...arregloBase.keys()];
    console.log(`18) arregloBase: [${arregloBase}]`);
    console.log(`    arregloKeys: [${arregloKeys}] \n`);
// Salida esperada: 
// 18) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloKeys: [0, 1, 2, 3, 4, 5, 6]


// 19. lastIndexOf(valor): Retorna el ÚLTIMO índice donde aparece el valor, o -1 si no existe.
// Ejemplo:
const conRepetidos = [1, 2, 3, 2, 1];
const arregloLastIndexOf = conRepetidos.lastIndexOf(2);
    console.log(`19) conRepetidos: [${conRepetidos}]`);
    console.log(`    lastIndexOf(2): ${arregloLastIndexOf} \n`);
// Salida esperada: 
// 19) conRepetidos: [1, 2, 3, 2, 1]
//     lastIndexOf(2): 3


// 20. map(callback): Retorna un ARREGLO NUEVO transformando cada elemento. No muta el original.
// Ejemplo:
const arregloMap = arregloBase.map(n => n * 2);
    console.log(`20) arregloBase: [${arregloBase}]`);
    console.log(`    arregloMap: [${arregloMap}] \n`);
// Salida esperada: 
// 20) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloMap: [10, 24, 16, 260, 88, 42, 6]


// 21. pop(): Elimina y retorna el ÚLTIMO elemento. MUTA el original.
// Ejemplo:
const popDemo = [1, 2, 3];
const eliminado = popDemo.pop();
    console.log(`21) pop(): ${eliminado} `);
    console.log(`    arreglo queda: [${popDemo}] \n`);
// Salida esperada: 
// 21) pop(): 3
//     arreglo queda: [1, 2]


// 22. push(...elementos): Agrega uno o más elementos al FINAL. MUTA el original y retorna la nueva longitud del arreglo.
// Ejemplo:
const pushDemo = [1, 2, 3];
const nuevaLongitud = pushDemo.push(4, 5);
    console.log(`22) push(4,5): ${nuevaLongitud}`);
    console.log(`    arreglo queda: [${pushDemo}] \n`);
// Salida esperada: 
// 22) push(4,5): 5 
//     arreglo queda: [1, 2, 3, 4, 5]


// 23. reduce(callback, valorInicial): Reduce el arreglo a un solo valor, procesando de izquierda a derecha.
// Ejemplo:
const arregloReduce = arregloBase.reduce((acc, n) => acc + n, 0);
    console.log(`23) arregloBase: [${arregloBase}]`);
    console.log(`    reduce (suma): ${arregloReduce} \n`);
// Salida esperada: 
// 23) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     reduce (suma): 223


// 24. reduceRight(callback, valorInicial): Igual que reduce(), pero procesando de derecha a izquierda.
// Ejemplo:
const arregloReduceRight = ["a", "b", "c"].reduceRight((acc, letra) => acc + letra, "");
    console.log(`24) reduceRight (concat): "${arregloReduceRight}" \n`);
// Salida esperada: 
// 24) reduceRight (concat): "cba"


// 25. reverse(): Invierte el orden del arreglo. MUTA el original y retorna el mismo arreglo ya invertido.
// Ejemplo:
const reverseDemo = [1, 2, 3];
const arregloReverse = reverseDemo.reverse();
    console.log(`25) reverse(): [${arregloReverse}] \n`);
// Salida esperada: 
// 25) reverse(): [3, 2, 1]


// 26. shift(): Elimina y retorna el PRIMER elemento. MUTA el original.
// Ejemplo:
const shiftDemo = [1, 2, 3];
const arregloShift = shiftDemo.shift();
    console.log(`26) shift(): ${arregloShift}`);
    console.log(`    arreglo queda: [${shiftDemo}] \n`);
// Salida esperada: 
// 26) shift(): 1 
//     arreglo queda: [2, 3]


// 27. slice(inicio, fin): Retorna una copia superficial de una porción del arreglo. NO muta el original.
// Ejemplo:
const arregloSlice = arregloBase.slice(1, 4);
    console.log(`27) arregloBase: [${arregloBase}]`);
    console.log(`    slice(1,4): [${arregloSlice}] \n`);
// Salida esperada: 
// 27) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     slice(1,4): [12, 8, 130]


// 28. some(callback): Retorna true si AL MENOS UN elemento cumple la condición.
// Ejemplo:
const arregloSome = arregloBase.some(n => n > 100);
    console.log(`28) arregloBase: [${arregloBase}]`);
    console.log(`    some(n > 100): ${arregloSome} \n`);
// Salida esperada: 
// 28) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     some(n > 100): true


// 29. sort(compareFn): Ordena el arreglo. MUTA el original y retorna el mismo arreglo ya ordenado.
// Ejemplo:
const sortDemo = [40, 1, 5, 200];
const arregloSort = sortDemo.sort((a, b) => a - b);
    console.log(`29) sort numérico: [${arregloSort}] \n`);
// Salida esperada: 
// 29) sort numérico: [1, 5, 40, 200]


// 30. splice(inicio, cantidadEliminar, ...elementosNuevos): Agrega y/o elimina elementos en cualquier posición. MUTA el original y retorna un arreglo con los elementos eliminados.
// Ejemplo:
const spliceDemo = [1, 2, 3, 4, 5];
const eliminados = spliceDemo.splice(1, 2, "a", "b", "c");
    console.log(`30) splice(1,2,'a','b','c'): [${spliceDemo}]`);
    console.log(`    eliminados: [${eliminados}] \n`);
// Salida esperada: 
// 30) splice(1,2,'a','b','c'): [1,a,b,c,4,5]
//     eliminados: [2, 3]


// 31. toLocaleString(): Convierte el arreglo a string usando el formato local (separadores según configuración regional).
// Ejemplo:
const arregloToLocale = arregloBase.toLocaleString();
    console.log(`31) arregloBase: [${arregloBase}]`);
    console.log(`    toLocaleString: ${arregloToLocale} \n`);
// Salida esperada: 
// 31) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     toLocaleString: 5,12,8,130,44,21,3


// 32. toString(): Convierte el arreglo a un string separando los elementos por comas.
// Ejemplo:
const arregloToString = arregloBase.toString();
    console.log(`32) arregloBase: [${arregloBase}]`);
    console.log(`    toString: ${arregloToString} \n`);
// Salida esperada: 
// 32) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     toString: 5,12,8,130,44,21,3


// 33. unshift(...elementos): Agrega uno o más elementos al INICIO. MUTA el original y retorna la nueva longitud.
// Ejemplo:
const unshiftDemo = [3, 4, 5];
const arregloUnshift = unshiftDemo.unshift(1, 2);
    console.log(`33) unshift(1,2): ${arregloUnshift}`);
    console.log(`    arreglo queda: [${unshiftDemo}] \n`);
// Salida esperada: 
// 33) unshift(1,2): 5
//     arreglo queda: [1, 2, 3, 4, 5]


// 34. values(): Retorna un iterador con los valores del arreglo.
// Ejemplo:
const arregloValues = [...arregloBase.values()];
    console.log(`34) arregloBase: [${arregloBase}]`);
    console.log(`    arregloValues: [${arregloValues}] \n`);
// Salida esperada: 
// 34) arregloBase: [5, 12, 8, 130, 44, 21, 3]
//     arregloValues: [5, 12, 8, 130, 44, 21, 3]


// - constructor: el constructor de la clase Array (Array()).
console.log(`length del arreglo base: ${arregloBase.length} \n`);
// Salida esperada: 7


// - length: una propiedad que indica el tamaño del arreglo.
console.log(`constructor: ${arregloBase.constructor.name}`);
// Salida esperada: "Array"