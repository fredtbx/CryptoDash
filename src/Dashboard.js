import React from 'react';
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import styled, {css} from 'styled-components';
import {fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground, fontSize2, backgroundColor2} from './Style';
import highchartsConfig from './HighchartsConfig';
import theme from './HighchartsTheme'
const ReactHighcharts = require('react-highcharts');

ReactHighcharts.Highcharts.setOptions(theme());

const numberFormat = number => {
  return +(number + '').slice(0, 7);
}

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css` 
    color: red;
  `}
`
const TickerPrice = styled.div`
  ${fontSizeBig}
`

const CoinTileCompact = CoinTile.extend`
  ${fontSize3}
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
`
const PaddingBlue = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 5px;
`
const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`
const ChartIntervalSelect = styled.select`
  ${backgroundColor2}
  color: #1163c9;
  border: 1px solid;
  ${fontSize2}
  margin: 5px;
  height: 25px;
  place-self: center left;
  float: right;
`
export default function() {

  return [<CoinGrid key={'coingrid'}> 
    {this.state.prices.map((price, index) => {
      let sym = Object.keys(price)[0];
      let data = price[sym]['USD'];
      let tileProps = {
        dashboardFavorite: sym === this.state.currentFavorite,
        onClick: () => {
          this.setState({currentFavorite: sym, historical: null}, this.fetchHistorical);
          localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym,
          }));
        }        
      }
      return index < 5 ? <CoinTile {...tileProps}>
        <CoinHeaderGrid>
          <div>{sym}</div>
          <CoinSymbol>
            <ChangePct red={data.CHANGEPCT24HOUR < 0} >
              {numberFormat(data.CHANGEPCT24HOUR)}%
            </ChangePct>
          </CoinSymbol>        
        </CoinHeaderGrid>   
        <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>     
        </CoinTile> :
        <CoinTileCompact {...tileProps}>
        <div>{sym}</div>
        <CoinSymbol>
          <ChangePct red={data.CHANGEPCT24HOUR < 0} >
            {numberFormat(data.CHANGEPCT24HOUR)}%
          </ChangePct>
        </CoinSymbol>
        <div>${numberFormat(data.PRICE)}</div>
        </CoinTileCompact>
    })}
  </CoinGrid>, 
  <ChartGrid key={'chartgrid'}>
    <PaddingBlue>
      <h2 style={{textAlign: 'center'}}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>
      <img alt={this.state.currentFavorite} style={{ height: '200px', display: 'block', margin: 'auto' }} src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`} />
    </PaddingBlue>
    <PaddingBlue>
    <ChartIntervalSelect 
      defaultValue={'months'}
      onChange={(e) => {
        this.setState({timeInterval: e.target.value, historical: null}, this.fetchHistorical);
    }}>
      <option value="days">Day</option>
      <option value="weeks">Week</option>
      <option value="months" >Month</option>
    </ChartIntervalSelect>
      {this.state.historical ? <ReactHighcharts config={highchartsConfig.call(this)} />
         : <div>Loading historical data...</div>}
    </PaddingBlue>
  </ChartGrid>]
}