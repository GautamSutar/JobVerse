import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Resume Screening
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/about")}>
          About
        </Button>
        <Button color="inherit" onClick={() => navigate("/contact")}>
          Contact
        </Button>
        <Button color="inherit" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
