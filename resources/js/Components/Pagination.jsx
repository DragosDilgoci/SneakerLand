import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderColor: '#03fcfc',
          color: '#03fcfc',
          backgroundColor:'hsla(0, 0%, 100%, 0.2)',
          '&.Mui-selected': {
            backgroundColor: '#bd2ec7',
            color: '#03fcfc',
            '&:hover': {
              backgroundColor: '#03fcfc',
              color: '#bd2ec7',
              borderColor: '#ff0090',
            },
          },
          '&:hover': {
            borderColor: '#bd2ec7',
            color: '#bd2ec7',
            backgroundColor: '#03fcfc',
          },
        },
      },
    },
  },
});

export default function PaginationOutlined({ count, page, onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          variant="outlined"
        />
      </Stack>
    </ThemeProvider>
  );
}
