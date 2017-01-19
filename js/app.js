var newsList = [
  {
    author: 'Travis Levius, CNN',
    text: '10 Christmas food traditions you\'ve never heard of',
    fullText: 'Surely the most exotic-sounding dish on this list, Russia\'s "herring in a fur coat" (or Selyodka pod Shuboy) is a vibrant, layered salad that\'s consumed in many Russian households for the holiday season.',
    textLink: 'http://edition.cnn.com/2016/12/14/foodanddrink/christmas-food-unusual-traditions/index.html'
  },
  {
    author: 'Mengchen Zhang, Nanlin Fang and James Masters, CNN',
    text: 'George Michael: How Wham! rocked China',
    fullText: 'Author Lu Jun, who was one of the 15,000 people at Wham!\'s Worker\'s Gymnasium concert in Beijing in April 1985, recalled to CNN that the the audience was "calm" and restrained," while foreign visitors were jumping up and down in time with the music.',
    textLink: 'http://edition.cnn.com/2016/12/26/entertainment/george-michael-wham-china/index.html'
  },
  {
    author: 'By Julian Zelizer',
    text: '2017: Year of hope or year of fear?',
    fullText: 'America enters 2017 divided, with major questions hovering over Trump presidency, writes Julian Zelizer. One side fears consequences of Trump presidency, the other has grand expectations of positive change, he writes',
    textLink: 'http://edition.cnn.com/2016/12/25/opinions/big-political-stories-of-2017-zelizer/index.html'
  }
];

var Article = React.createClass ({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      fullText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({
      visible: true
    });
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        fullText = this.props.data.fullText,
        visible = this.state.visible;

    // console.log('render', this);

    return (
      <div className='news__item article'>
        <h5 className='news__author'>{author}:</h5>
        <p className='news__text'>{text}</p>

        {/* для ссылки readmore: не показывать ссылку, если visible === true */}
        <a href="#"
          className={'news__read-more ' + (visible ? 'none': '')}
          onClick={this.readmoreClick}>
            Read more
        </a>

        {/* для большого текста: не показывать текст, если visible === false */}
        <p className={'news__full-text ' + (visible ? '': 'none')}>{fullText}</p>
      </div>
    )
  }
});


var News = React.createClass ({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      counter: 0
    }
  },
  newsCounterClick: function() {
    this.setState ({
      counter: this.state.counter+1
    });
  },
  render: function() {
    var data = this.props.data;
    var newsItem;

    if ( data.length > 0 ) {
      newsItem = data.map(function (item, index){
       return (
        <div key={index}>
          <Article data={item} />
        </div>
       )
     })
    }
    else {
      newsItem = <p>Sorry, we have no news :(</p>
    }

    // console.log(newsItem);

    return (
      <div className='news'>
        {newsItem}
        <div className='news__counter'>
          <strong
            className={'news__counter-inner ' + (data.length > 0 ? '':'none') }
            onClick={this.newsCounterClick}>
              News: {data.length}
          </strong>
        </div>
      </div>
    );
  }
});

var Add = React.createClass ({
  getInitialState: function() { // начальное состояние
    return {
      rulesAgreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  },
  componentDidMount: function() { //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.news_author).focus();
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[fieldName]: false})
    }
    else {
      this.setState({[fieldName]: true})
    }
   },
  // onTextChange: function(e) {
  //   if (e.target.value.trim().length > 0) {
  //     this.setState({textIsEmpty: false})
  //   }
  //   else {
  //     this.setState({textIsEmpty: true})
  //   }
  // },
  onBtnClickHandler: function(e) {
    // console.log(this.refs);
    // alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.news_author).value;
    var text = ReactDOM.findDOMNode(this.refs.news_text).value;
    alert(author + '\n' + text);
  },
  onCheckRulesClick: function() {
    // ReactDOM.findDOMNode(this.refs.alert_btn).disabled = !e.target.checked;
    this.setState({
      rulesAgreeNotChecked: !this.state.rulesAgreeNotChecked
    });
  },
  render: function() {
    var rulesAgreeNotChecked = this.state.rulesAgreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='news-add__form'>
        <input
          type='text'
          className='news-add__author'
          placeholder='My name is...'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          ref='news_author' />
        <textarea
          className='news-add__textarea'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          ref='news_text'
          placeholder='My awesome text for the post'></textarea>
        <label className='news-add__check-rules'>
          <input
            type='checkbox'
            ref='checkrules'
            onChange={this.onCheckRulesClick}/>
          I certainly agree with the rules
        </label>

        {/* берем значение для disabled из state */}
        <button
          type='submit'
          className='news-add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_btn'
          disabled={rulesAgreeNotChecked || authorIsEmpty || textIsEmpty}>
          Add my cool news (show alert with text)
        </button>
      </form>
    );
  }
});

var App = React.createClass ({
  render: function() {
    return (
      <div className={'app ' + 'news__inner'}>
        <h3>Add news</h3>
        <Add />
        <h3>News feed</h3>
        <News data={newsList} />
      </div>
    );
  }
});

ReactDOM.render (
  <App />,
  document.getElementById('root')
);
