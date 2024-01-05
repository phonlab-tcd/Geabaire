import { createTheme } from '@rneui/themed';
import { Button } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
  components: {
    Button: {
        titleStyle: {
            color: "red",
            textAlign: "center"
        }
    }
    
  }
});

export const RaisedButton = (props) => <Button raised {...props} />;