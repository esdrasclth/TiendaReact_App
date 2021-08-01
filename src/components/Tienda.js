import React from 'react';

import Productos from './Productos'

const Tienda = ({ agregarProductosAlCarrito }) => {
    return (
        <div>
            <h1>Tienda</h1>
            <Productos agregarProductosAlCarrito={agregarProductosAlCarrito} />
        </div>
    );
}

export default Tienda;