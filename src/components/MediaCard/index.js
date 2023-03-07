import * as React from "react";

import ItemCard from "./card";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import PaginationComponent from "../pagination";

export default function MediaCard({
  info,
  count,
  handlePage,
  page,
  refresh,
  setRefresh,
}) {



  return (
    info && (
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            width: "100%",
            marginTop: "100px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {info.map((item, key) => (
              <ItemCard
                key={key}
                item={item}
                refresh={refresh}
                setRefres={setRefresh}
              />
            ))}
          </Box>
          <PaginationComponent
            count={count}
            handlePage={handlePage}
            page={page}
          />
        </Box>
      </Container>
    )
  );
}
