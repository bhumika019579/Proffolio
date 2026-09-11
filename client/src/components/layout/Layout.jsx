import Navbar from "./Navbar";

function Layout({ children, theme, toggleTheme }) {
  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;