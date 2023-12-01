export function getDatesForMonthYear(month, year) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = monthNames.findIndex(
    (name) => name.toLowerCase() === month.toLowerCase()
  );

  if (monthIndex === -1) {
    throw new Error("Invalid month");
  }

  const numericMonth = monthIndex + 1; // Months are one-indexed

  const firstDay = new Date(year, numericMonth - 1, 1);
  const lastDay = new Date(year, numericMonth, 0).getDate();

  const formatDate = (date) => {
    const day = date.getDate();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = date.getMonth() + 1; // Months are zero-indexed
    const formattedYear = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };

  const dates = [];

  for (let day = 1; day <= lastDay; day++) {
    const currentDate = new Date(firstDay);
    currentDate.setDate(day);
    dates.push(formatDate(currentDate));
  }

  return dates;
}

export function calculateSumForKey(data, innerKey) {
  let totalSum = 0;

  // Iterate over each date in the data
  Object.values(data).forEach((obj) => {
    // Convert the inner key value to a number if it's not an empty string
    const value = obj[innerKey] !== "" ? parseFloat(obj[innerKey]) : 0;

    // Add the value to the total sum
    if (!isNaN(value)) {
      totalSum += value;
    }
  });

  return totalSum;
}

export function flattenNestedArray(nestedArray) {
  return nestedArray.flat();
}

export function calculateTotalHours(startTime, finishTime, date) {
  if (startTime && finishTime) {
    const startDate = new Date(`${date} ${startTime}`);
    const finishDate = new Date(`${date} ${finishTime}`);

    // Check if the Date objects are valid
    if (isNaN(startDate) || isNaN(finishDate)) {
      // Return a specific value to indicate an error
      return null;
    }

    // Calculate the time difference in milliseconds
    const timeDiff = finishDate - startDate;

    // Check if the calculation results in NaN (e.g., if the times are not valid)
    if (isNaN(timeDiff)) {
      // Return a specific value to indicate an error
      return null;
    }

    // Convert milliseconds to hours
    const totalHours = timeDiff / (1000 * 60 * 60);

    // Convert total hours to 'hh:mm' format

    const formattedHours = formatHours(totalHours);
    return formattedHours;
  } else {
    return null;
  }
}

function formatHours(totalHours) {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours % 1) * 60);

  const formattedHours = `${padZero(hours)}:${padZero(minutes)}`;
  return formattedHours;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

export function calculateKmExpense(kmTraveled, expenseRate) {
  // Convert input values to numbers, handling NaN cases
  const parsedKmTraveled = parseFloat(kmTraveled);
  const parsedExpenseRate = parseFloat(expenseRate);

  // Check for NaN and return an appropriate value
  if (isNaN(parsedKmTraveled) || isNaN(parsedExpenseRate)) {
    return null;
  }

  // Calculate the km expense
  const kmExpense = (parsedKmTraveled * parsedExpenseRate).toFixed(2);

  return kmExpense;
}
