function tempretureConvertion() {
  let deg = document.getElementById("degrees").value;
  let typeOfDeg = document.getElementById("typeOfDeg").value;
  let result = document.getElementById("result");
  let answer;
  let sol;
  
  function calculation(deg, typeOfDeg) {
    switch (typeOfDeg) {
      case "fahrenheit":
        sol = ((deg - 32) * 5) / 9;
        answer = Math.floor(sol) + " °C";
        result.setAttribute('value', answer)
        break;
      case "kelvin":
        sol = deg - 273.15;
        answer = Math.floor(sol) + " °C";
        result.setAttribute('value', answer)
        break;
      default:
        answer = "Input Not Identified";
        break;
    }
  }
  calculation(deg, typeOfDeg);
}
