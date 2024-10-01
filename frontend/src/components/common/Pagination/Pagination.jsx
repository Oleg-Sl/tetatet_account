import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRanges(props) {
  return (
    <Stack spacing={2}>
        <Pagination
            count={props.count}
            page={props.page}
            boundaryCount={props.boundaryCount}
            onChange={props.onChange}
        />
    </Stack>
  );
}