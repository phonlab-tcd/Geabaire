import { Col, Grid, Row } from "react-native-easy-grid";

/**
 * FlatGrid component renders a grid layout with specified number of rows and columns.
 * 
 * @param {Object} props - The properties object.
 * @param {Array} props.data - The data to be displayed in the grid.
 * @param {number} props.numRows - The number of rows in the grid.
 * @param {number} props.numColumns - The number of columns in the grid.
 * @param {Function} props.renderItem - Function to render each item in the grid.
 * @param {Object} props.rowStyle - Custom styles for each row.
 * @param {Object} props.columnStyle - Custom styles for each column.
 * @returns {JSX.Element} A grid layout component.
 */
export default function FlatGrid({data = [], numRows, numColumns, renderItem, rowStyle, columnStyle}) {
    // Generate rows and columns based on data, numRows, and numColumns
    const rows = Array.from({ length: numRows }, (_, rowIndex) => {
      const columns = Array.from({ length: numColumns }, (_, columnIndex) => {
          const buttonIndex = rowIndex * numColumns + columnIndex;

          // Check if buttonIndex exceeds data length
          if (buttonIndex >= data.length) {
              return null;
          }

          // Render item for each column
          return (
            <Col key={buttonIndex} style={columnStyle}>
              {renderItem({item: data[buttonIndex], index: buttonIndex})}
            </Col>
          );
      }).filter(Boolean);

      // Render row with columns
      return (
        <Row key={rowIndex} style={rowStyle}>
          {columns}
        </Row>
      );
    });

    // Render grid with rows
    return (
      <Grid>
        {rows}
      </Grid>
    );
}