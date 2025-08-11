const unitOptions = {
    length: ["meters", "kilometers", "feet", "miles"],
    time: ["seconds", "minutes", "hours"],
    speed: ["mps", "kph", "mph"]
};

const unitNames = {
    meters: "Metros",
    kilometers: "Kilómetros",
    feet: "Pies",
    miles: "Millas",
    seconds: "Segundos",
    minutes: "Minutos",
    hours: "Horas",
    mps: "Metros/segundo",
    kph: "Kilómetros/hora",
    mph: "Millas/hora"
};

const conversionDescriptions = {
    "meters_kilometers": "Divide el valor de kilometros entre 1000",
    "kilometers_meters": "Multiplica el valor de metros por 1000",
    "feet_miles": "Divide el valor de millas entre 5280",
    "miles_feet": "Multiplica el valor de pies por 5280",
    "meters_feet": "Multiplica el valor de pies por 3.28084",
    "feet_meters": "Divide el valor de metros entre 3.28084",
    "kilometers_miles": "Divide el valor de millas entre 1.60934",
    "miles_kilometers": "Multiplica el valor de kilometros por 1.60934",
    "seconds_minutes": "Divide el valor de minutos entre 60",
    "minutes_seconds": "Multiplica el valor de segundos por 60",
    "minutes_hours": "Divide el valor de horas entre 60",
    "hours_minutes": "Multiplica el valor de minutos por 60",
    "seconds_hours": "Divide el valor de horas entre 3600",
    "hours_seconds": "Multiplica el valor de segundos por 3600",
    "mps_kph": "Multiplica el valor de km/h por 3.6",
    "kph_mps": "Divide el valor de m/s entre 3.6",
    "mps_mph": "Multiplica el valor de m/h por 2.23694",
    "mph_mps": "Divide el valor de m/s entre 2.23694",
    "kph_mph": "Divide el valor de m/h entre 1.60934",
    "mph_kph": "Multiplica el valor de km/h por 1.60934"
};

document.getElementById('typeUnit').addEventListener('change', updateUnitOptions);
document.getElementById('inputValue').addEventListener('input', () => convert('input'));
document.getElementById('resultValue').addEventListener('input', () => convert('result'));
document.getElementById('inputUnit').addEventListener('change', () => convert('input'));
document.getElementById('outputUnit').addEventListener('change', () => convert('input'));
document.getElementById('typeUnit').addEventListener('change', handleUnitChange);

function handleUnitChange() {
    clearInputs();
    updateUnitOptions();
    updateConversionDescription();
}

function clearInputs() {
    document.getElementById('inputValue').value = "";
    document.getElementById('resultValue').value = "";
}

function updateUnitOptions() {
    const typeUnit = document.getElementById('typeUnit').value;
    const inputUnitSelect = document.getElementById('inputUnit');
    const outputUnitSelect = document.getElementById('outputUnit');

    // Clear current options
    inputUnitSelect.innerHTML = "";
    outputUnitSelect.innerHTML = "";

    // Add new options
    unitOptions[typeUnit].forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unitNames[unit];
        inputUnitSelect.appendChild(option);
        const optionClone = option.cloneNode(true);
        outputUnitSelect.appendChild(optionClone);
    });
}

function convert(source) {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const resultValue = parseFloat(document.getElementById('resultValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    let result;

    if (source === 'input' && !isNaN(inputValue)) {
        result = performConversion(inputValue, inputUnit, outputUnit);
        document.getElementById('resultValue').value = result;
    } else if (source === 'result' && !isNaN(resultValue)) {
        result = performConversion(resultValue, outputUnit, inputUnit);
        document.getElementById('inputValue').value = result;
    }

    updateConversionDescription(inputUnit, outputUnit);
}

function performConversion(value, fromUnit, toUnit) {
    let convertedValue;

    // Longitud
    if (fromUnit === "meters" && toUnit === "kilometers") convertedValue = value / 1000;
    else if (fromUnit === "kilometers" && toUnit === "meters") convertedValue = value * 1000;
    else if (fromUnit === "feet" && toUnit === "miles") convertedValue = value / 5280;
    else if (fromUnit === "miles" && toUnit === "feet") convertedValue = value * 5280;
    else if (fromUnit === "meters" && toUnit === "feet") convertedValue = value * 3.28084;
    else if (fromUnit === "feet" && toUnit === "meters") convertedValue = value / 3.28084;
    else if (fromUnit === "kilometers" && toUnit === "miles") convertedValue = value / 1.60934;
    else if (fromUnit === "miles" && toUnit === "kilometers") convertedValue = value * 1.60934;

    // Tiempo
    else if (fromUnit === "seconds" && toUnit === "minutes") convertedValue = value / 60;
    else if (fromUnit === "minutes" && toUnit === "seconds") convertedValue = value * 60;
    else if (fromUnit === "minutes" && toUnit === "hours") convertedValue = value / 60;
    else if (fromUnit === "hours" && toUnit === "minutes") convertedValue = value * 60;
    else if (fromUnit === "seconds" && toUnit === "hours") convertedValue = value / 3600;
    else if (fromUnit === "hours" && toUnit === "seconds") convertedValue = value * 3600;

    // Velocidad
    else if (fromUnit === "mps" && toUnit === "kph") convertedValue = value * 3.6;
    else if (fromUnit === "kph" && toUnit === "mps") convertedValue = value / 3.6;
    else if (fromUnit === "mps" && toUnit === "mph") convertedValue = value * 2.23694;
    else if (fromUnit === "mph" && toUnit === "mps") convertedValue = value / 2.23694;
    else if (fromUnit === "kph" && toUnit === "mph") convertedValue = value / 1.60934;
    else if (fromUnit === "mph" && toUnit === "kph") convertedValue = value * 1.60934;

    // Mismas unidades
    else if (fromUnit === toUnit) convertedValue = value;

    // Conversión no soportada
    else return "Conversión no soportada.";

    // Formatear el valor resultante
    return parseFloat(convertedValue.toPrecision(10));
}

function updateConversionDescription() {
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const key = `${inputUnit}_${outputUnit}`;
    let description;

    if (inputUnit === outputUnit) {
        description = "Las unidades son iguales.";
    } else {
        description = conversionDescriptions[key] || "Conversión no soportada.";
    }

    document.getElementById('conversionDescription').textContent = description;
}

// Inicializar opciones
updateUnitOptions();