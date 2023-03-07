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
import { useNavigate } from "react-router-dom";
import useService from "../../config/service/useService";
import BasicModal from "../modal";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../contexts/Auth";

export default function LoginForm({ setUser }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [openModa, setOpenModa] = React.useState(false);
  const [error, setError] = React.useState();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { Login } = React.useContext(AuthContext);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await useService.login({
        email,
        password,
      });
      setOpenModa(true);
      Login({
        token: data.token,
        email: data.user.email,
        nome: data.user.nome,
      });

      navigate("/admin");
    } catch (e) {
      console.log(e);
      setError("Usuário não encontrado");
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

        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {<AccountCircle />}
                </IconButton>
              </InputAdornment>
            }
            label="Email"
          />
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
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
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

        <Box component={"header"}>
          <Typography component={"h1"} sx={{ display: "flex", gap: "10px" }}>
            Não tem uma conta ?{" "}
            <Typography>
              <Link
                style={{ color: "blue", fontWeight: "Bold" }}
                to={"/register"}
              >
                Registre-se
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
      <BasicModal
        title={"Sucesso"}
        message={
          "Usuário encontrado com sucesso, aguarde enquanto te redirecionamos para o Painel adm"
        }
        opened={openModa}
      />

      {error && <Alert severity="error">* {error}</Alert>}
    </Container>
  );
}
