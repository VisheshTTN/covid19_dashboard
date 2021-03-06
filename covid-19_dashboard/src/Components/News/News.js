import React, {Component} from 'react';
import{CarouselProvider, Slider, Slide, Dot} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import NewsBlock from './NewsBlock/NewsBlock';

import styles from './News.module.css';

class News extends Component{

    state = {
        articles: []
    }

    componentDidMount(){
        this.fetchNews();
        
        this.intervalId = setInterval(this.fetchNews.bind(this), 10000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
    }

    fetchNews = () => {
        fetch('https://newsapi.org/v2/top-headlines?q=COVID&from=2020-04-10&sortBy=publishedAt&apiKey=59d820ab09d94ab295dd95bdfee6f56b&pageSize=10&language=en')
            .then(response => response.json())
            .then(res=> {
                const articleList = [];
                for(let i in res.articles){
                    articleList.push({
                        source: res.articles[i].source.name,
                        title: res.articles[i].title,
                        desc: res.articles[i].description,
                        image_src: res.articles[i].urlToImage
                    });
                }
                this.setState({articles: articleList});
            });
    }

    render(){
        let show = null;
        let i =[];
        if(this.state.articles){
        show = this.state.articles.map((item, index)=> {
            i.push(index);
                return <Slide index={index} key={index}><NewsBlock articles={item}/></Slide>;    
            });
        }

        let dots = this.state.articles.map((item, index)=> {
            return <Dot slide={index} key={index} className={styles.Dot} />
        });
        return(
            <div className={styles.News}>
                    <h4>NEWS</h4>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={50}
                    totalSlides={10}
                    interval={5000}
                    isPlaying={true} >
                    <Slider >
                        {show}
                    </Slider>
                    <div style={{textAlign:'center'}}>
                        {dots}
                    </div>
                </CarouselProvider>
            </div>
        );
    }
}

export default News;