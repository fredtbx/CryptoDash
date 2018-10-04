import React from 'react';
import styled from 'styled-components';
import {subtleBoxShadow, greenBoxShadow, lightBlueBackground} from './Style'

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
`
const CoinTile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
  &:hover{
    cursor: pointer;
    ${greenBoxShadow}
  }
`
const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const CoinSymbol = styled.div`
  justify-self: right;
`

export default function() {
  return <CoinGrid> 
    {Object.keys(this.state.coinList).slice(0, 100).map(coin => 
      <CoinTile>
        <CoinHeaderGrid>
          <div>{this.state.coinList[coin].CoinName}</div>
          <CoinSymbol>{this.state.coinList[coin].Symbol}</CoinSymbol>
          {<img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coin].ImageUrl}`} />}
        </CoinHeaderGrid>
      </CoinTile>)}
  </CoinGrid>
}