import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({ count, handlePage, page }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.round(count / 10)}
        color="primary"
        page={page}
        onChange={handlePage}
      />
    </Stack>
  );
}
