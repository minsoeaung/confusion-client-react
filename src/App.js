import { Navbar, NavbarBrand } from "reactstrap";
import Menu from './components/MenuComponent';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          <Menu />
        </div>
      </Navbar>
    </div>
  );
}

export default App;

