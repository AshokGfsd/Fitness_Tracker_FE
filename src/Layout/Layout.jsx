
import Sidebar from "../components/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <section className="sidebar">
        <Sidebar />
      </section>
      <section className="page">{children}</section>
    </main>
  );
};

export default Layout