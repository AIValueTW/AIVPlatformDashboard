import React from "react";
import darkScrollbar from "@mui/material/darkScrollbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { zhTW } from "@mui/material/locale";

const theme = createTheme(
  /**
   * @see https://mui.com/zh/customization/theming/
   */
  {
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: false,
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          // body: darkScrollbar(),
          fontSize: '1rem',
        },
      },
      
    },
    
    palette: {
      mode: "light",
      background:{
        default:"#f5f5f5"
      },
      primary: {
        // light: 這將從 palette.primary.main 中進行計算，
        main: "#25287e",
        // dark: 這將從 palette.primary.main 中進行計算，
        // contrastText: 這將計算與 palette.primary.main 的對比度
      },
      secondary: {
      //   // light: 這將從 palette.secondary.main 中進行計算，
        main: "#f08c00",
      //   // dark: 這將從 palette.secondary.main 中進行計算，
      //   // contrastText: 這將計算與 palette.secondary.main 的對比度
      },
      // 使用 `getContrastText()` 來最大化
      // 背景和文本的對比度
      contrastThreshold: 3,
      // 使用下面的函數用於將顏色的亮度在其調色板中
      // 移動大約兩個指數。
      // 例如，從紅色 500（Red 500）切換到 紅色 300（Red 300）或 紅色 700（Red 700）。
      tonalOffset: 0.2,
    },

    /**
     * @see https://material-ui.com/customization/globals/#default-props
     */
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: false, // No more ripple, on the whole application 💣!
      },

      // Set default elevation to 1 for popovers.
      MuiPopover: {
        elevation: 1,
      },
    },
    zhTW,
  }
);

export function MaterialThemeProvider(props) {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
