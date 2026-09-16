// 1. Función Regular
function verificarParImparRegular(numero) {
    if (numero % 2 === 0) {
        console.log(`El numero ${numero} es par`);
    } else {
        console.log(`El numero ${numero} es impar`);
    }
}

// 2. Función de Flecha
const verificarParImparFlecha = (numero) => {
    if (numero % 2 === 0) {
        console.log(`El numero ${numero} es par`);
    } else {
        console.log(`El numero ${numero} es impar`);
    }
};

// Pruebas
console.log("Prueba con Función Regular: ");
verificarParImparRegular(8);  
// Salida: El numero 8 es par
verificarParImparRegular(15); 
// Salida: El numero 15 es impar

console.log("\nPrueba con Función de Flecha: ");
verificarParImparFlecha(24);  
// Salida: El numero 24 es par
verificarParImparFlecha(33);  
// Salida: El numero 33 es impar