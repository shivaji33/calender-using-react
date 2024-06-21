import { useState } from 'react';

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalender = () => {
    let cellSize = 42; // 7 * 6
    const result = [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const currentDateIndex = currentDate.getDay(); // 0 - 6
    const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // push prevMonth dates
    let week = [];
    for (let i = 0; i <= currentDateIndex; i++) {
      week.push(prevMonthLastDay - currentDateIndex + i);
      cellSize--;
    }

    // currentDates

    for (let i = 1; i <= currentMonthLastDay; i++) {
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
      week.push(i);
      cellSize--;
    }
    // future month Dates
    for (let i = 1; i <= cellSize; i++) {
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
      week.push(i);
    }

    if (week.length) {
      result.push(week);
    }

    return result;
  };

  const monthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  }

  return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button onClick={() => monthChange(-1)}>Prev Month</button>
          <p>{(currentDate?.getMonth() + 1) +  '-' +currentDate?.getFullYear()}</p>
          <button onClick={() => monthChange(1)}>Next Month</button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {renderCalender()?.map((week) => (
            <tr key={'tr-' + week}>
              {week?.map((day, index) => (
                <td key={'td-' + index}>{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calender;
