import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DetalhesReceita from '../components/DetalhesReceita';

const DetalhesComidas = () => {
  // https://scrimba.com/scrim/cyp4KdH3
  const matchObject = useRouteMatch();
  const receitaItemId = matchObject.params.id;

  return (
    <div>
      <DetalhesReceita receitaItemId={ receitaItemId } tipoReceita="Meal" />
    </div>
  );
};

export default DetalhesComidas;
