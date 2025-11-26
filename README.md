# NodeJS Holiday Management

A Node.js library for managing and querying public holidays by country. Track remaining holidays, check if a date is a holiday, identify weekend holidays, and more.

## Features

- ✅ Get remaining holidays for the year
- ✅ Count holidays falling on weekends
- ✅ Check if a specific date is a holiday
- ✅ Get the next upcoming holiday
- ✅ List all holidays for a country
- ✅ Calculate working day holidays (excluding weekends)
- ✅ Support for multiple countries (extensible)

## Installation

```bash
npm install
```

## Usage

### Basic Example

```javascript
const { FreeDays } = require('./script');

// Create an instance for Morocco in 2025
const freedays = new FreeDays('Mar', 2025);

// Get all holidays
const allHolidays = freedays.getAllHolidays();
console.log(allHolidays);

// Count total holidays
const totalHolidays = freedays.countHolidays();
console.log(`Total holidays: ${totalHolidays}`);
```

### Check if a Date is a Holiday

```javascript
const freedays = new FreeDays('Mar', 2023);

// Using string format (YYYY-MM-DD)
const isHoliday1 = freedays.isHoliday('2023-01-11');
console.log(isHoliday1); // true

// Using Date object
const isHoliday2 = freedays.isHoliday(new Date('2023-05-01'));
console.log(isHoliday2); // true
```

### Get Remaining Holidays

```javascript
const freedays = new FreeDays('Mar');

const remaining = freedays.getRemainingHolidays();
console.log(remaining);
// Output: Array of objects with date, formatted date, and day name

const count = freedays.countRemainingHolidays();
console.log(`${count} holidays remaining this year`);
```

### Get Next Holiday

```javascript
const freedays = new FreeDays('Mar');

const nextHoliday = freedays.getNextHoliday();
console.log(nextHoliday);
// Output: { date: Date, formatted: "Day Mon DD YYYY", day: "Mon" }
```

### Weekend Holidays

```javascript
const freedays = new FreeDays('Mar', 2025);

// Get holidays that fall on Saturday or Sunday
const weekendHolidays = freedays.getWeekendHolidays();
console.log(weekendHolidays);

// Count weekend holidays
const weekendCount = freedays.countWeekendHolidays();
console.log(`${weekendCount} holidays fall on weekends`);

// Custom weekend days (e.g., Friday and Saturday for some countries)
const customWeekend = freedays.getWeekendHolidays('Fri', 'Sat');
```

### Working Day Holidays

```javascript
const freedays = new FreeDays('Mar', 2025);

// Get number of holidays that fall on working days
const workingDayHolidays = freedays.getWorkingDayHolidays('Sat', 'Sun');
console.log(`${workingDayHolidays} holidays on working days`);
```

## API Reference

### Constructor

#### `new FreeDays(country, year)`

- **country** (string, required): Country code (e.g., 'Mar' for Morocco)
- **year** (number, optional): Year to query. Defaults to current year.

**Throws**: Error if country is not supported.

### Methods

#### `getAllHolidays()`
Returns an array of all holiday dates as formatted strings.

**Returns**: `string[]`

#### `countHolidays()`
Returns the total number of holidays for the country.

**Returns**: `number`

#### `getRemainingHolidays()`
Returns all holidays that haven't occurred yet this year.

**Returns**: `Array<{date: Date, formatted: string, day: string}>`

#### `countRemainingHolidays()`
Returns the count of remaining holidays.

**Returns**: `number`

#### `getNextHoliday()`
Returns the next upcoming holiday. If no holidays remain this year, returns the first holiday of next year.

**Returns**: `{date: Date, formatted: string, day: string} | null`

#### `isHoliday(date)`
Checks if a given date is a holiday.

**Parameters**:
- **date** (Date | string): Date object or string in 'YYYY-MM-DD' format

**Returns**: `boolean`

**Throws**: Error if date format is invalid.

#### `getWeekendHolidays(free1, free2)`
Returns holidays that fall on weekend days.

**Parameters**:
- **free1** (string, optional): First weekend day. Default: 'Sat'
- **free2** (string, optional): Second weekend day. Default: 'Sun'

**Returns**: `Array<{date: Date, formatted: string, day: string}>`

#### `countWeekendHolidays(free1, free2)`
Returns the count of holidays falling on weekends.

**Parameters**:
- **free1** (string, optional): First weekend day. Default: 'Sat'
- **free2** (string, optional): Second weekend day. Default: 'Sun'

**Returns**: `number`

#### `getWorkingDayHolidays(free1, free2)`
Returns the count of holidays falling on working days.

**Parameters**:
- **free1** (string, optional): First weekend day. Default: 'Sat'
- **free2** (string, optional): Second weekend day. Default: 'Sun'

**Returns**: `number`

## Project Structure

```
.
├── script.js              # Main FreeDays class
├── data/
│   └── holidays.js        # Holiday data by country
├── helpers/
│   └── utils.js           # Utility functions
├── __tests__/
│   └── script.test.js     # Unit tests
├── package.json
└── README.md
```

## Adding New Countries

To add holidays for a new country, edit `data/holidays.js`:

```javascript
const holidays = {
  Mar: [ /* Morocco holidays */ ],
  USA: [ /* US holidays */ ],
  // Add your country here
  Fra: [
    "01-01", // New Year's Day
    "05-01", // Labor Day
    // Add more holidays in MM-DD format
  ]
};
```

## Testing

Run the test suite:

```bash
npm test
```

The project uses Jest for unit testing with comprehensive test coverage.

## Date Format

- Holiday data is stored in `MM-DD` format (e.g., "01-01" for January 1st)
- Input dates for `isHoliday()` should be in `YYYY-MM-DD` format or Date objects
- Output dates are returned as Date objects with formatted strings

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
