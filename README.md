# Age of Mythology Hero Picker

Link to the tool: [here](https://aomr-hero-picker.com/)

This is a React application that allows users to explore and compare the different gods and heroes from the game AoM: Retold.

## Features

- **God Selection**: Choose a god from a list of available options.
- **God Details**: View detailed information about the selected god, including their abilities, stats, and preferred positions.
- **Comparison**: Compare the selected god's stats and abilities with other gods.
- **Data Customization**: The application data, including god details and position information, is stored in JSON files and can be easily modified.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/aom-hero-picker.git`
2. Navigate to the project directory: `cd aom-hero-picker`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`

## Data Files

The application data is stored in the following JSON files:

- `data/gods.json`: Contains information about each god, including their name, abilities, stats, and preferred positions.
- `data/positions.json`: Defines the different positions a god can be assigned to, along with their descriptions.

### Modifying Data

To modify the application data, you can edit the respective JSON files (`data/gods.json` and `data/positions.json`). The application will automatically pick up the changes and reflect them in the UI. Please create a PR and be open for discussion about changing the values.

### Guides

Every hero has some youtube guide links, there should not be more than 5 per hero for readability, feel free to add your guide youtube video via PR.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
