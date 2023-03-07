import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import productsService from "../../config/service/productsService";
import MediaCard from "../MediaCard";
import { AuthContext } from "../../contexts/Auth";

function ProductList() {
  const [products, setProduct] = React.useState();
  const [count, setCount] = React.useState();
  const [serchTerm, setSerchTerm] = React.useState();
  const { returUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!serchTerm) {
      (async () => {
        const res = await productsService.findAll();
        setProduct(res.rows);
        setCount(Number(res.Total.count));
      })();
    }
  }, [serchTerm]);

  React.useEffect(() => {

    if (serchTerm) {
      (async () => {
        const response = await productsService.findByName(serchTerm.toLowerCase());
        setProduct(response?.row);
        setCount(Number(response.Total.count));
      })();
    }
  }, [serchTerm]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">
          Buscar por nome
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="email"
          onChange={(e) => setSerchTerm(e.target.value)}
          endAdornment={
            <InputAdornment position="end">{<SearchIcon />}</InputAdornment>
          }
          label=" Buscar por nome"
        />
      </FormControl>

      <MediaCard info={products} count={count} />
    </Container>
  );
}
export default ProductList;
