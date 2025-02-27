import React from 'react';
import Modal from './Modal.js';
import Utils from './utility.js';

class ListCards extends React.Component {

  constructor (props) {
    super(props);

    let stateVar = {
      no_of_cards: 28,
      cardsInRow: window.innerWidth <= 500 ? 1 : 4,
      cardsVisible: this.props.dataJSON.slice(0, 28)
    };

    this.state = stateVar;
  }

  // componentDidMount(prevProps, prevState) {
  //   $('.protograph-grid-card').each((i, element) => {
  //     let iframe_url = element.getAttribute('data-iframe_url');
  //     setTimeout(function () {
  //       new ProtoEmbed.initFrame(element, iframe_url, "grid", {
  //         headerJSON: ProtoGraph.headerJSON
  //       });
  //     }, 0);
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cardsVisible: nextProps.dataJSON.slice(0, this.state.no_of_cards)
    });
  }

  // componentDidUpdate(prevProps, prevState) {
    // let cards = [].slice.call(document.querySelectorAll('.protograph-grid-card')),
    //   newCards;

    // newCards = cards.filter((e,i) => {
    //   return !e.querySelector('iframe');
    // });

    // newCards.forEach((element,i) => {
    //   let iframe_url = element.getAttribute('data-iframe_url');
    //   setTimeout(function () {
    //     new ProtoEmbed.initFrame(element, iframe_url, "grid", {
    //       headerJSON: ProtoGraph.headerJSON
    //     });
    //   }, 0);
    // });
  // }

  loadMoreCard() {
    let size = this.props.dataJSON.length;
    let x = (this.state.no_of_cards + this.state.no_of_cards <= size) ? this.state.no_of_cards + this.state.no_of_cards : size;

    this.setState({
      no_of_cards : x,
      cardsVisible: this.props.dataJSON.slice(0, x)
    })
  }

  render() {
    if (this.props.dataJSON.length === 0) {
      return(<h2>No cards to display</h2>)
    } else {
      let cards = this.state.cardsVisible.map((card, i) => {
        let class_name = (((i+1)% this.state.cardsInRow) == 0) ? "protograph-card div-without-margin-right" : "protograph-card";
        return(
            <div
              id={`protograph-grid-card-${card.state}-${card.date}`}
              onClick={this.props.showModal}
              data-viewcast_id={card.view_cast_id}
              className={`protograph-grid-card protograph-trigger-modal ${class_name}`}
              data-district_code={card.district}
              >
              <div className="proto-card-content" data-iframe_url={card.iframe_url}>
                <div className="proto-card-date">{card.date}</div>
                <div className="proto-card-location">{card.district}, {card.state}</div>
                <div className="proto-context-div">
                  <div className="proto-context-title">CONTEXT/BIAS INDICATOR</div>
                  <div className="proto-context">{card.pretext_to_incident}</div>
                </div>
              </div>
          </div>
        )
      })
      return (
        <div id="cards-list" className="protograph-card-area">
          {cards}
          <div className="clearfix"></div>
          {this.state.no_of_cards < this.props.dataJSON.length ? <button id="show-more-cards" onClick={(e) => this.loadMoreCard()}>Show more</button> : null}
        </div>
      )
      return(
        <div>List to come here</div>
      )
    }
  }
}

export default ListCards;