import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'
import {Spin, Alert} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faStar, faCopy, faShareSquare, faComment} from '@fortawesome/free-regular-svg-icons'
class Popular extends Component {

    state = {
        projects: [],
        language: '',
        page: 1,
        isLoading: true
    }

    componentDidMount() {
        this.refs.isReachBottom.addEventListener('mousewheel', this.handle.bind(this))
        this.loadData()
    }

    handle = () => {
        console.log("数据的高", this.refs.isReachBottom.clientHeight);
        console.log("滚动的高", document.documentElement.scrollTop);
        console.log("屏幕的高", document.documentElement.clientHeight);
        let {page, isLoading} = this.state
        let onPullUpHeight = this.refs.isReachBottom.clientHeight;
        let documentHeight = document.documentElement.clientHeight;
        let documentTop = document.documentElement.scrollTop;
        if ((documentHeight > onPullUpHeight || onPullUpHeight <= documentHeight + documentTop) && !isLoading) {
            page++
            this.setState({page}, () => {
                this.loadData()
            })
        }
    }


    loadData = () => {
        let {language, page} = this.state
        this.setState({isLoading: true}, () => {
            axios.get(
                `https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories&page=${page}`
            ).then((res) => {
                console.log(res.data.items)
                if (page == 1) {
                    this.setState({projects: res.data.items, isLoading: false})
                } else {
                    let moreProjects = this.state.projects.concat(res.data.items)
                    this.setState({projects: moreProjects, isLoading: false})
                }
            })
        })
    }

    switchLanguage = (language) => {
        this.setState({language, page: 1}, () => {
            this.loadData()
        })
    }

    render() {
        let {projects, language, isLoading} = this.state
        return (
            <div className="git-stars" ref={'isReachBottom'}>
                <div className={'git-stars-languages'}>
                    <div className={`git-stars-languages-item ${language == '' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, '')}>
                        All
                    </div>
                    <div className={`git-stars-languages-item ${language == 'javascript' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'javascript')}>
                        javascript
                    </div>
                    <div className={`git-stars-languages-item ${language == 'ruby' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'ruby')}>
                        ruby
                    </div>
                    <div className={`git-stars-languages-item ${language == 'java' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'java')}>
                        java
                    </div>
                    <div className={`git-stars-languages-item ${language == 'css' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'css')}>
                        css
                    </div>
                    <div className={`git-stars-languages-item ${language == 'python' && 'active'}`}
                         onClick={this.switchLanguage.bind(this, 'python')}>
                        python
                    </div>
                </div>
                <div className={'git-stars-body'}>
                    {
                        projects.map((project, index) => (
                            <div key={index} className={'git-stars-item'}>
                                <div className={'git-stars-item-no'}>#{index}</div>
                                <div className={'git-stars-logo'}>
                                    <img className={'git-stars-img'} src={project.owner.avatar_url}/>
                                </div>
                                <div className={'git-stars-name'}>{project.name}</div>
                                <div className={'git-stars-info'}>
                                    <div className={'git-stars-info-name'}>
                                        <FontAwesomeIcon className={'icon'} icon={faUser}/>
                                        {project.name}
                                    </div>
                                    <div className={'git-stars-star-count'}>
                                        <FontAwesomeIcon className={'icon'} icon={faStar}/>
                                        {project.stargazers_count}
                                    </div>
                                    <div className={'git-stars-forks'}>
                                        <FontAwesomeIcon className={'icon'} icon={faShareSquare}/>
                                        {project.forks_count}
                                    </div>
                                    <div className={'git-stars-issues'}>
                                        <FontAwesomeIcon className={'icon'} icon={faComment}/>
                                        {project.open_issues_count}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className={'spin-container'}>
                        <Spin spinning={isLoading} size={"large"} tip={'加载中...'}/>
                    </div>
                </div>
            </div>
        )

    }
}

export default Popular;
