import { useEffect } from "react";
import Menu from "./Menu";

const Layout = ({ title = "Title", children }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div>
      <div>
        <Menu />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
