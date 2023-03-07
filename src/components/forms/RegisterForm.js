import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../util/emailMak";
import FormHelperText from "@mui/material/FormHelperText";
import useService from "../../config/service/useService";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import BasicModal from "../modal";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errorEmail, setErrorEmail] = React.useState();
  const [error, setError] = React.useState();
  const [openModa, setOpenModa] = React.useState(false);
  const handleEmail = (email) => {
    const isValid = isValidEmail(email);
    if (!isValid) return setErrorEmail(true);
    if (isValid) setErrorEmail(false);

    setEmail(email);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await useService.register({
        nome,
        email,
        password,
      });
      setOpenModa(true);

      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(data.response));
        navigate("/login");
      }, 1000);
    } catch (e) {
      console.log(e);
      setError("Email já cadastrado");
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
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            gap: "10px",
          }}
        >
          <ShoppingBasketIcon />
          <Typography variant="h5" noWrap>
            My markt
          </Typography>
        </Box>

        <Box component={"header"}>
          <Typography component={"h1"} sx={{ display: "flex", gap: "10px" }}>
            Já possui uma conta ?{" "}
            <Typography>
              <Link style={{ color: "blue", fontWeight: "Bold" }} to="/login">
                Login
              </Link>
            </Typography>
          </Typography>
        </Box>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Nome</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={(e) => setNome(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  {<AccountCircle />}
                </IconButton>
              </InputAdornment>
            }
            label="Nome"
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={(e) => handleEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  {<AccountCircle />}
                </IconButton>
              </InputAdornment>
            }
            label="Email"
          />
          {errorEmail && (
            <FormHelperText sx={{ color: "red" }}>
              Email não valido, ex teste@gmail.com
            </FormHelperText>
          )}
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" onClick={HandleSubmit}>
          Enviar
        </Button>
        {error && <Alert severity="error">* {error}</Alert>}
      </Box>
      <BasicModal
        title={"Sucesso"}
        message={
          "Usuário cadastrado com sucesso, aguarde enquanto te redirecionamos para a tela de Login"
        }
        opened={openModa}
      />
    </Container>
  );
}
