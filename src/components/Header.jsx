import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { CiShoppingBasket, CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";

function Header() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);

  // Mövzunu tətbiq et
  const applyTheme = (mode) => {
    const body = document.body;
    if (mode === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  // İlk dəfə açıldıqda localStorage-dan oxu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Mövzunu dəyişdir
  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="flex-row"
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <img className="logo" src="./src/images/logo.png" alt="logo" />
        <p className="logo-text">BMM</p>
      </div>

      <div className="flex-row">
        <input
          className="search-input"
          type="text"
          placeholder="Bir şeyler ara"
        />
        <div>
          {theme === "dark" ? (
            <FaMoon className="icon" onClick={changeTheme} />
          ) : (
            <CiLight className="icon" onClick={changeTheme} />
          )}
          <Badge
            onClick={() => dispatch(setDrawer(true))}
            badgeContent={products.length}
            color="error"
          >
            <CiShoppingBasket style={{ marginRight: "6px" }} className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
