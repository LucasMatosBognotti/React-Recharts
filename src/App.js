import React, { useState } from 'react';

import { Container, Content } from './styles';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Cell } from 'recharts';


const colors = ["#112F41","#068587","#4FB99F","#F2B134","#ED553B","#F58B53","#F06F3E","#8B4B62","#BB6F6B","#EA9674",];

/*

1;10;9;8;7;6;5;4;3;2;1;2;3;4;5;6;7;8;9;10;1;5;9;3;5;7;2;4;8;6

0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1;1;1;1;1;1;1;1;1;1;1;1;1;1;2;2;2;2;2;2;2;2;2;2;2;3;3;3;3;3;3;3;3;3;4;4;4;4;4;5;5;5;5

*/


export default function App() {
  const [data, setData] = useState([]);

  function handle(event) {
    /* Limpar os ; */
    var vetor = [];
    vetor = event.target.value.split(";");

    /* Passar de String pra numero */
    vetor = vetor.map(vet => Number(vet));

    /* Ordena */
    vetor = vetor.sort((a, b) => a - b);

    /* Limar nos numeros iguais */
    var vetorclear = [...new Set(vetor)];

    /* 1º JSON */
    const v = vetorclear.map(vet => ({
      name: vet.toString(),
    }));

    /* Calcular a frequencia de cada numero */
    var cont = 0;
    var frequencia = [];

    for (let i = 0; i < vetorclear.length; i++) {
      cont = 0;
      for (let j = 0; j < vetor.length; j++) {
        if (vetorclear[i] === vetor[j]) {
          cont++;
        }
      }
      frequencia[i] = cont;
    }

    /* 2º JSON */
    const f = frequencia.map(freq => ({
      uv: freq,
    }));

    /* Unir 1º JSON com o 2º JSON */
    var obj = [];

    for (let i = 0; i < vetorclear.length; i++) {
      obj[i] = Object.assign(v[i], f[i]);
    }
    
    setData(obj);
  }


  return (
    <Container>
      { data[0] ?  
        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="uv" fill="#7159C1" barSize={30} >
              {
                data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))
              } 
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      : null } 
      <Content>
        <input placeholder="Insira os valores" onChange={handle} />
      </Content>
    </Container>
  );
}