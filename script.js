// All of this code is for the "Generate Weekly Totals button"
const weeklyTotalsButton = document.querySelector("#get-totals");
const allTotalIDs = ["adsTotal", "mondayTotal", "tuesdayTotal",
    "wednesdayTotal", "thursdayTotal", "fridayTotal", "saturdayTotal",
    "sundayTotal", "rateTotal", "costTotal"
]
const allColumnsIds = [
    "ads", "monday", "tuesday",
    "wednesday", "thursday", "friday", "saturday",
    "sunday", "rate", "cost"
]

// This will be for the "Generate Weekly Totals" button
weeklyTotalsButton.addEventListener("click", () =>
{
    getAllTotals();
    
})

/*
    This method will take a single column and add up all of it's inputs.
    It will then return that input to be later inputed in a Weekly Total row cell.
*/
function calculateTotal(singleColumn)
{
    const column = document.querySelectorAll("." + singleColumn);

    let total = 0;

    for (const x of column)
    {
        const value = parseFloat(x.value)

        if (!isNaN(value))
        {
            total += value;
        }
    }

    return total;
}

/*
    This method will get a cell from the Weekly Totals row and 
    put the amount into that cell.
*/
function displayTotal(totalCell, amount)
{
    const totalCellId = document.querySelector("#" + totalCell);

    totalCellId.textContent = amount;
}

/*
    This method will be used to generate all of the totals in the "Weekly Totals"
    cells.
 */
function getAllTotals()
{
    for (let i = 0; i < allTotalIDs.length; i++)
    {
        const amount = calculateTotal(allColumnsIds[i])
        displayTotal(allTotalIDs[i], amount)
    }
}

// Will be worked on later.
const generateNewSchedule = document.querySelector("#make-new-schedule");
generateNewSchedule.addEventListener("click", () =>
{
    console.log("test");
})