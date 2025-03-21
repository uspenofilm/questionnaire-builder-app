import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Header() {
  return (
    <div className={css.container}>
      <NavLink to="/" className={buildLinkClass}>
        Quiz Catalog
      </NavLink>
      <NavLink to="/builder" className={buildLinkClass}>
        Quiz Builder
      </NavLink>
    </div>
  );
}
