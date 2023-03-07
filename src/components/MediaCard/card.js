import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProductEdit from "../forms/ProductEdit";
import productsService from "../../config/service/productsService";
import { AuthContext } from "../../contexts/Auth";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemCard({ item, refresh, setRefres }) {
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState("");
  const { returUser } = React.useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    const user = returUser();
    if (user) setUser(user);
  }, [returUser]);

  const handleDelete = async (id) => {
    const res = await productsService.delete({
      token: user.token,
      id,
    });
    if (res) {
      setRefres(!refresh);
    }
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader title={item.nome} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.descricao}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          R${" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRA",
          }).format(Number(item.preco))}
        </Typography>
      </CardContent>
      {user && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <DeleteIcon onClick={() => handleDelete(item.id)} />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <EditIcon />
          </ExpandMore>
        </CardActions>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ProductEdit item={item} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
