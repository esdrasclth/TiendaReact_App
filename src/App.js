import React, { useState } from 'react';
import styled from 'styled-components'
import { NavLink, Switch, Route } from 'react-router-dom'

import Inicio from './components/Inicio'
import Blog from './components/Blog'
import Tienda from './components/Tienda'
import Carrito from './components/Carrito'
import Error404 from './components/Error404'

const App = () => {

  const productos = [
    { id: 1, nombre: 'Producto 1' },
    { id: 2, nombre: 'Producto 2' },
    { id: 3, nombre: 'Producto 3' },
    { id: 4, nombre: 'Producto 4' }
  ];

  const [carrito, cambiarCarrito] = useState([]);

  const agregarProductosAlCarrito = (idProductoAAgregar, nombre) => {
    // Si el carrito no tiene elementos entonces agregamos uno.
    if (carrito.length === 0) {
      cambiarCarrito([{ id: idProductoAAgregar, nombre: nombre, cantidad: 1 }])
    } else {
      // De otra forma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
      // Si ya tiene el producto entonces queremos actualizar su valor.
      // Si no tiene el producto entonces lo queremos agregar.

      // Para poder editar el arreglo tenemos que clanarlo.
      const nuevoCarrito = [...carrito];

      // Comprobamos si el carrito ya tiene el ID de producto a agregar.
      const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
        return productoDeCarrito.id === idProductoAAgregar
      }).length > 0;

      // Si ya tiene el producto entonces lo tiene que actualizar.
      if (yaEstaEnCarrito) {
        // Para ello tenemos que buscarlo, tenemos que obtener su posicion en el arreglo.
        // Y en base de su posicion ya actualizamos su valor.
        nuevoCarrito.forEach((productoDeCarrito, index) => {
          if (productoDeCarrito.id === idProductoAAgregar) {
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = { id: idProductoAAgregar, nombre: nombre, cantidad: cantidad + 1 }
          }
        })

        // De otra forma entonces agregamos el producto al arreglo.
      } else {
        nuevoCarrito.push(
          { id: idProductoAAgregar, nombre: nombre, cantidad: 1}
        );
      }

      // Por ultimo actualizamos en carrito.
      cambiarCarrito(nuevoCarrito);
    }
  }

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>
      <main>
        <Switch>
          <Route path="/" exact={true} component={Inicio} />
          <Route path="/blog" component={Blog} />
          <Route path="/tienda">
            <Tienda
              productos={productos}
              agregarProductosAlCarrito={agregarProductosAlCarrito}
            />
          </Route>
          <Route component={Error404} />
        </Switch>
      </main>
      <aside>
        <div>
          <aside>
            <Carrito carrito={carrito} />
          </aside>
        </div>
      </aside>
    </Contenedor>
  );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;


export default App;