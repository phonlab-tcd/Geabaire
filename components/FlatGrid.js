import { Col, Grid, Row } from "react-native-easy-grid";

export default function FlatGrid({data = [], numRows, numColumns, renderItem, rowStyle, columnStyle}) {

    const rows = Array.from({ length: numRows }, (_, rowIndex) => {
      const columns = Array.from({ length: numColumns }, (_, columnIndex) => {
          const buttonIndex = rowIndex * numColumns + columnIndex;

          if (buttonIndex >= data.length) {
              return null;
          }

          return (
            <Col key={buttonIndex} style={columnStyle}>
              {renderItem({item: data[buttonIndex], index: buttonIndex})}
            </Col>
          );
      }).filter(Boolean);

      return (
        <Row key={rowIndex} style={rowStyle}>
          {columns}
        </Row>
      );
    });

    return (
      <Grid>
        {rows}
      </Grid>
    );
}
