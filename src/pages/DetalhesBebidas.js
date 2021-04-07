import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DetalhesReceita from '../components/DetalhesReceita';

const DetalhesBebidas = () => {
  // https://scrimba.com/scrim/cyp4KdH3
  const matchObject = useRouteMatch();
  const receitaItemId = matchObject.params.id;

  return (
    <div>
      <DetalhesReceita receitaItemId={ receitaItemId } tipoReceita="Drink" />
    </div>
  );
};

export default DetalhesBebidas;
