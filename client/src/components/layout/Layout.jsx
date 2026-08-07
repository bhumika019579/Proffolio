import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px 16px" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;