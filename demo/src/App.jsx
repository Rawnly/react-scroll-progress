import React, { Component } from "react";
import classnames from "classnames";

import withIndicator from "../../src/withScrollIndicator";

import "./master.css";

class App extends Component {
  state = {
    height: 0,
    current: 0,
    percentage: 0
  };

  getPageHeight() {
    if (typeof window !== "undefined") {
      const { document } = window;

      var body = document.body,
        html = document.documentElement;

      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }

    return 0;
  }

  updateOnScroll = () => {
    this.setState({
      height: this.getPageHeight(),
      current: window.scrollY,
      percentage: (window.scrollY * 100) / (this.getPageHeight() - window.innerHeight)
    });
  };

  getQuarters = (percentage) => {
    if (percentage > 25 && percentage <= 50) {
      return 1;
    }

    if (percentage > 50 && percentage <= 75) {
      return 2;
    }

    if (percentage > 50 && percentage < 100) {
      return 3;
    }

    if (percentage >= 100) {
      return 4;
    }

    return 0;
  };

  componentDidMount() {
    this.updateOnScroll();

    window.addEventListener("scroll", this.updateOnScroll);
    window.addEventListener("resize", this.updateOnScroll);
  }

  goToHalfPage = () => {
    const p = () => this.props.scrollInfo.getPercentage(true, 0);

    var x = window.scrollY; //y-axis pixel displacement
    var y = 1; //delay in milliseconds

    let int = setInterval(function() {
      if (p() >= 25) {
        clearInterval(int);
        return;
      }

      window.scroll(0, x);
      x = x + 25;
    }, y);
  };

  render() {
    return (
      <React.Fragment>
        {/* Navbar */}
        <ul className='navbar'>
          <li>
            SCROLLED <span>{this.props.scrollInfo.getPercentage(true, 0)}%</span>
            <br />
            <small>({this.getQuarters(this.props.scrollInfo.getPercentage(true, 0))}/4) OF THE PAGE</small>
          </li>
          <li className='end'></li>
          <li>
            <span className='button product-hunt'> Product Hunt </span>
          </li>
          <li>
            <span className='button'> Github </span>
          </li>
        </ul>

        {/* Content */}
        <section>
          <h1>ScrollProgress</h1>
          <h4 className='withButton'>
            <span className='button cut-out' onClick={this.goToHalfPage}>
              Scroll to see it in action
            </span>
          </h4>
        </section>
        {/* It's like 3 sections */}
        <section className='big'>
          <h3 className='fixed-progressbar'>{this.props.scrollInfo.getPercentage(true, 0)}%</h3>
        </section>
        <section>
          <h1>🎉  Hooray!</h1>
        </section>
        <footer
          className={classnames({
            fadeIn: this.state.percentage > 25 && this.state.percentage < 75
          })}
        >
          <span className="button not-hover">
            Brought to you by{" "}
            <a href='https://rawnly.com' title='Federico Vitale'>
              Federico Vitale
            </a>
          </span>
        </footer>
      </React.Fragment>
    );
  }
}

export default withIndicator({
  color: "whitesmoke",
  dynamicOpacity: true,
  minOpacity: 0.3
})(App);
