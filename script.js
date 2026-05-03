// All of this code is for the schedule
// Variables
const scheduleTable = document.querySelector("#schedule");
const allTotalIDs = ["adsTotal", "mondayTotal", "tuesdayTotal",
    "wednesdayTotal", "thursdayTotal", "fridayTotal", "saturdayTotal",
    "sundayTotal", "rateTotal", "costTotal"
]
const allColumnClasses = [
    "ads", "monday", "tuesday",
    "wednesday", "thursday", "friday", "saturday",
    "sunday", "rate", "cost"
]
const allRowClasses = ["rowOne", "rowTwo", "rowThree", "rowFour", "rowFive"];
const allRowColumnTotalID = ["rowOneTotal", "rowTwoTotal", "rowTotalThree", "rowTotalFour", "rowTotalFive"];


// This will be for the table. It will automatically listen for any inputs when the client types in a number
scheduleTable.addEventListener("input", (event) =>
{
    // If the target is an input field.
    if (event.target.tagName === "INPUT")
    {   
        // Turn the value into a float
        const value = parseFloat(event.target.value)

        // if the value is negative and is not NaN
        if (!isNaN(value) && value < 0)
        {
            event.target.value = 0;
        }
    }

    getAllTotals();
})

// This is a event listener that listens to the keyboard. If they press in a "-" and if it's coming
// from the input tag, don't let it happen
scheduleTable.addEventListener("keydown", (event) =>
{
    if ( event.key === "-" && event.target.tagName === "INPUT")
    {
        event.preventDefault();
    }
})

// This listens for anything that the user pastes into the table. If it contains
// a "-", it will stop it.
scheduleTable.addEventListener("paste", (event) =>
{
    const pastedNum = event.clipboardData.getData("text")

    if (pastedNum.includes("-"))
    {
        event.preventDefault();
    }
})


document.getElementById("add-client-button").addEventListener("click", (event) =>
{
    let selected_client = document.getElementById("add-client-dropdown").value;
    document.getElementById("client-name").innerHTML = selected_client;
})

/*
    This is for the columns. It will add up all of the cells in the column and return the total
*/
function calculateTotalColumn(singleColumn)
{
    // Get all of the cells in a column
    const column = document.querySelectorAll("." + singleColumn);


    let total = 0;

    // For each cell
    for (const x of column)
    {
        // Get the value (or text content for the last row)
        let currentValue = x.value || x.textContent

        // If it contains the "$", replace and trim it.
        currentValue = currentValue.replace("$", "").trim();

        // Parse it.
        const value = parseFloat(currentValue)

        // If it's not NaN, add it
        if (!isNaN(value))
        {
            total += value;
        }
    }

    // Return it
    return total;
}

// This is to calculate each row. It will add up all of the cells in a row and return the total of it.
function calculateTotalRow(singleRow)
{
    let total = 0;

    const row = document.querySelectorAll("." + singleRow);

    // Loop through the cells in each row
    for (let i = 0; i < row.length; i++)
    {
        
        // Get the value
        const value = parseFloat(row[i].value)

        // If the row is not empty
        if (!isNaN(value))
        {
            // If it's the rate column, multiply instead of adding.
            if (i == row.length - 1)
            {
                total *= value;
            }
            else
            {
                total += value;
            }
        }
    }

    // Return the total.
    return total;
}

/*
    This method will display the total of a row / column.
*/
function displayTotal(totalCell, amount, moneySign = false)
{
    // We will get the total cell (either a row or column)
    const totalCellId = document.querySelector("#" + totalCell);

    // If there will be a money sign, then concatinate it to the amount
    if (moneySign)
    {
        totalCellId.textContent = "$" + amount;
    } else // else, just put the amount only
    {
        totalCellId.textContent = amount;
    }  
} 

/*
    This method will be used to generate all of the totals in the "Weekly Totals"
    cells. It include the cells of each row and each column.
 */
function getAllTotals()
{
    // This loop is for the rows.
    for (let i = 0; i < allRowClasses.length; i++)
    {
        // This is for calculating the total row to row.
        const rowAmount = calculateTotalRow(allRowClasses[i])
        displayTotal(allRowColumnTotalID[i], rowAmount.toFixed(2))
    }
     

    // This loop is for the columns
    for (let i = 0; i < allTotalIDs.length; i++)
    {
        // This is for calculating the totals column to column
        const amount = calculateTotalColumn(allColumnClasses[i])

        // If it's the last two rows (rate and total), add a "$" to the number
        // else, don't
        if (i > allTotalIDs.length - 3)
        {
            displayTotal(allTotalIDs[i], amount.toFixed(2), true)
        }
        else
        {
            displayTotal(allTotalIDs[i], amount)
        }   
    }
}

// Will be worked on later.
// const generateNewSchedule = document.querySelector("#make-new-schedule");
// generateNewSchedule.addEventListener("click", () =>
// {
//     console.log("test");
// })