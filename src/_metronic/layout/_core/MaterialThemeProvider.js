import React from "react";
import {createTheme , ThemeProvider} from "@material-ui/core";
import { StylesProvider, jssPreset , createGenerateClassName } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const generate_ClassName = createGenerateClassName({
  seed: 'Geradian'
});


const theme = createTheme (
  /**
   * @see https://material-ui.com/customization/themes/#theme-configuration-variables
   */
  {
    direction: "rtl",
    typography: {
      fontFamily: ["iransans"].join(",")
    },

    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#17c191",
        // dark: will be calculated from palette.primary.main,
        contrastText: "#fff" //will be calculated to contrast with palette.primary.main
      },
      secondary: {
        // light: will be calculated from palette.primary.main,
        main: "#ba000d",
        // dark: will be calculated from palette.primary.main,
        // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
      },
      error: {
        // light: will be calculated from palette.primary.main,
        main: "#f018a6",
        // dark: will be calculated from palette.primary.main,
        contrastText: "#fff", //will be calculated to contrast with palette.primary.main
        textTheadTable:"#fff"
      }
    },

    /**
     * @see https://material-ui.com/customization/globals/#default-props
     */
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: false // No more ripple, on the whole application 💣!
      },

      // Set default elevation to 1 for popovers.
      MuiPopover: {
        elevation: 1
      }
    }
  }
);

export function MaterialThemeProvider(props) {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss} generateClassName={generate_ClassName}>
        {children}
      </StylesProvider>
    </ThemeProvider>
  );
}
