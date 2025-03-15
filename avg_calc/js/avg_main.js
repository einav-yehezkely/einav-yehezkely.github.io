
function calculateAvg() {
    const display = document.getElementById("display"); 
    let finals = document.querySelectorAll(".final-grade") ;
    let credits = document.querySelectorAll(".credits"); 
    let totalWeightedScore = 0; 
    let totalCredits = 0; 
    for(let i = 0; i < finals.length; i++){ 
        let final = parseFloat(finals[i].value) || 0; 
        let credit = parseFloat(credits[i].value) || 0; 
        totalWeightedScore += final * credit;
        totalCredits += credit; 
    } 
    let average = totalCredits > 0 ? (totalWeightedScore / totalCredits).toFixed(2) : 0;
    document.getElementById("display").innerText = "Avg: " + average;
  }

function calculateFinal(element) {
    let row = element.closest("tr");

    let examPercent = parseFloat(row.querySelector(".exam-percent").value) || 0;
    let examScore = parseFloat(row.querySelector(".exam-score").value) || 0;
    let magenPercent = parseFloat(row.querySelector(".magen-percent").value) || 0;
    let magenScore = parseFloat(row.querySelector(".magen-score").value) || 0;

    let finalGrade = (examScore * examPercent / 100) + (magenScore * magenPercent / 100);
    row.querySelector(".final-grade").value = finalGrade.toFixed(2);
    
    calculateAvg()
  }

function initialFinalGrade() {
    let rows = document.querySelectorAll("#tableBody tr");
    rows.forEach(row => {
        calculateFinal(row);
    });
}

function calcMagenPercents(element){
    let row = element.closest("tr");
    let examPercent = parseFloat(row.querySelector(".exam-percent").value) || 0;
    let magenPercent = 100 - examPercent;
    row.querySelector(".magen-percent").value = magenPercent;
    calculateFinal(row);
}
function calcExamPercents(element){
    let row = element.closest("tr");
    let magenPercent = parseFloat(row.querySelector(".magen-percent").value) || 0;
    let examPercent = 100 - magenPercent;
    row.querySelector(".exam-percent").value = examPercent;
    calculateFinal(row);
}

function addRow() {
    let table = document.getElementById("tableBody");
    let newRow = document.createElement("tr");
    newRow.innerHTML= `
    <td><input type="text" pattern="\d*" class="name"/></td>
    <td><input type="text" pattern="\d*" class="credits" value="0" oninput="calculateAvg()""/></td>
    <td><input type="text" pattern="\d*" class="exam-percent" value="100" oninput="calcMagenPercents(this)""/></td>
    <td><input type="text" pattern="\d*" class="exam-score" value="0" oninput="calculateFinal(this)""/></td>
    <td><input type="text" pattern="\d*" class="magen-percent" value="0" oninput="calcExamPercents(this)""/></td>
    <td><input type="text" pattern="\d*" class="magen-score" value="0" oninput="calculateFinal(this)""/></td>
    <td><input type="text" class="final-grade" disabled /></td>
    <td><button id="deleteBtn" onclick="deleteRow(this)">Delete</button></td>
  `;
  table.appendChild(newRow);
  calculateFinal(newRow);
}

function deleteRow(button) {
    button.closest("tr").remove();
    calculateAvg()
  }

