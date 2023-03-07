import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { moneyMask } from "../../util/numberMask";
import productsService from "../../config/service/productsService";
import Alert from "@mui/material/Alert";

export default function ProductCad({ item }) {
  const [nome, setNome] = React.useState();
  const [preco, setPreco] = React.useState(parseFloat(0).toFixed(2));
  const [descricao, setDescricao] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState();

  function setTwoNumberDecimal(event) {
    const money = moneyMask(event.target.value);
    setPreco(money);
  }

  const HandleSalveItem = async () => {
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (!nome) {
      setError("Nome do Produto é Obrigatorio");
      return;
    } else {
      setError();
    }

    if (preco === "0.00") {
      setError("Preço do Produto é Obrigatorio");
      return;
    } else {
      setError();
    }
    const res = await productsService.create({
      preco,
      descricao,
      nome,
      token: user.token,
    });
    if (res.response) {
      setSuccess(true);
      setNome();
      setPreco(parseFloat(0).toFixed(2));
      setDescricao();
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "70px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography
          component={"h1"}
          sx={{ textAlign: "center", fontSize: "18px" }}
        >
          Cadastro de Produto
        </Typography>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Nome</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            label="Email"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Descrição
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Preço</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type=""
            label="Preço"
            pattern="^\d*(\.\d{0,2})?$"
            onChange={setTwoNumberDecimal}
            min="0"
            max="10"
            step="0.25"
            value={preco}
          />
        </FormControl>
        <Button variant="contained" onClick={HandleSalveItem}>
          Salvar
        </Button>
        {success && (
          <Alert severity="success">Produto Criado com sucesso</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
}
